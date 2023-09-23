import { relations } from "drizzle-orm";
import {
  index,
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  cookies: many(cookies),
  usersToGames: many(usersToGames),
}));

export const cookies = pgTable(
  "cookies",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    value: text("value").notNull(),
    userId: integer("user_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    cookieName: unique("cookie_name_user_id").on(t.name, t.userId),
  })
);

export const cookieRelations = relations(cookies, ({ one }) => ({
  users: one(users, {
    fields: [cookies.userId],
    references: [users.id],
  }),
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
      .references(() => users.id, { onDelete: "cascade" }),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
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

export const InsertCookieSchema = createInsertSchema(cookies);

export type UserInfo = typeof users.$inferInsert;
export const InsertUserSchema = createInsertSchema(users);
