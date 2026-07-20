import AuthControls from "@/features/authentication/components/AuthControls";
import { auth } from "@/features/authentication/lib/auth";
import { AudioLines, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import SiteNavigation from "./SiteNavigation";

interface SiteHeaderProps {
  showAuth?: boolean;
  showNavigation?: boolean;
}

const SiteHeader: FC<SiteHeaderProps> = async ({ showAuth = true, showNavigation = true }) => {
  const session = showAuth ? await auth() : null;

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
      <Link href="/home" className="flex shrink-0 items-center gap-3" aria-label="Dubmaster kezdőlap">
        <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0b0c11] shadow-[0_0_30px_rgba(255,255,255,0.16)]"><AudioLines className="size-5" strokeWidth={2.5} /></span>
        <span className="text-[15px] font-semibold tracking-[-0.02em]">dubmaster<span className="text-[#9e85ff]">.</span></span>
      </Link>
      <div className="flex items-center gap-7">
        {showNavigation && <SiteNavigation user={session?.user ?? null} />}
        {showAuth && <AuthControls session={session} />}
      </div>
      {showNavigation && <span className="hidden items-center gap-2 text-xs text-white/35 xl:flex"><ChevronRight className="size-3.5 text-[#54e3b4]" /> Privát béta</span>}
    </header>
  );
};

export default SiteHeader;
