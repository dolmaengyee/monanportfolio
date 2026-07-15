import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'

/* ── GET /api/admin/session ──────────────────────────
 *  Lightweight guarded endpoint used by useAuth to
 *  determine whether the current visitor is logged in.
 * ──────────────────────────────────────────────────── */
export async function GET() {
  const authenticated = await isAdminAuthenticated()
  return NextResponse.json({ authenticated })
}
