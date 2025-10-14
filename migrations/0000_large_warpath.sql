CREATE TABLE "applications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" varchar NOT NULL,
	"koc_id" varchar NOT NULL,
	"status" text DEFAULT 'pending',
	"message" text NOT NULL,
	"submitted_content" json,
	"applied_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_id" text,
	"name" text NOT NULL,
	"logo" text,
	"brand_type" text,
	"industry" text,
	"description" text,
	"category" text,
	"total_campaigns" integer DEFAULT 0,
	"avg_reward" integer DEFAULT 0,
	"platforms" text,
	"status" text DEFAULT 'Active',
	"website" text,
	"contact_email" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"brand_id" varchar NOT NULL,
	"brand_name" text,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"type" text NOT NULL,
	"target_gender" text,
	"target_age_min" integer,
	"target_age_max" integer,
	"target_location" json,
	"target_followers" text,
	"platforms" json,
	"target_description" text,
	"min_engagement_rate" numeric(5, 2),
	"min_avg_views" integer,
	"content_type" text,
	"content_requirements" text,
	"hashtags" json,
	"posting_schedule" text,
	"reward" integer NOT NULL,
	"bonus_reward" integer,
	"reward_type" text,
	"reward_amount" integer,
	"budget" integer NOT NULL,
	"koc_needed" integer NOT NULL,
	"koc_applied" integer DEFAULT 0,
	"koc_selected" integer DEFAULT 0,
	"product_samples" boolean DEFAULT false,
	"start_date" timestamp,
	"end_date" timestamp,
	"application_deadline" timestamp,
	"selection_deadline" timestamp,
	"content_deadline" timestamp,
	"review_deadline" timestamp,
	"is_urgent" boolean DEFAULT false,
	"require_approval" boolean DEFAULT true,
	"auto_approve" boolean DEFAULT false,
	"is_private" boolean DEFAULT false,
	"content_usage_allowed" boolean DEFAULT false,
	"content_usage_months" integer,
	"product_return_required" boolean DEFAULT false,
	"product_return_guide" text,
	"guideline_url" text,
	"website_url" text,
	"requirements" json,
	"content" json,
	"timeline" json,
	"kpi" json,
	"status" text DEFAULT 'draft',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "koc_profiles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"followers" json,
	"categories" json DEFAULT '[]'::json,
	"location" text,
	"rating" numeric(3, 2) DEFAULT '0',
	"completed_campaigns" integer DEFAULT 0,
	"total_points" integer DEFAULT 0,
	"level" text DEFAULT 'Nano',
	"is_verified" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"target_audience" text DEFAULT 'all',
	"priority" text DEFAULT 'medium',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'publisher' NOT NULL,
	"avatar" text,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_koc_id_users_id_fk" FOREIGN KEY ("koc_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "koc_profiles" ADD CONSTRAINT "koc_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;