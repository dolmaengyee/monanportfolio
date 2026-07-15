"use client"

import { useState, useEffect } from "react"
import { adminLogin, adminLogout, getAdminResults } from "@/lib/api"

/**
 * Admin auth is enforced server-side via an httpOnly session cookie.
 * There is no client-readable password. "Am I logged in?" is answered by
 * calling a guarded endpoint (getAdminResults returns null on 401).
 *
 * isAuthenticated: null while checking, then true/false.
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    getAdminResults().then((rows) => {
      if (active) setIsAuthenticated(rows !== null)
    })
    return () => {
      active = false
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    const ok = await adminLogin(password)
    if (ok) setIsAuthenticated(true)
    return ok
  }

  const logout = async (): Promise<void> => {
    await adminLogout()
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
