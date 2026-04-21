import Link from 'next/link'
import { siteConfig, footerLinks, contactData } from '@/lib/data'
import { Mail, Phone, MapPin } from 'lucide-react'

/* ── Footer ──────────────────────────────────────────
 *  Site-wide footer with company info, links, and contact.
 *  Edit links in lib/data.ts → footerLinks
 * ──────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-400">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-3 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${contactData.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contactData.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${contactData.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {contactData.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{contactData.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-xs">
          &copy; {siteConfig.copyright}
        </div>
      </div>
    </footer>
  )
}
