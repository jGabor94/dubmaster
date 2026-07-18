import { usersTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";


export const dubbingsTable = pgTable.withRLS("dubbings", {
  id: text().primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  sourceUrl: text("source_url").notNull(),
  storagePath: text("storage_path"),
  mimeType: varchar("mime_type", { length: 100 }).default("audio/mpeg").notNull(),
  status: varchar({ length: 20 }).default("queued").notNull(),
  progress: integer().default(0).notNull(),
  errorMessage: text("error_message"),
  attempts: integer().default(0).notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
  unique("dubbings_storage_path_key").on(table.storagePath),]);

