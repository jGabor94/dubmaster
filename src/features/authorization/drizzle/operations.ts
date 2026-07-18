import { asc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { allowedGoogleEmailsTable } from "@/features/authorization/drizzle/schema";

export async function getAllowedGoogleEmails() {
  return db.select().from(allowedGoogleEmailsTable).orderBy(asc(allowedGoogleEmailsTable.email));
}

export async function getAllowedGoogleEmail(email: string) {
  const [allowedEmail] = await db
    .select()
    .from(allowedGoogleEmailsTable)
    .where(eq(allowedGoogleEmailsTable.email, email))
    .limit(1);

  return allowedEmail ?? null;
}

export async function addAllowedGoogleEmail(email: string, createdBy: string) {
  const [allowedEmail] = await db
    .insert(allowedGoogleEmailsTable)
    .values({ email, createdBy })
    .onConflictDoNothing()
    .returning();

  return allowedEmail ?? null;
}

export async function removeAllowedGoogleEmail(email: string) {
  await db.delete(allowedGoogleEmailsTable).where(eq(allowedGoogleEmailsTable.email, email));
}
