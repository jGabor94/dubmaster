"server only";

import { db } from "@/drizzle/db";

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
