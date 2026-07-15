import { db } from "@/drizzle/db";
import { accountsTable, usersTable } from "@/drizzle/schema";
import { extractUsername } from "@/features/user/utils";
import { and, eq, getTableColumns } from "drizzle-orm";
import { Adapter } from "next-auth/adapters";
import { Email } from "../types";

export const customAdapter: Adapter = {
    async createUser(user) {
        const username = extractUsername(user.email as Email)
        const [createdUser] = await db.insert(usersTable).values({
            username: username,
            email: user.email,
            name: user.name || "",
            roles: ["user"],
            image: user.image || "",
            emailVerified: user.emailVerified
        }).returning();

        return createdUser
    },
    async getUser(id) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))

        if (user) return user
        return null
    },
    async getUserByEmail(email) {
        const { password, ...userColumns } = getTableColumns(usersTable)
        const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.email, email))

        if (user) return user
        return null
    },
    async linkAccount(account) {
        await db.insert(accountsTable).values(account)
        return account
    },
    async getUserByAccount({ providerAccountId, provider }) {

        const [account] = await db.select().from(accountsTable).where(and(eq(accountsTable.provider, provider), eq(accountsTable.providerAccountId, providerAccountId)))
        if (!account) return null;

        const { password, ...userColumns } = getTableColumns(usersTable)
        const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.id, account.userId))

        if (user) return user


        return null
    }
}