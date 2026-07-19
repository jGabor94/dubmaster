import SiteHeader from "@/components/navigation/SiteHeader";
import { ArrowRight, AudioLines, Check, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const features = [
  [WandSparkles, "Automatikus fordítás", "Kontextushelyes, felolvasható magyar szöveg."],
  [AudioLines, "Természetes hang", "AI-generált magyar narráció, egyenletes hangzással."],
  [Check, "Saját könyvtár", "A kész szinkronjaid egy helyen, bármikor elérhetők."],
] as const;

const Page: FC = () => {

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(124,92,255,0.24),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(37,211,219,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <SiteHeader showNavigation={false} />
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#b7a1ff]/20 bg-[#9e85ff]/10 px-4 py-2 text-xs font-medium text-[#cbbdff] shadow-[0_0_40px_rgba(158,133,255,0.12)]"><Sparkles className="size-3.5" /> AI-powered magyar szinkron</div>
        <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-[0.96] tracking-[-0.075em] sm:text-8xl lg:text-9xl">A videóid.<span className="block bg-gradient-to-r from-[#d2c7ff] via-[#9e85ff] to-[#5fd8d6] bg-clip-text text-transparent">Magyarul.</span></h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-white/50 sm:text-lg">Természetes hangzású magyar szinkron YouTube-videóidhoz. Egy link, és az AI elvégzi a többit.</p>
        <Link href="/login" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0b0c11] shadow-[0_12px_40px_rgba(255,255,255,0.14)] transition-transform hover:-translate-y-0.5 hover:bg-[#e9e4ff]">Kipróbálom a dubmastert <ArrowRight className="size-4" /></Link>
        <div className="mt-16 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
          {features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"><Icon className="size-5 text-[#b7a1ff]" /><p className="mt-4 text-sm font-medium text-white/85">{title}</p><p className="mt-2 text-xs leading-5 text-white/40">{description}</p></div>)}
        </div>
      </section>
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-white/[0.08] px-6 py-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span>© 2026 dubmaster</span><span>Tulajdonos és készítő: Jakucs Gábor · jakucs.gabor94@gmail.com</span></footer>
    </main>
  );
}

export default Page;