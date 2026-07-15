import { NextResponse } from "next/server"
import { getRankingCounts } from "@/lib/db"

// GET /api/ranking — aggregated type distribution only: [{ finalType, count }].
// No personal data is exposed.
export async function GET(): Promise<NextResponse> {
  const counts = await getRankingCounts()
  return NextResponse.json(counts)
}
