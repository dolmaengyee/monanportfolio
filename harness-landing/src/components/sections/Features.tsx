"use client";

import { Zap, Shield, Heart, type LucideIcon } from "lucide-react";
import { featuresData } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// -- Icon Map --
// Map icon string names from data.ts to actual Lucide components.
// Add more icons here as needed.
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Heart,
};

/**
 * 3-column feature cards with icons and animated entrance.
 * Edit featuresData in lib/data.ts to customize.
 */
export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {featuresData.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {featuresData.subheading}
            </p>
          </div>
        </AnimatedSection>

        {/* Feature cards grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Zap;
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <Card className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{feature.description}</p>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
