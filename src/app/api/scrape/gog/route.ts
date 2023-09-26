import { getDecryptedCookie } from "@/db/db";
import { auth } from "@clerk/nextjs";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

type GogStoreScrape = {
  title: string;
  image: string;
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = "https://www.gog.com/en/account";

    let decodedUSCookie = "";
    let decodedAlCookie = "";

    try {
      decodedUSCookie = await getDecryptedCookie(userId, "gog_us");
      decodedAlCookie = await getDecryptedCookie(userId, "gog_al");
    } catch (error) {
      return new Response("Cookie not found", { status: 404 });
    }
    const cookie = `gog_us=${decodedUSCookie}; gog-al=${decodedAlCookie}`;

    const response = await fetch(url, {
      headers: { Cookie: cookie },
    });

    const text = await response.text();

    // Load the HTML into cheerio and get the gogData var from the script tag
    const $ = cheerio.load(text);
    const scriptData = $("script").get()[4].children[0].data;
    const match = scriptData.match(/var gogData = (.*);/);

    const parseData = JSON.parse(match[1]);
    const gogGames = parseData.accountProducts.map(
      (product: GogStoreScrape) => ({
        gameName: product.title,
        store: "GOG",
        platform: "PC",
        imgUrl: `https:${product.image}_196.jpg`,
      })
    );

    return NextResponse.json(gogGames, { status: 200 });
  } catch (error: any) {
    if (error instanceof TypeError) {
      return new Response("Access Forbidden", { status: 403 });
    }
    console.error("ERROR", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
