'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

/* ── Supabase Auth Hook ──────────────────────────────
 *  Provides reactive auth state for the admin panel.
 *  Uses onAuthStateChange to stay in sync across tabs.
 * ──────────────────────────────────────────────────── */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = () => supabase.auth.signOut()

  return { user, loading, logout }
}
