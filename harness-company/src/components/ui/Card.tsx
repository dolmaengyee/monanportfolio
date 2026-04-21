import { cn } from '@/lib/utils'

/* ── Card Component ──────────────────────────────────
 *  A simple container with rounded corners and shadow.
 *  Pass children and optional className overrides.
 * ──────────────────────────────────────────────────── */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
