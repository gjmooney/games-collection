import db from "@/db/db";
import { games } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const gamesFromDb = await db.select().from(games);

  return NextResponse.json(gamesFromDb);
}
