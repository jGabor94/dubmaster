"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />;
}
