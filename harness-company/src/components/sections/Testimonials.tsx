'use client'

import { Quote } from 'lucide-react'
import { testimonialsData } from '@/lib/data'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

/* ── Testimonials Section (Home Page) ────────────────
 *  Client review cards in a responsive grid.
 *  Edit content in lib/data.ts → testimonialsData
 * ──────────────────────────────────────────────────── */
export function Testimonials() {
  return (
    <section className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Don&apos;t just take our word for it — hear from the businesses
              we&apos;ve helped succeed.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonialsData.map((t, i) => (
            <AnimatedSection key={t.author} delay={i * 0.1}>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-800/50 p-8">
                <Quote className="h-8 w-8 text-brand-500/60" />
                <p className="mt-4 leading-relaxed text-neutral-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-neutral-700 pt-4">
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-neutral-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
