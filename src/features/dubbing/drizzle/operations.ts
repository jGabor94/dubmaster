"server only";

import { db } from "@/drizzle/db";
import { desc, eq } from "drizzle-orm";

import { dubbingsTable } from "./schema";

export async function createDubbing(input: {
  id: string;
  userId: string;
  sourceUrl: string;
  storagePath?: string | null;
  mimeType?: string;
}) {
  const [dubbing] = await db.insert(dubbingsTable).values(input).returning();
  return dubbing;
}

export async function getDubbingHistoryQuery(userId: string) {
  return db
    .select()
    .from(dubbingsTable)
    .where(eq(dubbingsTable.userId, userId))
    .orderBy(desc(dubbingsTable.createdAt));
}
