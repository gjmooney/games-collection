import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import db from "./db";
import { games, users, usersToGames } from "./schema";

export const updateGames = async (gamesToInsert: any) => {
  const { userId: clerkId } = auth();
  const arr = gamesToInsert.splice(0, 4);

  if (!clerkId) {
    throw new Error("Not authorized");
  }

  console.log("arr", arr);

  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.clerkId, clerkId));

  for (const game of arr) {
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

    return insertedGames.length;
  }
};
