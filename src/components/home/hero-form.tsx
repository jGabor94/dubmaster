"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Link2, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dubYoutubeVideo } from "@/features/transcription/dal/mutations";

export function HeroForm() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setAudioUrl("");

    const result = await dubYoutubeVideo(url);
    setIsLoading(false);

    if (!result.success) {
      const message = result.error.type === "zod-input-error"
        ? "Kérjük, adj meg egy érvényes YouTube-videó linket."
        : result.error.type === "transcription-error"
          ? "A videó feldolgozása sikertelen. Ellenőrizd a szerver beállításait."
          : "A videó feldolgozása sikertelen.";
      setMessage(message);
      toast.error(message);
      return;
    }

    setMessage("A magyar hang elkészült.");
    setAudioUrl(result.data.audioUrl);
    toast.success("A magyar szinkron elkészült.");
  }

  return (
    <div id="start" className="mt-12 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/[0.14] bg-white/[0.06] p-2 shadow-[0_20px_80px_rgba(95,73,190,0.14)] backdrop-blur-xl transition-colors focus-within:border-[#9e85ff]/60">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
            <Link2 className="size-5 shrink-0 text-white/35" />
            <Input
              aria-label="YouTube videó linkje"
              value={url}
              disabled={isLoading}
              onChange={(event) => { setUrl(event.target.value); setMessage(""); }}
              placeholder="Illeszd be a YouTube-linket..."
              className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-sm text-white shadow-none outline-none placeholder:text-white/30 focus-visible:ring-0"
              type="url"
            />
          </div>
          <Button type="submit" disabled={isLoading} aria-busy={isLoading} className="h-12 rounded-xl bg-white px-5 text-sm font-semibold text-[#0b0c11] hover:bg-[#e9e4ff]">
            {isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Feldolgozás...</> : <>Fordítás indítása <ArrowRight className="size-4" /></>}
          </Button>
        </div>
      </form>
      {isLoading && (
        <div className="mt-4 overflow-hidden rounded-xl border border-[#9e85ff]/25 bg-[#9e85ff]/[0.08] px-4 py-3 text-left" role="status" aria-live="polite">
          <div className="flex items-center gap-3 text-xs text-white/70">
            <LoaderCircle className="size-4 shrink-0 animate-spin text-[#b7a1ff]" />
            <span>Letöltjük a videót, lefordítjuk, majd elkészítjük a magyar hangot...</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 animate-[progress_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#9e85ff] to-[#5fd8d6]" />
          </div>
        </div>
      )}
      <p role="status" className={`mt-3 min-h-5 text-xs ${message.includes("elkészült") ? "text-[#54e3b4]" : "text-[#ff9da8]"}`}>{message}</p>
      {audioUrl && <audio className="mt-4 w-full" controls src={audioUrl} />}
    </div>
  );
}
