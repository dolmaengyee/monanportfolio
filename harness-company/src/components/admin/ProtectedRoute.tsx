'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

/* ── ProtectedRoute ──────────────────────────────────
 *  Auth guard wrapper. Redirects to /admin/login
 *  if the user is not authenticated.
 * ──────────────────────────────────────────────────── */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/admin/login')
    }
  }, [authenticated, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-900 border-t-transparent" />
      </div>
    )
  }

  if (!authenticated) return null

  return <>{children}</>
}
