import { dubbingsTable } from "./drizzle/schema";
import type { getDubbingHistoryQuery } from "./drizzle/operations";

export type InsertDubbing = typeof dubbingsTable.$inferInsert;
export type SelectDubbing = typeof dubbingsTable.$inferSelect;
export type DubbingHistory = Awaited<ReturnType<typeof getDubbingHistoryQuery>>[number] & {
  audioUrl: string | null;
};
