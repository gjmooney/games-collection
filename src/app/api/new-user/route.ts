import db from "@/db/db";
import { users } from "@/db/schema";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Post sign-up page to add user to our DB
 * @returns A redirect to the homepage
 */

export async function GET() {
  console.log("new user page");
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id));

  console.log("profile", profile);

  if (profile.length !== 0) {
    return NextResponse.redirect("http://localhost:3000/update");
  }

  await db
    .insert(users)
    .values({ clerkId: user.id, username: user.username })
    .onConflictDoNothing();

  const url = new URL("http://localhost:3000/");

  return NextResponse.redirect(url);
}
