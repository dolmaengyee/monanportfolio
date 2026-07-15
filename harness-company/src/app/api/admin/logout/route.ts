import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/auth'

/* ── POST /api/admin/logout ──────────────────────────
 *  Clears the admin session cookie.
 * ──────────────────────────────────────────────────── */
export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}
