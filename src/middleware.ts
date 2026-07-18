import NextAuth from "next-auth";

import { authConfig } from "@/features/authentication/lib/auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
