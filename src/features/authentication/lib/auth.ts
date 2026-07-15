import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config"
import { customAdapter } from "./NextAuth_adapter"

const ALLOWED_GOOGLE_EMAIL = "jakucs.gabor94@gmail.com"

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
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        signIn: async ({ user, account }) =>
            account?.provider === "google" && user.email?.toLowerCase() === ALLOWED_GOOGLE_EMAIL,
        jwt: async ({ token, user, trigger, session }) => {
            const userData = user

            if (trigger === "update" && session) return { ...token, userData: { ...session.user } }

            if (userData) return {
                ...token, userData: {
                    id: userData.id,
                    username: user.username,
                    roles: userData.roles,
                    email: user.email
                }
            }
            return token
        },
        session: async ({ session, token }) => ({ ...session, user: { ...session.user, ...token.userData } })
    },
})
