import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  gameName: text("game_name").notNull(),
  store: text("store").notNull(),
  platform: text("platform").notNull(),
  imgUrl: text("img_url"),
});
