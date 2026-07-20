"use client";

import { FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const errorMessages: Record<string, string> = {
  AccessDenied: "Ez a Google-fiók nincs engedélyezve.",
  Callback: "A Google-belépés feldolgozása sikertelen.",
  Configuration: "A Google-belépés konfigurációja hibás.",
  OAuthAccountNotLinked: "Ez a Google-fiók nincs összekapcsolva.",
  OAuthCallback: "A Google-belépés visszaigazolása sikertelen.",
  OAuthSignin: "Nem sikerült elindítani a Google-belépést.",
  Verification: "A belépési ellenőrzés sikertelen.",
};

const LoginErrorToast: FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;

    toast.error(errorMessages[error] ?? "A bejelentkezés sikertelen.");
  }, [error]);

  return null;
}

export default LoginErrorToast;
