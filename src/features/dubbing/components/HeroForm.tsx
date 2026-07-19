"use client";

import { ArrowRight, Link2, LoaderCircle } from "lucide-react";
import { FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDubbingStatus } from "@/features/dubbing/dal/queries";
import { dubYoutubeVideo } from "@/features/transcription/dal/mutations";

const HeroForm: FC = () => {
  const [url, setUrl] = useState("");
  const [dubbingId, setDubbingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: statusResult } = useSWR(
    dubbingId,
    () => getDubbingStatus(dubbingId!),
    {
      refreshInterval: (latestResult) => {
        if (!latestResult?.success) return 3000;
        return latestResult.data.status === "completed" || latestResult.data.status === "failed" ? 0 : 3000;
      },
    },
  );

  useEffect(() => {
    if (!statusResult?.success) return;

    if (statusResult.data.status === "completed") {
      setIsLoading(false);
      toast.success("A magyar szinkron elkészült.");
    } else if (statusResult.data.status === "failed") {
      setIsLoading(false);
      toast.error("A videó feldolgozása sikertelen.");
    }
  }, [statusResult]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setDubbingId(null);

    const result = await dubYoutubeVideo(url);

    if (!result.success) {
      setIsLoading(false);
      const errorMessage = result.error.type === "zod-input-error"
        ? "Kérjük, adj meg egy érvényes YouTube-videó linket."
        : result.error.type === "unauthenticated"
          ? "A mentéshez be kell jelentkezned."
          : result.error.type === "worker-unavailable"
            ? "A feldolgozó szerver jelenleg nem érhető el."
            : "A videó feldolgozása sikertelen.";
      toast.error(errorMessage);
      return;
    }

    setDubbingId(result.data.dubbingId);
    toast.success("A videó bekerült a feldolgozási sorba.");
  }

  const isCompleted = statusResult?.success && statusResult.data.status === "completed";

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
              onChange={(event) => { setUrl(event.target.value); }}
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
            <span>A worker feldolgozza a videót. Az oldal automatikusan frissül, amikor elkészül a hang.</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 animate-[progress_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#9e85ff] to-[#5fd8d6]" />
          </div>
        </div>
      )}
      {isCompleted && statusResult.data.audioUrl && (
        <audio className="mt-4 w-full" controls src={statusResult.data.audioUrl} />
      )}
    </div>
  );
}

export default HeroForm;