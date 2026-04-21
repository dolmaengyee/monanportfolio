/* ── Utility helpers ──────────────────────────────── */

/** Merge Tailwind class names (simple concatenation) */
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

/** Format an ISO date string to a human-readable form */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
