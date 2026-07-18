import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth, signIn, signOut } from "@/features/authentication/lib/auth";

export async function AuthControls({ showGoogleSignIn = false }: { showGoogleSignIn?: boolean }) {
  const session = await auth();

  if (!session) {
    if (!showGoogleSignIn) {
      return (
        <Link href="/login" className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white">
          <LogIn className="size-3.5" /> Belépés
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
      <span className="hidden max-w-44 truncate text-xs text-white/45 sm:block">{session.user.email}</span>
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
