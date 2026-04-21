import { createClient } from "@supabase/supabase-js"
import type { TypeNumber, LikertAnswer } from "@/data/questions"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export interface TestResultRow {
  id: string
  name: string
  phone: string | null
  final_type: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  answers: LikertAnswer[]
  created_at: string
}

export interface SaveResultParams {
  name: string
  phone?: string
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  answers: LikertAnswer[]
}

export async function saveTestResult(params: SaveResultParams): Promise<string | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from("test_results")
      .insert({
        name: params.name,
        phone: params.phone || null,
        final_type: params.finalType,
        scores: params.scores,
        ranking: params.ranking,
        answers: params.answers,
      })
      .select("id")
      .single()
    if (error || !data) return null
    return data.id as string
  } catch {
    return null
  }
}

export async function getResultById(id: string): Promise<TestResultRow | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from("test_results")
      .select("*")
      .eq("id", id)
      .single()
    if (error || !data) return null
    return data as TestResultRow
  } catch {
    return null
  }
}

export async function getResultCounts(): Promise<Record<TypeNumber, number>> {
  const defaults = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 } as Record<TypeNumber, number>
  if (!supabase) return defaults
  try {
    const { data } = await supabase.from("test_results").select("final_type")
    if (!data) return defaults
    for (const row of data) {
      const t = row.final_type as TypeNumber
      if (t in defaults) defaults[t]++
    }
    return defaults
  } catch {
    return defaults
  }
}

export async function getAllParticipants(): Promise<TestResultRow[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from("test_results")
      .select("*")
      .order("created_at", { ascending: false })
    if (error || !data) return []
    return data as TestResultRow[]
  } catch {
    return []
  }
}
