import { getDecryptedCookie } from "@/db/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

type EpicStoreScrape = {
  items: {
    description: string;
  }[];
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decodedSsoCookie = await getDecryptedCookie(userId, "epic_sso");
    const decodedBearerCookie = await getDecryptedCookie(userId, "epic_bearer");

    const cookie = `EPIC_SSO=${decodedSsoCookie}; EPIC_BEARER_TOKEN=${decodedBearerCookie}`;
    const firstUrl =
      "https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&locale=en-US";

    let response = await fetch(firstUrl, {
      headers: {
        Cookie: cookie,
      },
    });

    let data = await response.json();
    let nextPageToken = data.nextPageToken;

    const epicGames = data.orders.map((game: EpicStoreScrape) => ({
      gameName: game.items[0].description,
      store: "Epic",
      platform: "PC",
      imgUrl: "",
    }));

    while (nextPageToken) {
      const nextUrl = `https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&nextPageToken=${nextPageToken}&locale=en-US`;

      response = await fetch(nextUrl, {
        headers: {
          Cookie: cookie,
        },
      });

      data = await response.json();
      nextPageToken = data.nextPageToken;

      const nextGamePage = data.orders.map((game: EpicStoreScrape) => ({
        gameName: game.items[0].description,
        store: "Epic",
        platform: "PC",
        imgUrl: "",
      }));

      epicGames.push(...nextGamePage);
    }

    return NextResponse.json(epicGames, { status: 200 });
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return new Response("Access Forbidden", { status: 403 });
    }
    console.error("ERROR", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
