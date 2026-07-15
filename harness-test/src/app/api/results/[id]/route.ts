import { NextResponse } from "next/server"
import { getPublicResult } from "@/lib/db"

// GET /api/results/[id] — returns ONLY { name, finalType, createdAt }.
// Never returns phone. 404 when the row is missing or the DB is not configured.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params
  const row = await getPublicResult(id)
  if (!row) {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
  return NextResponse.json(row)
}
