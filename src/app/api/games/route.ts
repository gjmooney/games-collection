import db from "@/db/db";
import { games, users, usersToGames } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, asc, eq, gt, ilike } from "drizzle-orm";
import { QueryBuilder } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";

//TODO: wrap the stuff using search params in a suspense boundary
//TODO: use prepared statements
const LIMIT = 20;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    console.log("games GET");
    const { userId: clerkId } = auth();
    const qb = new QueryBuilder();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const search = searchParams.get("search");
    const platform = searchParams.get("platform");

    //console.log("searchParams", searchParams);

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    // let gamesFromDb = [];

    let cursorInt = 0;
    if (cursor && cursor !== "null") {
      cursorInt = parseInt(cursor);
    }

    //console.log("user", user);

    /* const queryBase = qb
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

          gt(games.id, cursorInt) // gt is like a skip 1
        )
      )
      .limit(LIMIT);

    const queryExtra = 0;
    const platformQ = sql`users_to_games.user_id = $1`;

    const { sql: base, params } = queryBase.toSQL(); */

    /* console.log("sql", sql);
    console.log("params", params); */

    /* const test = await db.execute(query);
    console.log("test", test.rows);
 */
    /* platform && platform !== "All"
      //? (gamesFromDb = await db
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
              ilike(games.gameName, `%${search}%`),
              eq(games.platform, platform),
              gt(games.id, cursorInt) // gt is like a skip 1
            )
          )
          .limit(LIMIT))
      : (gamesFromDb = await db
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
          .limit(LIMIT)); */

    //const query = getGamesSql(user[0].id, platform!, cursorInt, search);

    /* const query = search
      // ? qb
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

              gt(games.id, cursorInt) // gt is like a skip 1
            )
          )
          .limit(LIMIT)
      : qb
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
              gt(games.id, cursorInt) // gt is like a skip 1
            )
          )
          .limit(LIMIT); */
    //console.log("sql", query.toSQL());

    let query;

    if (platform && platform !== "All" && search) {
      query = await db
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
            ilike(games.gameName, `%${search}%`),
            eq(games.platform, platform),
            gt(games.id, cursorInt) // gt is like a skip 1
          )
        )
        .limit(LIMIT);
    } else if (platform == "All" && search) {
      query = await db
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
            ilike(games.gameName, `%${search}%`),
            gt(games.id, cursorInt) // gt is like a skip 1
          )
        )
        .limit(LIMIT);
    } else if (platform && platform !== "All" && !search) {
      query = await db
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
            eq(games.platform, platform),
            gt(games.id, cursorInt) // gt is like a skip 1
          )
        )
        .limit(LIMIT);
    } else {
      // no platform filter and no search (default)
      query = await db
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
            gt(games.id, cursorInt) // gt is like a skip 1
          )
        )
        .limit(LIMIT);
    }

    //const gamesFromDbResult = await db.execute(query);

    let nextCursor = null;
    //const gamesFromDb = gamesFromDbResult.rows;

    const gamesFromDb = query;
    // aka there is a next page
    if (gamesFromDb.length === LIMIT) {
      nextCursor = gamesFromDb[LIMIT - 1].id;
    }
    //console.log("gamesFromDb[0]", gamesFromDb);
    console.log("query", query);

    return NextResponse.json({ gamesFromDb, nextCursor }, { status: 200 });
  } catch (error) {
    console.log("error", error);
  }
}
