import { neon } from "@neondatabase/serverless"
import type { TypeNumber, LikertAnswer } from "@/data/questions"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"

/**
 * Server-only Neon Postgres data access layer.
 *
 * The database is OPTIONAL: with no DATABASE_URL the template still runs, and
 * every helper degrades gracefully (insert returns null, reads return empty).
 * Never import this file from a "use client" component — it must stay server-side.
 *
 * Table schema (run once in the Neon SQL editor):
 *   CREATE TABLE IF NOT EXISTS test_results (
 *     id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *     name         text NOT NULL,
 *     phone        text,
 *     final_type   text NOT NULL,
 *     scores       jsonb,
 *     ranking      jsonb,
 *     answers      jsonb,
 *     consented_at timestamptz,
 *     created_at   timestamptz DEFAULT now()
 *   );
 */

type Row = Record<string, unknown>
type Sql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Row[]>

/** Returns a Neon SQL client (tagged-template query fn), or null when DATABASE_URL is unset. */
export function getDb(): Sql | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url) as unknown as Sql
}

export interface InsertResultParams {
  name: string
  phone?: string | null
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  answers: LikertAnswer[]
  consentedAt?: string | null
}

/** Inserts a completed result. Returns the new row id, or null when the DB is unavailable. */
export async function insertResult(params: InsertResultParams): Promise<string | null> {
  const sql = getDb()
  if (!sql) return null
  try {
    const rows = await sql`
      INSERT INTO test_results (name, phone, final_type, scores, ranking, answers, consented_at)
      VALUES (
        ${params.name},
        ${params.phone ?? null},
        ${String(params.finalType)},
        ${JSON.stringify(params.scores)}::jsonb,
        ${JSON.stringify(params.ranking)}::jsonb,
        ${JSON.stringify(params.answers)}::jsonb,
        ${params.consentedAt ?? null}
      )
      RETURNING id`
    return (rows[0]?.id as string) ?? null
  } catch {
    return null
  }
}

export interface PublicResult {
  name: string
  finalType: TypeNumber
  createdAt: string
}

/** Public-safe single result — NEVER includes phone. Null when missing or DB unavailable. */
export async function getPublicResult(id: string): Promise<PublicResult | null> {
  const sql = getDb()
  if (!sql) return null
  try {
    const rows = await sql`
      SELECT name, final_type, created_at
      FROM test_results
      WHERE id = ${id}`
    const row = rows[0]
    if (!row) return null
    return {
      name: row.name as string,
      finalType: Number(row.final_type) as TypeNumber,
      createdAt: String(row.created_at),
    }
  } catch {
    return null
  }
}

export interface RankingEntry {
  finalType: TypeNumber
  count: number
}

/** Aggregated type distribution. No personal data. Empty array when DB unavailable. */
export async function getRankingCounts(): Promise<RankingEntry[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    const rows = await sql`
      SELECT final_type, COUNT(*)::int AS count
      FROM test_results
      GROUP BY final_type`
    return rows.map((r) => ({
      finalType: Number(r.final_type) as TypeNumber,
      count: Number(r.count),
    }))
  } catch {
    return []
  }
}

export interface AdminResultRow {
  id: string
  name: string
  phone: string | null
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  createdAt: string
  consentedAt: string | null
}

/** Full rows for the authenticated admin dashboard. Empty array when DB unavailable. */
export async function getAllResults(): Promise<AdminResultRow[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    const rows = await sql`
      SELECT id, name, phone, final_type, scores, ranking, created_at, consented_at
      FROM test_results
      ORDER BY created_at DESC`
    return rows.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      phone: (r.phone as string | null) ?? null,
      finalType: Number(r.final_type) as TypeNumber,
      scores: r.scores as TypeScores,
      ranking: r.ranking as TypeRanking,
      createdAt: String(r.created_at),
      consentedAt: r.consented_at ? String(r.consented_at) : null,
    }))
  } catch {
    return []
  }
}
