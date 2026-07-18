import { Sparkles } from "lucide-react";

import { HeroForm } from "@/components/home/hero-form";
import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,92,255,0.16),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(37,211,219,0.06),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <SiteHeader active="home" />
      <section id="top" className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pb-28 pt-24 text-center sm:pt-36">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-medium text-white/60 backdrop-blur-sm"><Sparkles className="size-3.5 text-[#a98dff]" /> Ismerősöknek, első körben</div>
        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.06em] text-white sm:text-7xl">Fordítsd le a videóidat<span className="block bg-gradient-to-r from-[#b7a1ff] via-[#8c78ff] to-[#5fd8d6] bg-clip-text text-transparent">magyarra.</span></h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-white/45">Illeszd be egy YouTube-videó linkjét, és kipróbáljuk a magyar szinkront.</p>
        <HeroForm />
        <p className="mt-5 text-xs text-white/30">A béta jelenleg csak szűk körben érhető el.</p>
      </section>
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-white/[0.08] px-6 py-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span>© 2026 dubmaster</span><span>Tulajdonos és készítő: Jakucs Gábor · jakucs.gabor94@gmail.com</span></footer>
    </main>
  );
}
