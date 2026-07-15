import { NextResponse } from "next/server"
import { clearAdminSession } from "@/lib/adminAuth"

// POST /api/admin/logout — clears the httpOnly admin_session cookie.
export async function POST(): Promise<NextResponse> {
  await clearAdminSession()
  return NextResponse.json({ ok: true })
}
