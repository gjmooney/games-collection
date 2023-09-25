import * as schema from "@/db/schema";
import { decryptCookies } from "@/lib/utils";
import { CookieNamesType } from "@/lib/validators";
import { neon, neonConfig } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

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
export default db;
