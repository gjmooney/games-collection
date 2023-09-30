import db, { getGamesSql } from "@/db/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
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
    let platform = searchParams.get("platform");

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    let cursorInt = 0;
    if (cursor && cursor !== "null") {
      cursorInt = parseInt(cursor);
      if (isNaN(cursorInt)) {
        return NextResponse.json(
          { error: "The DB cursor broke. Try again" },
          { status: 500 }
        );
      }
    }

    if (!platform) {
      platform = "All";
    }

    const gamesFromDb = await getGamesSql(
      user[0].id,
      platform,
      cursorInt,
      search
    );

    let nextCursor = null;

    // aka there is a next page
    if (gamesFromDb.length === LIMIT) {
      nextCursor = gamesFromDb[LIMIT - 1].id;
    }

    return NextResponse.json({ gamesFromDb, nextCursor }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Stop playing around fool" },
      { status: 500 }
    );
  }
}
