'use client'

import { cn } from '@/lib/utils'

/* ── Button Component ────────────────────────────────
 *  Reusable button with variant support.
 *
 *  Variants:
 *    primary  — filled neutral color (default)
 *    outline  — bordered, transparent background
 *    ghost    — text-only, no border
 *
 *  Sizes:
 *    sm / md (default) / lg
 * ──────────────────────────────────────────────────── */
type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700 shadow-sm',
  outline:
    'border border-neutral-900 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
  ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
}
