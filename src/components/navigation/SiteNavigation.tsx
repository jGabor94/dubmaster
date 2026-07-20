"use client";

import { FC } from "react";
import type { Session } from "next-auth";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MobileNavigation from "./MobileNavigation";

interface SiteNavigationProps {
  user: Session["user"] | null;
}

const SiteNavigation: FC<SiteNavigationProps> = ({ user }) => {
  const pathname = usePathname();
  const active = pathname === "/history" ? "history" : pathname === "/admin" ? "admin" : "home";

  return (
    <>
      <nav className="hidden items-center gap-7 text-sm font-medium text-white/60 sm:flex" aria-label="Fő navigáció">
        <Link href="/home" className={`transition-colors hover:text-white ${active === "home" ? "text-white" : ""}`}>Kezdőlap</Link>
        <Link href="/history" className={`transition-colors hover:text-white ${active === "history" ? "text-white" : ""}`}>Előzmények</Link>
        {user?.roles?.includes("admin") && <Link href="/admin" className={`inline-flex items-center gap-1 transition-colors hover:text-white ${active === "admin" ? "text-white" : ""}`}><ShieldCheck className="size-4 text-[#b7a1ff]" /> Admin</Link>}
      </nav>
      {user && <MobileNavigation active={active} user={user} />}
    </>
  );
};

export default SiteNavigation;
