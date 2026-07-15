import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  isAuthConfigured,
  sessionToken,
  verifyPassword,
} from '@/lib/auth'

/* ── POST /api/admin/login ───────────────────────────
 *  Body: { password }. Compares against ADMIN_PASSWORD and,
 *  on success, sets an httpOnly session cookie.
 * ──────────────────────────────────────────────────── */
export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD가 설정되지 않았습니다.' },
      { status: 503 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, error: '비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, sessionToken(password), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return response
}
