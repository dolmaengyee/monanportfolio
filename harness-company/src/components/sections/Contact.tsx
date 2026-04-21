'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { contactData } from '@/lib/data'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

/* ── Contact Section ─────────────────────────────────
 *  Form that saves submissions to Supabase "contacts" table.
 *
 *  Required Supabase table:
 *    create table contacts (
 *      id uuid default gen_random_uuid() primary key,
 *      name text not null,
 *      email text not null,
 *      phone text,
 *      message text not null,
 *      created_at timestamp with time zone default now()
 *    );
 * ──────────────────────────────────────────────────── */

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const initial: FormData = { name: '', email: '', phone: '', message: '' }

export function Contact() {
  const [form, setForm] = useState<FormData>(initial)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    setStatus('success')
    setForm(initial)
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-6">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              {contactData.formTitle}
            </h2>
            <p className="mt-4 text-neutral-600">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Success / error banners */}
            {status === 'success' && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {errorMsg || 'Something went wrong. Please try again.'}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full gap-2"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ── Helper: input field ─────────────────────────────  */
function Field({
  label,
  ...props
}: {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="mb-1 block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <input
        id={props.name}
        className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        {...props}
      />
    </div>
  )
}
