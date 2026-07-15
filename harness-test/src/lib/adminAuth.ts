import crypto from "node:crypto"
import { cookies } from "next/headers"

/**
 * Server-only admin session helpers.
 *
 * The session cookie stores the SHA-256 hex of ADMIN_PASSWORD (a secret the
 * client never receives). ADMIN_PASSWORD must be a server-only env var — never
 * prefix it with NEXT_PUBLIC_, or it would be embedded in the client bundle.
 */

export const ADMIN_COOKIE = "admin_session"

/** SHA-256 hex digest used as the opaque session token. */
export function sessionToken(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

/** Sets the httpOnly admin session cookie for 24 hours. */
export async function setAdminSession(password: string): Promise<void> {
  const store = await cookies()
  store.set(ADMIN_COOKIE, sessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400,
    path: "/",
  })
}

/** Clears the admin session cookie. */
export async function clearAdminSession(): Promise<void> {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
}

/** Constant-time verification of the current request's admin cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  if (!token) return false
  const valid = sessionToken(expected)
  if (token.length !== valid.length) return false
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(valid))
}
