"use client";

import Image from "next/image";
import { galleryData } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/**
 * Image/card grid section for showcasing visuals.
 * Edit galleryData in lib/data.ts to customize.
 * Replace /placeholder.svg with your actual images.
 */
export function Gallery() {
  return (
    <section id="gallery" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {galleryData.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {galleryData.subheading}
            </p>
          </div>
        </AnimatedSection>

        {/* Gallery grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryData.items.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08}>
              <Card className="overflow-hidden p-0">
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
