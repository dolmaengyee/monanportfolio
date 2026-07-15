'use client'

import { useEffect, useState } from 'react'
import { fetchContacts as fetchContactsApi, type ContactRecord } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { RefreshCw, Inbox } from 'lucide-react'

/* ── ContactTable ────────────────────────────────────
 *  Fetches and displays contact form submissions from the
 *  Neon "contacts" table via GET /api/admin/contacts.
 * ──────────────────────────────────────────────────── */

export function ContactTable() {
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [loading, setLoading] = useState(true)

  const loadContacts = async () => {
    setLoading(true)
    try {
      setContacts(await fetchContactsApi())
    } catch {
      setContacts([])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h3 className="font-semibold text-neutral-900">
          Contact Submissions
        </h3>
        <button
          onClick={loadContacts}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
          />
          Refresh
        </button>
      </div>

      {/* Table */}
      {contacts.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
          <Inbox className="h-10 w-10" />
          <p className="mt-3 text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Message</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {c.email ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {c.phone ?? '-'}
                  </td>
                  <td className="max-w-xs truncate px-6 py-4 text-neutral-600">
                    {c.message ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-neutral-500">
                    {formatDate(c.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
