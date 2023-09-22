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
