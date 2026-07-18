"use client";

import { ExternalLink, LoaderCircle } from "lucide-react";
import { useRef } from "react";
import useSWR from "swr";

import { getDubbingHistory } from "@/features/dubbing/dal/queries";

type HistoryResult = Extract<Awaited<ReturnType<typeof getDubbingHistory>>, { success: true }>;
type DubbingHistory = HistoryResult["data"];

export function HistoryList({ initialHistory }: { initialHistory: DubbingHistory }) {
  const audioUrls = useRef(new Map<string, string>());
  const { data: result } = useSWR("dubbing-history", getDubbingHistory, {
    fallbackData: { success: true as const, data: initialHistory },
    refreshInterval: (latestResult) => {
      if (!latestResult?.success) return 10000;
      return latestResult.data.some((dubbing) => !["completed", "failed"].includes(dubbing.status)) ? 10000 : 0;
    },
  });

  if (!result?.success || result.data.length === 0) {
    return <div className="mt-12 rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/45">Még nincs mentett szinkronod.</div>;
  }

  const history = result.data.map((dubbing) => {
    const stableAudioUrl = audioUrls.current.get(dubbing.id) ?? dubbing.audioUrl;
    if (stableAudioUrl) audioUrls.current.set(dubbing.id, stableAudioUrl);

    return { ...dubbing, audioUrl: stableAudioUrl };
  });

  return (
    <div className="mt-10 space-y-4">
      {history.map((dubbing) => (
        <article key={dubbing.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm text-white/75">{dubbing.sourceUrl}</p>
              <p className="mt-2 text-xs text-white/35">{dubbing.createdAt.toLocaleString("hu-HU")}</p>
            </div>
            <span className={`inline-flex w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs ${dubbing.status === "completed" ? "border-[#54e3b4]/25 bg-[#54e3b4]/10 text-[#54e3b4]" : dubbing.status === "failed" ? "border-[#ff9da8]/25 bg-[#ff9da8]/10 text-[#ff9da8]" : "border-[#b7a1ff]/25 bg-[#b7a1ff]/10 text-[#cbbdff]"}`}>
              {dubbing.status}
            </span>
          </div>
          {dubbing.audioUrl && (
            <a href={dubbing.audioUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs text-[#b7a1ff] hover:text-white">
              Megnyitás <ExternalLink className="size-3.5" />
            </a>
          )}
          {dubbing.audioUrl ? <audio className="mt-4 w-full" controls src={dubbing.audioUrl} /> : dubbing.status === "failed" ? <p className="mt-4 text-xs text-[#ff9da8]">A feldolgozás sikertelen.</p> : <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/45" role="status" aria-live="polite"><LoaderCircle className="size-3.5 animate-spin text-[#b7a1ff]" /><span>Feldolgozás alatt ({dubbing.status})...</span></div>}
        </article>
      ))}
    </div>
  );
}
