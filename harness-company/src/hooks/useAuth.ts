'use client'

import { useEffect, useState } from 'react'
import { adminLogout, adminSession } from '@/lib/api'

/* ── Admin Auth Hook ─────────────────────────────────
 *  Reactive auth state for the admin panel, backed by the
 *  httpOnly session cookie. Checks /api/admin/session on
 *  mount; logout clears the cookie via /api/admin/logout.
 * ──────────────────────────────────────────────────── */
export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    adminSession()
      .then((ok) => {
        if (!active) return
        setAuthenticated(ok)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const logout = async () => {
    await adminLogout()
    setAuthenticated(false)
    window.location.href = '/admin/login'
  }

  return { authenticated, loading, logout }
}
