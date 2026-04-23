/* ── Home Page ───────────────────────────────────────
 *  This template ships EMPTY on purpose.
 *
 *  Claude should design and build this page (and any
 *  sub-pages it decides are needed) from scratch,
 *  based on the actual project requirements and any
 *  reference sites. Do NOT reproduce a generic
 *  hero → about → services → portfolio → contact layout
 *  unless the brief truly calls for it.
 *
 *  Multi-page vs single-page is a decision to make per
 *  project: event sites usually scroll single-page,
 *  most company sites split into routes.
 *
 *  Reusable building blocks you can import:
 *    - '@/components/ui/Button'
 *    - '@/components/ui/Card'
 *    - '@/components/ui/AnimatedSection'
 *
 *  Admin panel (preserved, do not remove):
 *    - '/admin/login' — Supabase auth
 *    - '/admin'       — contact form submissions
 *
 *  Edit site name / SEO in '@/lib/data' (siteConfig).
 * ──────────────────────────────────────────────────── */
import { siteConfig } from '@/lib/data'

export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center p-10">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          harness-company
        </p>
        <h1 className="mt-4 text-3xl font-bold text-neutral-900">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-neutral-600">
          Empty template ready for Claude to design. Describe the company and
          paste any reference sites — Claude will ask a few reverse questions
          about the feel you want, then build the pages.
        </p>
      </div>
    </main>
  )
}
