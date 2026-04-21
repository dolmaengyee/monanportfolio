'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { siteConfig } from '@/lib/data'
import { LayoutDashboard, LogOut, ArrowLeft } from 'lucide-react'

/* ── AdminLayout ─────────────────────────────────────
 *  Sidebar + header wrapper for admin pages.
 *  Provides navigation, user info, and logout.
 * ──────────────────────────────────────────────────── */
export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-neutral-200 bg-white md:block">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <span className="text-lg font-bold text-neutral-900">
            {siteConfig.name}
          </span>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
          />
          <SidebarLink
            href="/"
            icon={<ArrowLeft className="h-4 w-4" />}
            label="Back to Site"
          />
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
          <h2 className="text-sm font-medium text-neutral-600">
            Admin Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">{user?.email}</span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-neutral-50 p-6">{children}</main>
      </div>
    </div>
  )
}

/* ── Helper: Sidebar link ────────────────────────────  */
function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
    >
      {icon}
      {label}
    </Link>
  )
}
