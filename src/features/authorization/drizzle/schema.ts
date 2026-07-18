import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const allowedGoogleEmailsTable = pgTable("allowed_google_emails", {
  email: varchar({ length: 255 }).primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
  createdBy: text("created_by"),
});
