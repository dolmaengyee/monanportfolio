/* ── Home Page ───────────────────────────────────────
 *  This template ships EMPTY on purpose.
 *
 *  Claude should design and build this page from scratch,
 *  tailored to the specific project (feel, requirements,
 *  reference sites). Do NOT reproduce a generic
 *  hero → feature grid → CTA layout unless that is
 *  genuinely the best fit.
 *
 *  Reusable building blocks you can import:
 *    - '@/components/ui/Button'
 *    - '@/components/ui/Card'
 *    - '@/components/ui/AnimatedSection'
 *
 *  Edit site name / SEO in '@/lib/data' (siteConfig).
 * ──────────────────────────────────────────────────── */
import { siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-10">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          harness-landing
        </p>
        <h1 className="mt-4 text-3xl font-bold text-neutral-900">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-neutral-600">
          Empty template ready for Claude to design. Describe the project and
          paste any reference sites — Claude will ask a few reverse questions
          about the feel you want, then build the page.
        </p>
      </div>
    </main>
  );
}
