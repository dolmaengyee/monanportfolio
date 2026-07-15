import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/adminAuth"
import { getAllResults } from "@/lib/db"

// GET /api/admin/results — full rows for the admin dashboard.
// Requires a valid admin_session cookie; 401 otherwise.
export async function GET(): Promise<NextResponse> {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const rows = await getAllResults()
  return NextResponse.json(rows)
}
