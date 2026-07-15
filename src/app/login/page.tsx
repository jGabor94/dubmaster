import { AudioLines, LockKeyhole } from "lucide-react";

import { AuthControls } from "@/components/auth/auth-controls";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_20px_80px_rgba(95,73,190,0.14)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-[#0b0c11]">
          <AudioLines className="size-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Belépés a dubmasterbe</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">A mentett magyar szinkronjaid megtekintéséhez jelentkezz be Google-fiókkal.</p>
        <div className="mt-8 flex justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <AuthControls />
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30">
          <LockKeyhole className="size-3.5 text-[#54e3b4]" /> Csak az engedélyezett Google-fiók használható.
        </p>
      </div>
    </main>
  );
}
