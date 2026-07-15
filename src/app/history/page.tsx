import { ArrowLeft, AudioLines, ExternalLink, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { getDubbingHistory } from "@/features/dubbing/dal/queries";

export default async function HistoryPage() {
  const result = await getDubbingHistory();

  if (!result.success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <LockKeyhole className="mx-auto size-8 text-[#9e85ff]" />
          <h1 className="mt-5 text-2xl font-semibold">Jelentkezz be az előzményekhez</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">A mentett magyar szinkronjaid csak a saját fiókodban érhetők el.</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[#b7a1ff] hover:text-white">
            <ArrowLeft className="size-4" /> Vissza a kezdőlapra
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Dubmaster kezdőlap">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0b0c11]">
            <AudioLines className="size-5" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">dubmaster<span className="text-[#9e85ff]">.</span></span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-xs text-white/50 hover:text-white">
          <ArrowLeft className="size-3.5" /> Új videó
        </Link>
      </header>

      <section className="mx-auto w-full max-w-4xl px-6 pb-20 pt-16 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9e85ff]">Saját könyvtár</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Előzmények</h1>
        <p className="mt-4 text-base text-white/45">A korábban elkészített magyar szinkronjaid.</p>

        {result.data.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/45">
            Még nincs mentett szinkronod.
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {result.data.map((dubbing) => (
              <article key={dubbing.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white/75">{dubbing.sourceUrl}</p>
                    <p className="mt-2 text-xs text-white/35">{dubbing.createdAt.toLocaleString("hu-HU")}</p>
                  </div>
                  {dubbing.audioUrl && (
                    <a href={dubbing.audioUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs text-[#b7a1ff] hover:text-white">
                      Megnyitás <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
                {dubbing.audioUrl ? <audio className="mt-4 w-full" controls src={dubbing.audioUrl} /> : <p className="mt-4 text-xs text-[#ff9da8]">Az audiohivatkozás jelenleg nem érhető el.</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
