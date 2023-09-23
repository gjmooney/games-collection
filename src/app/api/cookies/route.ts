import db from "@/db/db";
import { cookies, users } from "@/db/schema";
import { cookieFormValidator } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    const data = await req.json();
    cookieFormValidator.parse(data);

    for (const key in data) {
      // Check that data object (and not its prototype) has correct keys
      // DOn't update if value is empty string
      if (data.hasOwnProperty(key) && data[key] !== "") {
        await db
          .insert(cookies)
          .values({
            name: key,
            value: data[key],
            userId: user[0].id,
          })
          .onConflictDoUpdate({
            target: [cookies.name, cookies.userId],
            set: { value: data[key] },
          });
      }
    }

    return NextResponse.json("Cookies updated", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    console.log("error", error);
    return new Response("Could not update database", { status: 500 });
  }
}
