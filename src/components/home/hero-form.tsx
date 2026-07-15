"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroForm() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const parsedUrl = new URL(url);
      const isYoutube = parsedUrl.hostname === "youtu.be" || parsedUrl.hostname.endsWith("youtube.com");

      setMessage(isYoutube ? "A linket fogadtuk — hamarosan indulhat a fordítás." : "Kérjük, adj meg egy érvényes YouTube-linket.");
    } catch {
      setMessage("Kérjük, adj meg egy érvényes YouTube-linket.");
    }
  }

  return (
    <div id="start" className="mt-12 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/[0.14] bg-white/[0.06] p-2 shadow-[0_20px_80px_rgba(95,73,190,0.14)] backdrop-blur-xl transition-colors focus-within:border-[#9e85ff]/60">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
            <Link2 className="size-5 shrink-0 text-white/35" />
            <Input
              aria-label="YouTube videó linkje"
              value={url}
              onChange={(event) => { setUrl(event.target.value); setMessage(""); }}
              placeholder="Illeszd be a YouTube-linket..."
              className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-sm text-white shadow-none outline-none placeholder:text-white/30 focus-visible:ring-0"
              type="url"
            />
          </div>
          <Button type="submit" className="h-12 rounded-xl bg-white px-5 text-sm font-semibold text-[#0b0c11] hover:bg-[#e9e4ff]">
            Fordítás indítása <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
      <p role="status" className={`mt-3 min-h-5 text-xs ${message.includes("fogadtuk") ? "text-[#54e3b4]" : "text-[#ff9da8]"}`}>{message}</p>
    </div>
  );
}
