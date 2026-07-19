import AuthControls from "@/features/authentication/components/AuthControls";
import { auth } from "@/features/authentication/lib/auth";
import { AudioLines, ChevronRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import MobileNavigation from "./MobileNavigation";

type SiteHeaderProps = {
  active?: "home" | "history" | "admin";
  showNavigation?: boolean;
};

const SiteHeader: FC<SiteHeaderProps> = async ({ active, showNavigation = true }) => {
  const session = await auth();
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
      <Link href="/home" className="flex shrink-0 items-center gap-3" aria-label="Dubmaster kezdőlap">
        <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0b0c11] shadow-[0_0_30px_rgba(255,255,255,0.16)]"><AudioLines className="size-5" strokeWidth={2.5} /></span>
        <span className="text-[15px] font-semibold tracking-[-0.02em]">dubmaster<span className="text-[#9e85ff]">.</span></span>
      </Link>
      <div className="flex items-center gap-7">
        {showNavigation && <nav className="hidden items-center gap-7 text-sm font-medium text-white/60 sm:flex" aria-label="Fő navigáció">
          <Link href="/home" className={`transition-colors hover:text-white ${active === "home" ? "text-white" : ""}`}>Kezdőlap</Link>
          <Link href="/history" className={`transition-colors hover:text-white ${active === "history" ? "text-white" : ""}`}>Előzmények</Link>
          {session?.user.roles?.includes("admin") && <Link href="/admin" className={`inline-flex items-center gap-1 transition-colors hover:text-white ${active === "admin" ? "text-white" : ""}`}><ShieldCheck className="size-4 text-[#b7a1ff]" /> Admin</Link>}
        </nav>}
        <AuthControls />
        {showNavigation && session?.user && <MobileNavigation active={active} user={session.user} />}
      </div>
      {showNavigation && <span className="hidden items-center gap-2 text-xs text-white/35 xl:flex"><ChevronRight className="size-3.5 text-[#54e3b4]" /> Privát béta</span>}
    </header>
  );
}

export default SiteHeader;

