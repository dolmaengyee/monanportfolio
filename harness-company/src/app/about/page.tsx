import type { Metadata } from 'next'
import { aboutData } from '@/lib/data'
import { PageHeader } from '@/components/ui/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = { title: 'About' }

/* ── About Page ──────────────────────────────────────
 *  Extended company information with mission & vision.
 *  Edit content in lib/data.ts → aboutData
 * ──────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={aboutData.title}
        subtitle="Learn more about who we are and what drives us."
      />

      {/* Extended description */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-neutral-600">
              {aboutData.extendedDescription}
            </p>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection delay={0.2}>
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
              {aboutData.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-brand-500">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Mission & Vision */}
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <AnimatedSection delay={0.3}>
              <h3 className="text-2xl font-bold text-neutral-900">
                Our Mission
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                {aboutData.mission}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h3 className="text-2xl font-bold text-neutral-900">
                Our Vision
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                {aboutData.vision}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
