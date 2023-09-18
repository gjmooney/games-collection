import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull(),
  username: text("username"),
});

export const userRelations = relations(users, ({ many }) => ({
  usersToGames: many(usersToGames),
}));

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
    gameOnPlatform: unique("game_on_platform").on(t.gameName, t.platform),
  })
);

export const gamesRelations = relations(games, ({ many }) => ({
  usersToGames: many(usersToGames),
}));

export const usersToGames = pgTable(
  "users_to_games",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.gameId),
  })
);

export const usersToGamesRelations = relations(usersToGames, ({ one }) => ({
  game: one(games, {
    fields: [usersToGames.gameId],
    references: [games.id],
  }),
  user: one(users, {
    fields: [usersToGames.userId],
    references: [users.id],
  }),
}));

export type GameInfoInsert = typeof games.$inferInsert;
export type GameInfoSelect = typeof games.$inferSelect;
export const InsertGameSchema = createInsertSchema(games);

export type UserInfo = typeof users.$inferInsert;
export const InsertUserSchema = createInsertSchema(users);
