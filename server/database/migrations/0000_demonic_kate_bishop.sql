CREATE TABLE "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_request_id" integer NOT NULL,
	"support_application_id" integer NOT NULL,
	"coordinator_id" integer NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"current_task_id" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "need_request_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_type_id" integer NOT NULL,
	"field_name" text NOT NULL,
	"label" text NOT NULL,
	"type" text NOT NULL,
	"required" boolean DEFAULT false NOT NULL,
	"options" jsonb,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "need_request_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_request_id" integer NOT NULL,
	"field_id" integer NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "need_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_type_id" integer NOT NULL,
	"applicant_id" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"is_urgent" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "need_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipient_id" integer NOT NULL,
	"type" text NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"related_record_id" integer,
	"related_record_type" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support_application_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_type_id" integer NOT NULL,
	"field_name" text NOT NULL,
	"label" text NOT NULL,
	"type" text NOT NULL,
	"required" boolean DEFAULT false NOT NULL,
	"options" jsonb,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support_application_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"support_application_id" integer NOT NULL,
	"field_id" integer NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_type_id" integer NOT NULL,
	"supporter_id" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task_updates" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"status" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_type_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text,
	"phone" text,
	"role" text DEFAULT 'user' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_need_request_id_need_requests_id_fk" FOREIGN KEY ("need_request_id") REFERENCES "public"."need_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_support_application_id_support_applications_id_fk" FOREIGN KEY ("support_application_id") REFERENCES "public"."support_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_coordinator_id_users_id_fk" FOREIGN KEY ("coordinator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_current_task_id_tasks_id_fk" FOREIGN KEY ("current_task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "need_request_fields" ADD CONSTRAINT "need_request_fields_need_type_id_need_types_id_fk" FOREIGN KEY ("need_type_id") REFERENCES "public"."need_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "need_request_values" ADD CONSTRAINT "need_request_values_need_request_id_need_requests_id_fk" FOREIGN KEY ("need_request_id") REFERENCES "public"."need_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "need_request_values" ADD CONSTRAINT "need_request_values_field_id_need_request_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."need_request_fields"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "need_requests" ADD CONSTRAINT "need_requests_need_type_id_need_types_id_fk" FOREIGN KEY ("need_type_id") REFERENCES "public"."need_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "need_requests" ADD CONSTRAINT "need_requests_applicant_id_users_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_users_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_application_fields" ADD CONSTRAINT "support_application_fields_need_type_id_need_types_id_fk" FOREIGN KEY ("need_type_id") REFERENCES "public"."need_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_application_values" ADD CONSTRAINT "support_application_values_support_application_id_support_applications_id_fk" FOREIGN KEY ("support_application_id") REFERENCES "public"."support_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_application_values" ADD CONSTRAINT "support_application_values_field_id_support_application_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."support_application_fields"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_applications" ADD CONSTRAINT "support_applications_need_type_id_need_types_id_fk" FOREIGN KEY ("need_type_id") REFERENCES "public"."need_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_applications" ADD CONSTRAINT "support_applications_supporter_id_users_id_fk" FOREIGN KEY ("supporter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_updates" ADD CONSTRAINT "task_updates_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_updates" ADD CONSTRAINT "task_updates_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_need_type_id_need_types_id_fk" FOREIGN KEY ("need_type_id") REFERENCES "public"."need_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;