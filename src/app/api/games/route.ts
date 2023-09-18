import db from "@/db/db";
import { games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    console.log("user", user);

    const gamesFromDb = await db
      .select({
        gameName: games.gameName,
        platform: games.platform,
        imgUrl: games.imgUrl,
        store: games.store,
      })
      .from(usersToGames)
      .innerJoin(games, eq(usersToGames.gameId, games.id))
      .where(eq(usersToGames.userId, user[0].id));

    return NextResponse.json(gamesFromDb);
  } catch (error) {
    console.log("error", error);
  }
}
