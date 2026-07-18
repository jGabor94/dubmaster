"use server";

import { getAllowedGoogleEmails as getAllowedGoogleEmailsOperation } from "@/features/authorization/drizzle/operations";
import { Dal } from "@/lib/dal";
import { createSuccessReturn } from "@/lib/dal/types";

export const getAllowedGoogleEmails = Dal.create()
  .authenticate()
  .authorize({ resource: "allowedGoogleEmail", action: "read" })
  .operation(async () => createSuccessReturn(await getAllowedGoogleEmailsOperation()));
