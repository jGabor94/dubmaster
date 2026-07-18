CREATE TABLE "dubbings" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"source_url" text NOT NULL,
	"storage_path" text CONSTRAINT "dubbings_storage_path_key" UNIQUE,
	"mime_type" varchar(100) DEFAULT 'audio/mpeg' NOT NULL,
	"status" varchar(20) DEFAULT 'queued' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"error_message" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dubbings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "allowed_google_emails" (
	"email" varchar(255) PRIMARY KEY,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text
);
--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text,
	"providerAccountId" text,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_pkey" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"username" varchar(100) NOT NULL,
	"password" varchar(100) DEFAULT '' NOT NULL,
	"email" varchar(100) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"name" varchar(100) DEFAULT '',
	"emailVerified" timestamp,
	"roles" varchar(100)[],
	"image" varchar(255) DEFAULT '' NOT NULL,
	"theme" varchar DEFAULT 'light' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "dubbings" ADD CONSTRAINT "dubbings_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;