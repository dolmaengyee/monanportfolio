"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroData } from "@/lib/data";
import { Button } from "@/components/ui/Button";

/**
 * Full-screen hero section with animated title, subtitle, and CTA button.
 * Edit heroData in lib/data.ts to change content.
 */
export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50 to-white px-4"
    >
      {/* Background decorative gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-200 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-brand-100 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {heroData.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < heroData.title.split("\n").length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-600 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button href={heroData.ctaHref} size="lg">
            {heroData.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
