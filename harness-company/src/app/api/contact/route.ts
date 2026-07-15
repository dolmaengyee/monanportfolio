import { NextResponse } from 'next/server'
import { insertContact, isDbConfigured } from '@/lib/db'

/* ── POST /api/contact ───────────────────────────────
 *  Public contact form endpoint. Validates input and
 *  stores the submission in Neon. When DATABASE_URL is
 *  not set, responds { saved: false } so the form can
 *  show a graceful "저장 설정 전" message instead of failing.
 * ──────────────────────────────────────────────────── */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name) {
    return NextResponse.json({ ok: false, error: '이름을 입력해주세요.' }, { status: 400 })
  }

  if (!isDbConfigured()) {
    // DATABASE_URL not set — accept but do not persist.
    return NextResponse.json({ ok: true, saved: false })
  }

  try {
    await insertContact({
      name,
      email: email || null,
      phone: phone || null,
      message: message || null,
    })
    return NextResponse.json({ ok: true, saved: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: '저장 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
