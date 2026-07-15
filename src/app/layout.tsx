import type { Metadata } from "next";
import "./globals.css";

import { ToastProvider } from "@/components/providers/toast-provider";

export const metadata: Metadata = {
  title: "Dubmaster — AI videó szinkronizálás",
  description: "Fordítsd és szinkronizáld YouTube-videóidat természetes magyar hanggal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
