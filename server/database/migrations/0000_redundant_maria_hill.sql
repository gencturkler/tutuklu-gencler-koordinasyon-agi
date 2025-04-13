CREATE TABLE "todos" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"completed" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
