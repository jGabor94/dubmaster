import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const NotFound: FC = () => {

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090d] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,92,255,0.2),transparent_34%)]" />
      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-12">
        <p className="text-7xl font-semibold tracking-[-0.08em] text-[#b7a1ff]">404</p>
        <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Ez az oldal nem található</h1>
        <p className="mt-3 text-sm leading-6 text-white/50">
          A keresett oldal már nem létezik, vagy az URL hibásan lett megadva.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0b0c11] transition-transform hover:-translate-y-0.5 hover:bg-[#e9e4ff]"
        >
          <ArrowLeft className="size-4" />
          Vissza a főoldalra
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
