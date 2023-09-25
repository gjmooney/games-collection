import db from "@/db/db";
import { games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//TODO: use prepared statements

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

    const gamesCount = await db
      .select({
        count: sql<number>`count(${games.id})`,
      })
      .from(usersToGames)
      .innerJoin(games, eq(usersToGames.gameId, games.id))
      .where(eq(usersToGames.userId, user[0].id));

    return NextResponse.json(gamesCount[0].count, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
