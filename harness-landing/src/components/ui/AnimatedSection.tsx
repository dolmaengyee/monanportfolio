"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Delay in seconds before animation starts */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered animation wrapper using Intersection Observer.
 * Wraps any content to add a fade-in + slide-up effect when scrolled into view.
 * The animation triggers once and does not replay on re-scroll.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
