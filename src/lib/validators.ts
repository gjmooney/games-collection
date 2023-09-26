import { z } from "zod";

export const steamApiValidator = z.object({
  game_count: z.number(),
  games: z.array(
    z.object({
      appid: z.number(),
      name: z.string(),
      img_icon_url: z.string(),
    })
  ),
});

export const itchIoApiValidator = z.object({
  games: z.array(
    z.object({
      title: z.string(),
      cover: z.string(),
    })
  ),
});

export const cookieFormValidator = z.object({
  humble: z.string(),
  nintendo: z.string(),
  playstationUs: z.string(),
  playstationEu: z.string(),
  epic_sso: z.string(),
  epic_bearer: z.string(),

});

export type CookieNamesType = z.infer<typeof cookieFormValidator>;
