CREATE TABLE "registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"destination_slug" text NOT NULL,
	"session_id" text NOT NULL,
	"child_name" text NOT NULL,
	"child_age" text NOT NULL,
	"parent_name" text NOT NULL,
	"parent_phone" text NOT NULL,
	"parent_email" text NOT NULL,
	"school" text NOT NULL,
	"emergency_contact_name" text NOT NULL,
	"emergency_contact_phone" text NOT NULL,
	"medical_notes" text,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
