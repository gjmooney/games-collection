import db from "@/db/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Post sign-up page to add user to our DB
 * @returns A redirect to the homepage
 */

export async function GET() {
  console.log("wtf");
  const user = await currentUser();

  if (!user) {
    return new Response("nope");
  }

  await db
    .insert(users)
    .values({ clerkId: user.id, username: user.username })
    .onConflictDoNothing();

  const url = new URL("http://localhost:3000/");

  return NextResponse.redirect(url);
}
