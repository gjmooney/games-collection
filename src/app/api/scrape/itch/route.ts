import { GameInfoInsert } from "@/db/schema";
import { itchIoApiValidator } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const response = await axios.get(`https://itch.io/bundle/520/games.json`);

    const data = response.data;
    const dataParse = itchIoApiValidator.parse(data);

    const itchGames = dataParse.games.map(
      (game) =>
        ({
          gameName: game.title,
          store: "Itch.io",
          platform: "PC",
          imgUrl: game.cover,
        }) satisfies GameInfoInsert
    );

    return NextResponse.json(itchGames, { status: 200 });
  } catch (error: any) {
    // Type parsing error
    if (error instanceof ZodError) {
      console.log("error", error);
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }
    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
