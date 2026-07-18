"use server";

import { z } from "zod";

import { createDubbing } from "@/features/dubbing/drizzle/operations";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";

const workerUrl = process.env.DUBBING_WORKER_URL ?? "http://localhost:4000";

const youtubeUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => isYoutubeUrl(value), "A megadott URL nem YouTube-videó link.");

function isYoutubeUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;

    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    if (hostname === "youtu.be") return url.pathname.length > 1;
    if (hostname !== "youtube.com" && hostname !== "m.youtube.com") return false;

    return Boolean(
      url.searchParams.get("v") ||
        url.pathname.startsWith("/shorts/") ||
        url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/live/"),
    );
  } catch {
    return false;
  }
}

export const dubYoutubeVideo = Dal.create({ cache: false })
  .$Input<[string]>()
  .schema({ input: z.tuple([youtubeUrlSchema]) })
  .authenticate()
  .operation(async ({ input: [sourceUrl], user }) => {
    const dubbing = await createDubbing({
      id: crypto.randomUUID(),
      userId: user.id,
      sourceUrl,
      storagePath: null,
    });

    try {
      const response = await fetch(`${workerUrl}/jobs/dubbing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DUBMASTER_WORKER_TOKEN}`,
        },
        body: JSON.stringify({
          dubbingId: dubbing.id,
          sourceUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Dubbing worker returned ${response.status}.`);
      }

      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== "object" ||
        !("dubbingId" in result) ||
        !("status" in result) ||
        result.dubbingId !== dubbing.id ||
        result.status !== "queued"
      ) {
        throw new Error("Dubbing worker returned an invalid response.");
      }

      return createSuccessReturn({ dubbingId: dubbing.id, status: "queued" as const });
    } catch (error) {
      console.error("Failed to queue dubbing job:", error);
      return createErrorReturn({ type: "worker-unavailable" });
    }
  });
