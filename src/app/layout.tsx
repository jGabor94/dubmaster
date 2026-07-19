import type { Metadata } from "next";
import "./globals.css";

import { ToastProvider } from "@/components/providers/ToastProvider";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Dubmaster — AI videó szinkronizálás",
  description: "Fordítsd és szinkronizáld YouTube-videóidat természetes magyar hanggal.",
};

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="hu">
    <body className="antialiased">
      {children}
      <ToastProvider />
    </body>
  </html>
);


export default Layout;
