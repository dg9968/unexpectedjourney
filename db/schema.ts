import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  destinationSlug: text("destination_slug").notNull(),
  sessionId: text("session_id").notNull(),
  childName: text("child_name").notNull(),
  childAge: text("child_age").notNull(),
  parentName: text("parent_name").notNull(),
  parentPhone: text("parent_phone").notNull(),
  parentEmail: text("parent_email").notNull(),
  school: text("school").notNull(),
  emergencyContactName: text("emergency_contact_name").notNull(),
  emergencyContactPhone: text("emergency_contact_phone").notNull(),
  medicalNotes: text("medical_notes"),
  comments: text("comments"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});
