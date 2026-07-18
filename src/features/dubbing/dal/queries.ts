"use server";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { dubbingsTable } from "@/features/dubbing/drizzle/schema";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";
import { getSupabaseAdmin, SUPABASE_AUDIO_BUCKET } from "@/lib/supabase/server";

export const getDubbingStatus = Dal.create({ cache: false })
  .$Input<[string]>()
  .authenticate()
  .operation(async ({ input: [dubbingId], user }) => {
    const [dubbing] = await db
      .select()
      .from(dubbingsTable)
      .where(and(eq(dubbingsTable.id, dubbingId), eq(dubbingsTable.userId, user.id)))
      .limit(1);

    if (!dubbing) {
      return createErrorReturn({ type: "not-found" });
    }

    let audioUrl: string | null = null;
    if (dubbing.storagePath) {
      const { data, error } = await getSupabaseAdmin().storage
        .from(SUPABASE_AUDIO_BUCKET)
        .createSignedUrl(dubbing.storagePath, 60 * 60);
      audioUrl = error ? null : data.signedUrl;
    }

    return createSuccessReturn({ ...dubbing, audioUrl });
  });

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
        if (!dubbing.storagePath) {
          return { ...dubbing, audioUrl: null };
        }

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
