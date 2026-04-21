"use client";

import { ctaData } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/**
 * Call-to-action section to drive user conversions.
 * Edit ctaData in lib/data.ts to customize.
 */
export function CTA() {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {ctaData.heading}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{ctaData.description}</p>
          <div className="mt-10">
            <Button href={ctaData.buttonHref} size="lg">
              {ctaData.buttonText}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
