import { getDecryptedCookie } from "@/db/db";
import { convertTimeToDouble } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import puppeteer, { TimeoutError } from "puppeteer";
import { ZodError } from "zod";

// TODO read the docs about puppeteer core if this doesn't work on vercel
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    /* const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, userId));

    const encryptedCookie = await db
      .select({ value: cookies.value })
      .from(users)
      .innerJoin(cookies, eq(users.id, cookies.userId))
      .where(eq(cookies.name, "humble"));

    const decodedCookie = decryptCookies(encryptedCookie[0].value); */

    const decodedCookie = await getDecryptedCookie(userId);
    const url = "https://www.humblebundle.com/home/library";

    const expiration = convertTimeToDouble("2023-12-02T12:53:25.000Z");

    console.log("decodedCookie", decodedCookie);

    const cookieVal = [
      {
        name: "_simpleauth_sess",
        domain: ".humblebundle.com",
        expires: expiration,
        httpOnly: true,
        path: "/",
        samesite: "None",
        secure: true,
        value: decodedCookie,
      },
    ];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the auth cookie
    await page.setCookie(...cookieVal);

    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for JS on page to load
    await page.waitForSelector("div.selector-content");

    // Gets array of containers for game info
    const gameContainer = await page.$$("div.selector-content");

    // Go through those containers for name and image URL
    const humbleGames = [];

    for (let i = 0; i < gameContainer.length; i++) {
      const title = await gameContainer[i].$eval(
        "div.text-holder > h2",
        (i) => i.innerText
      );
      const image = await gameContainer[i].$eval(
        "div.icon",
        (i) => i.style.backgroundImage
      );

      humbleGames.push({
        gameName: title,
        store: "Humble",
        platform: "PC",
        imgUrl: image.substring(5, image.length - 2),
      });
    }

    // Clean up
    await browser.close();

    return NextResponse.json(humbleGames, { status: 200 });
  } catch (error: any) {
    // Type parsing error
    if (error instanceof ZodError) {
      return new Response("[PARSE_ERROR]" + error.message, { status: 422 });
    }

    if (error instanceof TimeoutError) {
      return new Response("The request timed out", { status: 403 });
    }

    console.log("ERROR", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
