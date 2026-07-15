import { RolesWithPermissions } from "./types";

export const ROLES = {
    admin: {
        changelog: {
            create: true,
            delete: true,
        }
    }
} as const as RolesWithPermissions
