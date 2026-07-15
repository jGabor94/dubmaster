"use server";

import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

import { openai } from "@ai-sdk/openai";
import { transcribe } from "ai";
import { z } from "zod";

import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";

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

function runYtDlp(url: string, outputDirectory: string) {
  return new Promise<void>((resolve, reject) => {
    const outputTemplate = join(outputDirectory, "audio.%(ext)s");
    const process = spawn("yt-dlp", [
      "--no-playlist",
      "--no-warnings",
      "-f",
      "bestaudio/best",
      "-o",
      outputTemplate,
      url,
    ]);

    let stderr = "";
    process.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    process.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") {
        reject(new Error("A szerveren nincs telepítve a yt-dlp."));
        return;
      }
      reject(error);
    });
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`A YouTube-hang letöltése sikertelen: ${stderr.trim()}`));
    });
  });
}

export const transcribeYoutubeVideo = Dal.create({ cache: false })
  .$Input<[string]>()
  .schema({ input: z.tuple([youtubeUrlSchema]) })
  .operation(async ({ input: [url] }) => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "dubmaster-"));

    try {
      await runYtDlp(url, outputDirectory);
      const files = await readdir(outputDirectory);
      const audioFileName = files.find((file) => file.startsWith("audio."));

      if (!audioFileName) {
        return createErrorReturn({ type: "audio-not-found" });
      }

      const audio = await readFile(join(outputDirectory, audioFileName));
      const result = await transcribe({
        model: openai.transcription("whisper-1"),
        audio,
      });

      console.log("YouTube transcription:", result.text);
      return createSuccessReturn(result.text);
    } catch (error) {
      console.error("YouTube transcription failed:", error);
      return createErrorReturn({ type: "transcription-error" });
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
