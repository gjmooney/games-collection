import { GameInfoInsert } from "@/db/schema";
import { steamApiValidator } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// TODO toast
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process
        .env.STEAM_API_KEY!}&steamid=${process.env
        .STEAM_ID!}&include_appinfo=true`
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

    //const numberOfGamesAdded = await updateGames(steamGames);

    return NextResponse.json(steamGames);
  } catch (error: any) {
    // Type parsing error
    if (error instanceof z.ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }
    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
