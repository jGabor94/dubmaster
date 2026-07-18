import { ArrowLeft, AudioLines, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { AuthControls } from "@/components/auth/auth-controls";
import { LoginErrorToast } from "@/components/auth/login-error-toast";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-white">
      <LoginErrorToast error={error} />
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_20px_80px_rgba(95,73,190,0.14)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-[#0b0c11]">
          <AudioLines className="size-6" />
        </div>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white">
          <ArrowLeft className="size-3.5" /> Vissza a kezdőlapra
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Belépés a dubmasterbe</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">A mentett magyar szinkronjaid megtekintéséhez jelentkezz be Google-fiókkal.</p>
        <div className="mt-8 flex justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <AuthControls showGoogleSignIn />
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30">
          <LockKeyhole className="size-3.5 text-[#54e3b4]" /> Csak az engedélyezett Google-fiók használható.
        </p>
      </div>
    </main>
  );
}
