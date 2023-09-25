import { getDecryptedCookie } from "@/db/db";
import { GameInfoInsert } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type PlaystationScrape = {
  name: string;
  platform: string;
  image: {
    url: string;
  };
};
// TODO toast
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decodedCookie = await getDecryptedCookie(userId, "playstationEu");

    const url =
      "https://web.np.playstation.com/api/graphql/v1/op?operationName=getPurchasedGameList&variables=%7B%22platform%22%3A%5B%22ps4%22%2C%22ps5%22%5D%2C%22size%22%3A1000%2C%22sortBy%22%3A%22ACTIVE_DATE%22%2C%22sortDirection%22%3A%22desc%22%2C%22membership%22%3A%22PS_PLUS%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22827a423f6a8ddca4107ac01395af2ec0eafd8396fc7fa204aaf9b7ed2eefa168%22%7D%7D";

    const cookieName = "pdccws_p";

    const cookie = `${cookieName}=${decodedCookie}`;

    const response = await fetch(url, { headers: { Cookie: cookie } });
    const responseJson = await response.json();

    const data = responseJson.data.purchasedTitlesRetrieve;
    const errors = responseJson.errors;

    if (errors) {
      return new Response(errors[0].message, { status: 403 });
    }

    let psGames: GameInfoInsert[] = data.games.map(
      (game: PlaystationScrape) => ({
        gameName: game.name,
        store: `Playstation EU`,
        platform: game.platform,
        imgUrl: game.image.url,
      })
    );

    // Filter out duplicate entries from PS Plus stuff
    psGames = psGames.filter((game) => {
      return game.platform === "UNKNOWN" ? false : true;
    });

    return NextResponse.json(psGames, { status: 200 });
  } catch (error: any) {
    // Type parsing error
    if (error instanceof ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }
    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
