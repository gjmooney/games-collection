import { convertTimeToDouble } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import puppeteer, { TimeoutError } from "puppeteer";
import { z } from "zod";

// TODO toast
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = "https://ec.nintendo.com/my/transactions/1";

    const expiration = convertTimeToDouble("2024-10-08T13:05:59.716Z");

    const cookie = [
      {
        name: "NASID",
        domain: "accounts.nintendo.com",
        expires: expiration,
        httpOnly: true,
        path: "/",
        secure: true,
        value: process.env.NINTENDO_COOKIE!,
      },
    ];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the auth cookie
    await page.setCookie(...cookie);

    await page.goto(url, { waitUntil: "networkidle2" });

    // Initially on first page
    await page.waitForNavigation();
    await page.waitForSelector("div.line-clamp-2");

    //Get first page
    const nintendoGames = await page.$$eval("div.line-clamp-2", (games) => {
      return games.map((game) => ({
        gameName: game.textContent,
        store: "Nintendo",
        platform: "Switch",
        imgUrl: "",
      }));
    });

    // Go through rest of pages
    for (let i = 2; i <= 5; i++) {
      console.log("Moving to page ", i);
      await page.waitForSelector("div.line-clamp-2");
      const nextPageLink = await page.$(`a[href="/my/transactions/${i}"]`);

      await nextPageLink?.click();

      // Get the titles
      const currentPageGames = await page.$$eval(
        "div.line-clamp-2",
        (games) => {
          return games.map((game) => ({
            gameName: game.textContent,
            store: "Nintendo",
            platform: "Switch",
            imgUrl: "",
          }));
        }
      );

      nintendoGames.push(...currentPageGames);
    }

    await browser.close();

    return NextResponse.json(nintendoGames);
  } catch (error: any) {
    // Type parsing error
    if (error instanceof z.ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }

    if (error instanceof TimeoutError) {
      return new Response("The request timed out", { status: 403 });
    }

    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
