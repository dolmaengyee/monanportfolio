'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig, navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

/* ── Navbar ──────────────────────────────────────────
 *  Responsive navigation with active-link detection.
 *  Links are defined in lib/data.ts → navLinks
 * ──────────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / site name */}
        <Link href="/" className="text-lg font-bold text-neutral-900">
          {/* Customize: replace text with an <Image /> for a logo */}
          {siteConfig.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-neutral-200 bg-white md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                        active
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-neutral-600 hover:bg-neutral-100',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
