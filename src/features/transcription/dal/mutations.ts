"use server";

import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

import { openai } from "@ai-sdk/openai";
import { generateSpeech, generateText, transcribe } from "ai";
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

export const dubYoutubeVideo = Dal.create({ cache: false })
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

      const translation = await generateText({
        model: openai("gpt-4o-mini"),
        system:
          "You are a professional Hungarian audiovisual translator. Translate the transcript into natural, fluent Hungarian suitable for voice-over. Preserve the meaning, tone, names, and paragraph structure. Return only the translated Hungarian text, without explanations or quotation marks.",
        prompt: result.text,
      });

      const speech = await generateSpeech({
        model: openai.speech("gpt-4o-mini-tts"),
        text: translation.text,
        voice: "alloy",
        language: "hu",
        outputFormat: "mp3",
        instructions: "Speak naturally in Hungarian with clear pronunciation and a calm, professional documentary voice.",
      });

      console.log("Hungarian dubbing audio generated.");
      return createSuccessReturn({
        audioUrl: `data:${speech.audio.mediaType};base64,${speech.audio.base64}`,
      });
    } catch (error) {
      console.error("YouTube transcription failed:", error);
      return createErrorReturn({ type: "transcription-error" });
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
