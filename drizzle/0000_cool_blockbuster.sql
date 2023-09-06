CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_name" text NOT NULL,
	"store" text NOT NULL,
	"platform" text NOT NULL,
	"img_url" text
);
