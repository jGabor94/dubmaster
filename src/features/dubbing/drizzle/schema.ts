import { createdAt } from "@/drizzle/schemaTypes";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { usersTable } from "@/features/user/drizzle/schema";

export const dubbingsTable = pgTable("dubbings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  sourceUrl: text("source_url").notNull(),
  storagePath: text("storage_path").notNull().unique(),
  mimeType: varchar("mime_type", { length: 100 }).notNull().default("audio/mpeg"),
  createdAt,
});
