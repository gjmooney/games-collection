import db from "@/db/db";
import { InsertGameSchema, games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data } = await req.json();

    // TODO: this is just for dev
    const arr = data.splice(0, 4);

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    // TODO: pretty sure this should be in a transaction
    for (const game of arr) {
      const { gameName, platform, store, imgUrl } =
        InsertGameSchema.parse(game);

      const insertedGames = await db
        .insert(games)
        .values({
          gameName: game.gameName,
          platform: game.platform,
          store: game.store,
          imgUrl: game.imgUrl,
        })
        .onConflictDoNothing()
        .returning({ gameId: games.id });

      if (insertedGames.length > 0) {
        await db
          .insert(usersToGames)
          .values({ gameId: insertedGames[0].gameId, userId: user[0].id });
      }
    }

    return NextResponse.json(arr.length);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    console.log("error", error);
    return new Response("Could not update database", { status: 500 });
  }
}
