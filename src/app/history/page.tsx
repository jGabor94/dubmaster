import { ArrowLeft, AudioLines, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { HistoryList } from "@/components/history";
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
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[#b7a1ff] hover:text-white"><ArrowLeft className="size-4" /> Vissza a kezdőlapra</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Dubmaster kezdőlap">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0b0c11]"><AudioLines className="size-5" strokeWidth={2.5} /></span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">dubmaster<span className="text-[#9e85ff]">.</span></span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-xs text-white/50 hover:text-white"><ArrowLeft className="size-3.5" /> Új videó</Link>
      </header>
      <section className="mx-auto w-full max-w-4xl px-6 pb-20 pt-16 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9e85ff]">Saját könyvtár</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Előzmények</h1>
        <p className="mt-4 text-base text-white/45">A korábban elkészült magyar szinkronjaid.</p>
        <HistoryList initialHistory={result.data} />
      </section>
    </main>
  );
}
