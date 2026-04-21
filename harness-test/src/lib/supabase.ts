/**
 * Optional Supabase client for saving result analytics.
 *
 * To enable:
 * 1. Create a Supabase project
 * 2. Create a table: results (id uuid, type text, created_at timestamptz)
 * 3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js"
import type { TypeCode } from "@/data/questions"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function saveResult(type: TypeCode): Promise<void> {
  if (!supabase) return
  try {
    await supabase.from("results").insert({ type })
  } catch {
    // Silently fail - analytics should not break user experience
  }
}

export async function getResultCounts(): Promise<Record<TypeCode, number>> {
  const defaults: Record<TypeCode, number> = { A: 0, B: 0, C: 0, D: 0 }
  if (!supabase) return defaults

  try {
    const { data } = await supabase.from("results").select("type")
    if (!data) return defaults

    for (const row of data) {
      const t = row.type as TypeCode
      if (t in defaults) defaults[t]++
    }
    return defaults
  } catch {
    return defaults
  }
}
