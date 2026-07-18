import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

const relations = defineRelations(schema, (r) => ({
    accountsTable: {
        user: r.one.usersTable({
            from: r.accountsTable.userId,
            to: r.usersTable.id
        }),
    },
    usersTable: {
        accounts: r.many.accountsTable(),
        dubbings: r.many.dubbingsTable(),
    },
    dubbingsTable: {
        user: r.one.usersTable({
            from: r.dubbingsTable.userId,
            to: r.usersTable.id
        }),
    },
}))

export default relations