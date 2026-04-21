'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── AnimatedSection ─────────────────────────────────
 *  Wraps any content in a fade-up animation that triggers
 *  when the element enters the viewport.
 *
 *  Props:
 *    delay   — stagger delay in seconds (default 0)
 *    className — extra wrapper classes
 * ──────────────────────────────────────────────────── */
interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
