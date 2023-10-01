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
  steam: z.string(),
  humble: z.string(),
  nintendo: z.string(),
  playstationUs: z.string(),
  playstationEu: z.string(),
  epic_sso: z.string(),
  epic_bearer: z.string(),
  gog_us: z.string(),
  gog_al: z.string(),
});

export type CookieNamesType = z.infer<typeof cookieFormValidator>;
