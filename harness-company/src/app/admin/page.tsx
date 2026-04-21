'use client'

import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ContactTable } from '@/components/admin/ContactTable'

/* ── Admin Dashboard ─────────────────────────────────
 *  Protected page — redirects to /admin/login if not authenticated.
 *  Displays submitted contact form entries from Supabase.
 * ──────────────────────────────────────────────────── */
export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-500">
              View and manage contact form submissions.
            </p>
          </div>
          <ContactTable />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
