'use client'

import { ExternalLink } from 'lucide-react'
import { portfolioData } from '@/lib/data'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Card } from '@/components/ui/Card'

/* ── Portfolio Section (Home Page) ───────────────────
 *  Showcase of past projects with tags.
 *  Edit content in lib/data.ts → portfolioData
 *  Add `image` and `link` fields to show thumbnails / links.
 * ──────────────────────────────────────────────────── */
export function Portfolio() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              Our Work
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              A selection of projects we are proud of. Each one reflects our
              commitment to quality and innovation.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.08}>
              <Card className="flex h-full flex-col overflow-hidden">
                {/* Optional project image */}
                {project.image && (
                  <div className="aspect-video w-full overflow-hidden bg-neutral-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Placeholder when no image */}
                {!project.image && (
                  <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                    <span className="text-3xl font-bold text-brand-300">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Optional external link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600"
                    >
                      View Project
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
