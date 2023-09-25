import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json("epic", { status: 200 });
  } catch (error: any) {
    // Type parsing error
    if (error instanceof ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }
    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
