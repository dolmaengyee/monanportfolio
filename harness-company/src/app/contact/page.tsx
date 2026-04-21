import type { Metadata } from 'next'
import { contactData } from '@/lib/data'
import { PageHeader } from '@/components/ui/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Contact } from '@/components/sections/Contact'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact' }

/* ── Contact Page ────────────────────────────────────
 *  Dedicated contact page with info cards + form.
 *  Edit content in lib/data.ts → contactData
 * ──────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out and let's start a conversation."
      />

      {/* Contact info cards */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="grid gap-6 md:grid-cols-3">
              <InfoCard
                icon={<Mail className="h-6 w-6" />}
                label="Email"
                value={contactData.email}
                href={`mailto:${contactData.email}`}
              />
              <InfoCard
                icon={<Phone className="h-6 w-6" />}
                label="Phone"
                value={contactData.phone}
                href={`tel:${contactData.phone}`}
              />
              <InfoCard
                icon={<MapPin className="h-6 w-6" />}
                label="Address"
                value={contactData.address}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact form (reused section component) */}
      <Contact />
    </>
  )
}

/* ── Helper: Info Card ───────────────────────────────  */
function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        {icon}
      </div>
      <p className="mt-4 text-sm font-medium text-neutral-500">{label}</p>
      <p className="mt-1 font-semibold text-neutral-900">{value}</p>
    </div>
  )

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  )
}
