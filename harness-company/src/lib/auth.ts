import 'server-only'
import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'

/* ── Admin session (server-only) ─────────────────────
 *  Simple password auth: the admin enters ADMIN_PASSWORD, the
 *  server stores its sha256 hex digest in an httpOnly cookie.
 *  No user accounts, no external auth provider.
 *
 *  Set ADMIN_PASSWORD in Vercel → Settings → Environment
 *  Variables (server-only, never exposed to the browser).
 * ──────────────────────────────────────────────────── */

export const ADMIN_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 86_400 // 24h in seconds

/** Deterministic session token derived from the admin password. */
export function sessionToken(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/** True when ADMIN_PASSWORD is configured on the server. */
export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

/** Validate a submitted password against ADMIN_PASSWORD. */
export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  return Boolean(expected) && password === expected
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  return Boolean(token) && token === sessionToken(password)
}
