import type { TypeNumber, LikertAnswer } from "@/data/questions"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"
import type { PublicResult, RankingEntry, AdminResultRow } from "@/lib/db"

/**
 * Client-side fetch helpers for the /api routes.
 *
 * Personal data (names, phones) lives behind server route handlers and is
 * never queried from the browser.
 * All helpers fail soft so the UI keeps working when the DB is not configured.
 */

export type { PublicResult, RankingEntry, AdminResultRow }

export interface SaveResultParams {
  name: string
  phone?: string
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  answers: LikertAnswer[]
  consentedAt?: string
}

/** Persists a result. Returns the new id, or null when the DB is not configured / on error. */
export async function saveTestResult(params: SaveResultParams): Promise<string | null> {
  try {
    const res = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { id: string | null }
    return data.id ?? null
  } catch {
    return null
  }
}

/** Fetches the public-safe result (name, finalType, createdAt). Null when missing. */
export async function getResultById(id: string): Promise<PublicResult | null> {
  try {
    const res = await fetch(`/api/results/${id}`)
    if (!res.ok) return null
    return (await res.json()) as PublicResult
  } catch {
    return null
  }
}

/** Fetches the aggregated type distribution. Empty array on error / when DB absent. */
export async function getRanking(): Promise<RankingEntry[]> {
  try {
    const res = await fetch("/api/ranking")
    if (!res.ok) return []
    return (await res.json()) as RankingEntry[]
  } catch {
    return []
  }
}

/** Attempts admin login; on success the server sets an httpOnly session cookie. */
export async function adminLogin(password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Clears the admin session cookie. */
export async function adminLogout(): Promise<void> {
  try {
    await fetch("/api/admin/logout", { method: "POST" })
  } catch {
    // ignore — client state is cleared by the caller regardless
  }
}

/** Fetches full admin rows. Returns null when unauthenticated (401), [] when DB absent. */
export async function getAdminResults(): Promise<AdminResultRow[] | null> {
  try {
    const res = await fetch("/api/admin/results")
    if (res.status === 401) return null
    if (!res.ok) return []
    return (await res.json()) as AdminResultRow[]
  } catch {
    return []
  }
}
