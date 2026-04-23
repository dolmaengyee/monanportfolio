/* ================================================================
 *  lib/data.ts — SITE-WIDE CONFIG
 *  ----------------------------------------------------------------
 *  This template ships with ONLY siteConfig because layout.tsx,
 *  opengraph-image.tsx, and the admin panel all need the site name
 *  for SEO and branding.
 *
 *  All other content (nav, hero, services, portfolio, contact, etc.)
 *  is decided per project — Claude creates the data shapes and
 *  components that fit the actual requirements rather than filling
 *  in a pre-baked schema.
 * ================================================================ */

export const siteConfig = {
  /** Shown in browser tab, admin panel, and SEO metadata */
  name: 'Company Name',
  /** SEO meta description */
  description:
    'We deliver innovative solutions that drive business growth. Our expert team combines cutting-edge technology with strategic thinking.',
  /** Copyright line — use anywhere you render a footer */
  copyright: `${new Date().getFullYear()} Company Name. All rights reserved.`,
}
