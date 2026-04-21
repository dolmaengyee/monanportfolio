'use client'

import { motion } from 'framer-motion'

/* ── PageHeader ──────────────────────────────────────
 *  Reusable page banner with title + subtitle.
 *  Used at the top of About, Services, Contact pages.
 * ──────────────────────────────────────────────────── */
interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-neutral-900 px-6 pb-16 pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-4xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-lg text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
