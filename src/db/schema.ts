import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull(),
  username: text("username"),
});

export type GameInfo = typeof games.$inferInsert;
export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const games = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    gameName: text("game_name").notNull(),
    store: text("store").notNull(),
    platform: text("platform").notNull(),
    imgUrl: text("img_url"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    gameFromStore: unique("game_on_platform").on(t.gameName, t.store),
  })
);

export const selectGameSchema = createSelectSchema(games);
export const insertGameSchema = createInsertSchema(games);
