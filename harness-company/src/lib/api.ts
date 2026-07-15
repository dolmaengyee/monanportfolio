/* ── Client API helpers ──────────────────────────────
 *  Typed fetch wrappers around the /api route handlers.
 *  Use these from client components instead of talking to
 *  the database directly (the DB layer is server-only).
 * ──────────────────────────────────────────────────── */

export interface ContactInput {
  name: string
  email?: string
  phone?: string
  message?: string
}

export interface ContactRecord {
  id: string
  name: string
  email: string | null
  phone: string | null
  message: string | null
  created_at: string
}

/** Submit the public contact form. `saved` is false when the DB is not configured. */
export async function submitContact(
  input: ContactInput,
): Promise<{ ok: boolean; saved: boolean; error?: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok && data.ok === true, saved: data.saved === true, error: data.error }
}

/** Log in to the admin panel with the shared password. */
export async function adminLogin(
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok && data.ok === true, error: data.error }
}

/** Clear the admin session. */
export async function adminLogout(): Promise<void> {
  await fetch('/api/admin/logout', { method: 'POST' })
}

/** Check whether the current visitor has a valid admin session. */
export async function adminSession(): Promise<boolean> {
  const res = await fetch('/api/admin/session')
  const data = await res.json().catch(() => ({ authenticated: false }))
  return data.authenticated === true
}

/** Fetch all contact submissions (admin only). Throws on 401. */
export async function fetchContacts(): Promise<ContactRecord[]> {
  const res = await fetch('/api/admin/contacts')
  if (!res.ok) throw new Error('unauthorized')
  const data = await res.json().catch(() => ({ contacts: [] }))
  return (data.contacts as ContactRecord[]) ?? []
}
