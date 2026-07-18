"use server";

import { z } from "zod";

import { addAllowedGoogleEmail, removeAllowedGoogleEmail } from "@/features/authorization/drizzle/operations";
import { isBootstrapAdminEmail } from "@/features/authentication/utils";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";

const emailSchema = z.tuple([z.string().trim().toLowerCase().email()]);

export const addAllowedGoogleEmailAddress = Dal.create({ cache: false })
  .$Input<[string]>()
  .schema({ input: emailSchema })
  .authenticate()
  .authorize({ resource: "allowedGoogleEmail", action: "create" })
  .operation(async ({ input: [email], user }) => {
    if (isBootstrapAdminEmail(email)) return createErrorReturn({ type: "bootstrap-email" });

    const allowedEmail = await addAllowedGoogleEmail(email, user.id);
    if (!allowedEmail) return createErrorReturn({ type: "already-allowed" });

    return createSuccessReturn(allowedEmail);
  });

export const removeAllowedGoogleEmailAddress = Dal.create({ cache: false })
  .$Input<[string]>()
  .schema({ input: emailSchema })
  .authenticate()
  .authorize({ resource: "allowedGoogleEmail", action: "delete" })
  .operation(async ({ input: [email] }) => {
    if (isBootstrapAdminEmail(email)) return createErrorReturn({ type: "bootstrap-email" });

    await removeAllowedGoogleEmail(email);
    return createSuccessReturn();
  });
