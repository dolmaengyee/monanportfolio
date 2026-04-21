'use client'

import { aboutData } from '@/lib/data'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

/* ── About Section (Home Page) ───────────────────────
 *  Brief company overview + stats grid.
 *  Edit content in lib/data.ts → aboutData
 * ──────────────────────────────────────────────────── */
export function About() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              {aboutData.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {aboutData.description}
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.2}>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {aboutData.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-brand-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
