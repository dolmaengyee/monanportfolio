import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { getContacts } from '@/lib/db'

/* ── GET /api/admin/contacts ─────────────────────────
 *  Cookie-guarded. Returns all contact submissions for
 *  the admin dashboard. Empty array when the DB is unset.
 * ──────────────────────────────────────────────────── */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: '인증이 필요합니다.' }, { status: 401 })
  }

  const contacts = await getContacts()
  return NextResponse.json({ ok: true, contacts })
}
