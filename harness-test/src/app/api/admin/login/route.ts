import { NextResponse } from "next/server"
import { setAdminSession } from "@/lib/adminAuth"

// POST /api/admin/login — compares { password } with the server ADMIN_PASSWORD.
// On success sets the httpOnly admin_session cookie; 401 otherwise.
export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const password = (body as Record<string, unknown>)?.password
  const expected = process.env.ADMIN_PASSWORD

  if (!expected || typeof password !== "string" || password !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  await setAdminSession(expected)
  return NextResponse.json({ ok: true })
}
