'use client'

import * as Icons from 'lucide-react'
import { servicesData } from '@/lib/data'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Card } from '@/components/ui/Card'

/* ── Services Section (Home Page) ────────────────────
 *  Grid of service cards with icons and descriptions.
 *  Edit content in lib/data.ts → servicesData
 *  Icons are resolved dynamically from Lucide by name.
 * ──────────────────────────────────────────────────── */
export function Services() {
  return (
    <section className="bg-neutral-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              We offer a comprehensive range of services to help your business
              thrive in the digital landscape.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons as any)[service.icon] as
              | React.ComponentType<{ className?: string }>
              | undefined

            return (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <Card className="flex h-full flex-col p-6">
                  {Icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                      <Icon className="h-6 w-6 text-brand-500" />
                    </div>
                  )}
                  <h3 className="mt-4 text-lg font-bold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </p>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
