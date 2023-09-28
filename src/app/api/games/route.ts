import db from "@/db/db";
import { games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, asc, eq, gt, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//TODO: wrap the stuff using search params in a suspense boundary
//TODO: use prepared statements
const LIMIT = 20;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    console.log("games GET");
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const search = searchParams.get("search");

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    let gamesFromDb = [];

    let cursorInt = 0;
    if (cursor && cursor !== "null") {
      cursorInt = parseInt(cursor);
    }

    gamesFromDb = await db
      .select({
        id: games.id,
        gameName: games.gameName,
        platform: games.platform,
        imgUrl: games.imgUrl,
        store: games.store,
      })
      .from(usersToGames)
      .innerJoin(games, eq(usersToGames.gameId, games.id))
      .orderBy(asc(games.id))
      .where(
        and(
          eq(usersToGames.userId, user[0].id),
          gt(games.id, cursorInt), // gt is like a skip 1
          ilike(games.gameName, `%${search}%`)
        )
      )
      .limit(LIMIT);

    let nextCursor = null;

    // aka there is a next page
    if (gamesFromDb.length === LIMIT) {
      nextCursor = gamesFromDb[LIMIT - 1].id;
    }

    return NextResponse.json({ gamesFromDb, nextCursor }, { status: 200 });
  } catch (error) {
    console.log("error", error);
  }
}
