import { footerData, siteConfig } from "@/lib/data";

/**
 * Simple footer with copyright and links.
 * Edit footerData in lib/data.ts to customize.
 */
export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-gray-500">{footerData.copyright}</p>
        <div className="flex items-center gap-6">
          {footerData.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-brand-500"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
