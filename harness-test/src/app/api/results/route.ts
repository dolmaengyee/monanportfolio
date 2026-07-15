import { NextResponse } from "next/server"
import { insertResult } from "@/lib/db"
import type { TypeNumber, LikertAnswer } from "@/data/questions"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"

// POST /api/results — persists a completed result.
// Returns { id } (or { id: null } when the DB is not configured).
export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const name = typeof b.name === "string" ? b.name.trim() : ""
  const finalType = b.finalType

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 })
  }
  if (typeof finalType !== "number" || !Number.isInteger(finalType) || finalType < 1 || finalType > 9) {
    return NextResponse.json({ error: "invalid finalType" }, { status: 400 })
  }
  if (b.phone !== undefined && b.phone !== null && typeof b.phone !== "string") {
    return NextResponse.json({ error: "invalid phone" }, { status: 400 })
  }
  if (typeof b.scores !== "object" || b.scores === null) {
    return NextResponse.json({ error: "invalid scores" }, { status: 400 })
  }
  if (!Array.isArray(b.ranking)) {
    return NextResponse.json({ error: "invalid ranking" }, { status: 400 })
  }
  if (!Array.isArray(b.answers)) {
    return NextResponse.json({ error: "invalid answers" }, { status: 400 })
  }
  if (b.consentedAt !== undefined && b.consentedAt !== null && typeof b.consentedAt !== "string") {
    return NextResponse.json({ error: "invalid consentedAt" }, { status: 400 })
  }

  const id = await insertResult({
    name,
    phone: typeof b.phone === "string" ? b.phone.trim() || null : null,
    finalType: finalType as TypeNumber,
    scores: b.scores as TypeScores,
    ranking: b.ranking as TypeRanking,
    answers: b.answers as LikertAnswer[],
    consentedAt: typeof b.consentedAt === "string" ? b.consentedAt : null,
  })

  return NextResponse.json({ id })
}
