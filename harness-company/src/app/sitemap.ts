import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

/* ── Sitemap ─────────────────────────────────────────
 *  Only the root URL ships by default. When Claude adds
 *  sub-pages for a specific project, extend this array
 *  with the new routes.
 * ──────────────────────────────────────────────────── */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ]
}
