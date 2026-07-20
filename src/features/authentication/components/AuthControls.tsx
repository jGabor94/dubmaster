import { LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signIn, signOut } from "@/features/authentication/lib/auth";
import { FC } from "react";
import type { Session } from "next-auth";

interface AuthControlsProps {
  session?: Session | null;
  showGoogleSignIn?: boolean;
}

const AuthControls: FC<AuthControlsProps> = async ({ session: providedSession, showGoogleSignIn = false }) => {

  if (showGoogleSignIn) {
    return (
      <form action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/home" });
      }}>
        <button type="submit" className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white">
          <Image src="/googleButtonLogo.svg" alt="" width={18} height={18} /> Belépés Google-lel
        </button>
      </form>
    );
  }

  const session = providedSession === undefined ? await auth() : providedSession;

  if (!session) {
    if (!showGoogleSignIn) {
      return (
        <Link href="/login" className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white">
          <UserRound className="size-3.5" /> Belépés
        </Link>
      );
    }

    return (
      <form action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/home" });
      }}>
        <button type="submit" className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white">
          <Image src="/googleButtonLogo.svg" alt="" width={18} height={18} /> Belépés Google-lel
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-44 items-center gap-2 truncate text-xs text-white/45 sm:flex">
        <Avatar size="sm" className="border border-white/10 bg-white/10 text-white/60">
          {session.user.image && <AvatarImage src={session.user.image} alt="" />}
          <AvatarFallback><UserRound className="size-3.5" /></AvatarFallback>
        </Avatar>
        <span className="truncate">{session.user.email}</span>
      </span>
      <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}>
        <button type="submit" className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white">
          <LogOut className="size-3.5" /> Kilépés
        </button>
      </form>
    </div>
  );
}

export default AuthControls;
