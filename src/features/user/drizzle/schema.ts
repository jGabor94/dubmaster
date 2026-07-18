import { sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable.withRLS("users", {
    id: text().primaryKey(),
    username: varchar({ length: 100 }).notNull(),
    password: varchar({ length: 100 }).default("").notNull(),
    email: varchar({ length: 100 }).notNull(),
    name: varchar({ length: 100 }).default(""),
    emailVerified: timestamp(),
    roles: varchar({ length: 100 }).array(),
    image: varchar({ length: 255 }).default("").notNull(),
    theme: varchar().default("light").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
    unique("users_email_key").on(table.email),]);


export const accountsTable = pgTable.withRLS("account", {
    userId: text().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text(),
    idToken: text("id_token"),
    sessionState: text("session_state"),
}, (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_pkey" }),
]);

