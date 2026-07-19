"use client";

import { Menu, ShieldCheck, UserRound } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FC } from "react";

type MobileNavigationProps = {
  active?: "home" | "history" | "admin";
  user: Session["user"];
};

const MobileNavigation: FC<MobileNavigationProps> = ({ active, user }) => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:bg-white/10 hover:text-white sm:hidden"
            aria-label="Menü megnyitása"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(20rem,calc(100vw-2rem))] border-white/10 bg-[#11131b] text-white"
      >
        <SheetHeader className="border-b border-white/10">
          <p className="text-sm text-white/45">Navigáció</p>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-2 px-4" aria-label="Mobil navigáció">
          <Link
            href="/home"
            className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white ${active === "home" ? "bg-white/10 text-white" : "text-white/65"}`}
          >
            Kezdőlap
          </Link>
          <Link
            href="/history"
            className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white ${active === "history" ? "bg-white/10 text-white" : "text-white/65"}`}
          >
            Előzmények
          </Link>
          {user.roles?.includes("admin") && (
            <Link
              href="/admin"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white ${active === "admin" ? "bg-white/10 text-white" : "text-white/65"}`}
            >
              <ShieldCheck className="size-4 text-[#b7a1ff]" />
              Admin
            </Link>
          )}
        </nav>
        <SheetFooter className="mt-auto border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar size="lg" className="border border-white/10 bg-white/10 text-[#b7a1ff]">
              {user.image && <AvatarImage src={user.image} alt="" />}
              <AvatarFallback>
                <UserRound />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <SheetTitle className="text-white">{user.name}</SheetTitle>
              <SheetDescription className="truncate text-white/45">
                {user.email}
              </SheetDescription>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavigation;
