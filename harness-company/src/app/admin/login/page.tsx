'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/data'

/* ── Admin Login Page ────────────────────────────────
 *  Password-only login. The password is compared against the
 *  server-side ADMIN_PASSWORD env var; on success an httpOnly
 *  session cookie is set. Configure ADMIN_PASSWORD in Vercel →
 *  Settings → Environment Variables.
 * ──────────────────────────────────────────────────── */
export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { ok, error: loginError } = await adminLogin(password)

    if (!ok) {
      setError(loginError ?? '로그인에 실패했습니다.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-neutral-900">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          관리자 로그인
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </div>
    </div>
  )
}
