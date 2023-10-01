import { getDecryptedCookie } from "@/db/db";
import { GameInfoInsert } from "@/db/schema";
import { steamApiValidator } from "@/lib/validators";
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

    let decodedCookie = "";
    try {
      decodedCookie = await getDecryptedCookie(userId, "steam");
    } catch (error) {
      return new Response("Cookie not found", { status: 404 });
    }

    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process
        .env.STEAM_API_KEY!}&steamid=${decodedCookie}&include_appinfo=true`
    );

    const data = response.data.response;
    const dataParse = steamApiValidator.parse(data);

    const steamGames = dataParse.games.map(
      (game) =>
        ({
          gameName: game.name,
          store: "Steam",
          platform: "PC",
          imgUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        }) satisfies GameInfoInsert
    );

    return NextResponse.json(steamGames, { status: 200 });
  } catch (error: any) {
    // Type parsing error
    if (error instanceof ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }
    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
