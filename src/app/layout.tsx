import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
