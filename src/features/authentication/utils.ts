export const BOOTSTRAP_ADMIN_EMAIL = "jakucs.gabor94@gmail.com";

export function isBootstrapAdminEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() === BOOTSTRAP_ADMIN_EMAIL;
}
