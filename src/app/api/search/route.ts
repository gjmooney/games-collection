import db from "@/db/db";
import { games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 10;

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return new NextResponse("Invalid query", { status: 400 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    const results = await db
      .select({
        id: games.id,
        gameName: games.gameName,
        platform: games.platform,
        imgUrl: games.imgUrl,
        store: games.store,
      })
      .from(usersToGames)
      .innerJoin(games, eq(usersToGames.gameId, games.id))
      .where(eq(usersToGames.userId, user[0].id))
      .where(ilike(games.gameName, `%${q}%`));

    return NextResponse.json(results);
  } catch (error) {
    console.log("error", error);
  }
}
