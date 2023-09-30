import * as schema from "@/db/schema";
import { decryptCookies } from "@/lib/utils";
import { CookieNamesType } from "@/lib/validators";
import { neon, neonConfig } from "@neondatabase/serverless";
import { and, asc, eq, gt, ilike } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { QueryBuilder } from "drizzle-orm/pg-core";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const LIMIT = 20;

export async function getDecryptedCookie(
  clerkId: string,
  cookieName: keyof CookieNamesType
) {
  const user = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.clerkId, clerkId));

  const encryptedCookie = await db
    .select({ value: schema.cookies.value })
    .from(schema.users)
    .innerJoin(schema.cookies, eq(schema.users.id, schema.cookies.userId))
    .where(
      and(eq(schema.cookies.name, cookieName), eq(schema.users.id, user[0].id))
    );

  const decodedCookie = decryptCookies(encryptedCookie[0].value);

  return decodedCookie;
}

export async function getGamesSql(
  userId: number,
  platform: string,
  cursorInt: number,
  search?: string | null
) {
  let gamesFromDb;

  if (platform && platform !== "All" && search) {
    gamesFromDb = await db
      .select({
        id: schema.games.id,
        gameName: schema.games.gameName,
        platform: schema.games.platform,
        imgUrl: schema.games.imgUrl,
        store: schema.games.store,
      })
      .from(schema.usersToGames)
      .innerJoin(schema.games, eq(schema.usersToGames.gameId, schema.games.id))
      .orderBy(asc(schema.games.id))
      .where(
        and(
          eq(schema.usersToGames.userId, userId),
          ilike(schema.games.gameName, `%${search}%`),
          eq(schema.games.platform, platform),
          gt(schema.games.id, cursorInt) // gt is like a skip 1
        )
      )
      .limit(LIMIT);
  } else if (platform == "All" && search) {
    gamesFromDb = await db
      .select({
        id: schema.games.id,
        gameName: schema.games.gameName,
        platform: schema.games.platform,
        imgUrl: schema.games.imgUrl,
        store: schema.games.store,
      })
      .from(schema.usersToGames)
      .innerJoin(schema.games, eq(schema.usersToGames.gameId, schema.games.id))
      .orderBy(asc(schema.games.id))
      .where(
        and(
          eq(schema.usersToGames.userId, userId),
          ilike(schema.games.gameName, `%${search}%`),
          gt(schema.games.id, cursorInt) // gt is like a skip 1
        )
      )
      .limit(LIMIT);
  } else if (platform && platform !== "All" && !search) {
    gamesFromDb = await db
      .select({
        id: schema.games.id,
        gameName: schema.games.gameName,
        platform: schema.games.platform,
        imgUrl: schema.games.imgUrl,
        store: schema.games.store,
      })
      .from(schema.usersToGames)
      .innerJoin(schema.games, eq(schema.usersToGames.gameId, schema.games.id))
      .orderBy(asc(schema.games.id))
      .where(
        and(
          eq(schema.usersToGames.userId, userId),
          eq(schema.games.platform, platform),
          gt(schema.games.id, cursorInt) // gt is like a skip 1
        )
      )
      .limit(LIMIT);
  } else {
    // no platform filter and no search (default)
    gamesFromDb = await db
      .select({
        id: schema.games.id,
        gameName: schema.games.gameName,
        platform: schema.games.platform,
        imgUrl: schema.games.imgUrl,
        store: schema.games.store,
      })
      .from(schema.usersToGames)
      .innerJoin(schema.games, eq(schema.usersToGames.gameId, schema.games.id))
      .orderBy(asc(schema.games.id))
      .where(
        and(
          eq(schema.usersToGames.userId, userId),
          gt(schema.games.id, cursorInt) // gt is like a skip 1
        )
      )
      .limit(LIMIT);
  }

  return gamesFromDb;
}
export default db;
