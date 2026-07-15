"use server";

import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { dubbingsTable } from "@/features/dubbing/drizzle/schema";
import { Dal } from "@/lib/dal";
import { createSuccessReturn } from "@/lib/dal/types";
import { getSupabaseAdmin, SUPABASE_AUDIO_BUCKET } from "@/lib/supabase/server";

export const getDubbingHistory = Dal.create()
  .authenticate()
  .operation(async ({ user }) => {
    const dubbings = await db
      .select()
      .from(dubbingsTable)
      .where(eq(dubbingsTable.userId, user.id))
      .orderBy(desc(dubbingsTable.createdAt));

    const supabase = getSupabaseAdmin();
    const history = await Promise.all(
      dubbings.map(async (dubbing) => {
        const { data, error } = await supabase.storage
          .from(SUPABASE_AUDIO_BUCKET)
          .createSignedUrl(dubbing.storagePath, 60 * 60);

        return {
          ...dubbing,
          audioUrl: error ? null : data.signedUrl,
        };
      }),
    );

    return createSuccessReturn(history);
  });
