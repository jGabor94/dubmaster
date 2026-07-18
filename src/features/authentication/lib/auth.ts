import { getAllowedGoogleEmail } from "@/features/authorization/drizzle/operations"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { isBootstrapAdminEmail } from "../utils"
import { authConfig } from "./auth.config"
import { customAdapter } from "./NextAuth_adapter"

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
    ...authConfig,
    adapter: customAdapter,
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                },
            },
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    pages: {
        error: "/login",
    }
    ,
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider !== "google" || !user.email) return false;
            if (isBootstrapAdminEmail(user.email)) return true;

            const allowedEmail = await getAllowedGoogleEmail(user.email.toLowerCase());
            return Boolean(allowedEmail);
        },
        jwt: async ({ token, user, trigger, session }) => {
            const userData = user

            if (trigger === "update" && session) return { ...token, userData: { ...session.user } }

            if (userData) return {
                ...token, userData: {
                    id: userData.id,
                    username: user.username,
                    roles: isBootstrapAdminEmail(userData.email) ? ["admin"] : (userData.roles ?? ["user"]),
                    email: user.email
                }
            }
            return token
        },
        session: async ({ session, token }) => ({ ...session, user: { ...session.user, ...token.userData } })
    },
})
