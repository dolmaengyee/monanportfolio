'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroData } from '@/lib/data'
import { Button } from '@/components/ui/Button'

/* ── Hero Section ────────────────────────────────────
 *  Full-viewport hero with animated title and CTA.
 *  Edit content in lib/data.ts → heroData
 * ──────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-900 px-6">
      {/* Optional background image */}
      {heroData.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
      )}

      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          className="whitespace-pre-line text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {heroData.title}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <Link href={heroData.ctaHref}>
            <Button size="lg" className="gap-2">
              {heroData.ctaText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
