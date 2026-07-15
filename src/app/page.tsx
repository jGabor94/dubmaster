import { AudioLines, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";

import { AuthControls } from "@/components/auth/auth-controls";
import { HeroForm } from "@/components/home/hero-form";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,92,255,0.16),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(37,211,219,0.06),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Dubmaster kezdőlap">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0b0c11] shadow-[0_0_30px_rgba(255,255,255,0.16)]">
            <AudioLines className="size-5" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">dubmaster<span className="text-[#9e85ff]">.</span></span>
        </a>
        <nav className="flex items-center gap-5 text-xs text-white/40">
          <Link href="/history" className="transition-colors hover:text-white">Előzmények</Link>
          <AuthControls />
          <span className="flex items-center gap-2">
            <LockKeyhole className="size-3.5 text-[#54e3b4]" /> Privát béta
          </span>
        </nav>
      </header>

      <section id="top" className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pb-28 pt-24 text-center sm:pt-36">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-medium text-white/60 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-[#a98dff]" />
          Ismerősöknek, első körben
        </div>

        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.06em] text-white sm:text-7xl">
          Fordítsd le a videóidat
          <span className="block bg-gradient-to-r from-[#b7a1ff] via-[#8c78ff] to-[#5fd8d6] bg-clip-text text-transparent">magyarra.</span>
        </h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-white/45">
          Illeszd be egy YouTube-videó linkjét, és kipróbáljuk a magyar szinkront.
        </p>

        <HeroForm />

        <p className="mt-5 text-xs text-white/30">A béta jelenleg csak szűk körben érhető el.</p>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between border-t border-white/[0.08] px-6 py-6 text-xs text-white/25 lg:px-10">
        <span>© 2026 dubmaster</span>
        <span>Privát használatra</span>
      </footer>
    </main>
  );
}
