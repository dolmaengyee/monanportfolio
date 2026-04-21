import type { Metadata } from 'next'
import { servicesData } from '@/lib/data'
import { PageHeader } from '@/components/ui/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Card } from '@/components/ui/Card'
import { Check } from 'lucide-react'
import * as Icons from 'lucide-react'

export const metadata: Metadata = { title: 'Services' }

/* ── Services Page ───────────────────────────────────
 *  Full-page view of all services with feature lists.
 *  Edit content in lib/data.ts → servicesData
 * ──────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions tailored to your business needs."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {servicesData.map((service, i) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (Icons as any)[service.icon] as
                | React.ComponentType<{ className?: string }>
                | undefined
              return (
                <AnimatedSection key={service.title} delay={i * 0.1}>
                  <Card className="h-full p-8">
                    {Icon && (
                      <Icon className="h-10 w-10 text-brand-500" />
                    )}
                    <h3 className="mt-4 text-xl font-bold text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-neutral-600">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-neutral-600"
                        >
                          <Check className="h-4 w-4 text-brand-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
