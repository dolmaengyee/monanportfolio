"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift animation */
  hover?: boolean;
}

/**
 * Flexible card component with optional hover animation.
 * Use for feature cards, gallery items, or any boxed content.
 */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm",
        "transition-shadow duration-300",
        hover && "hover:shadow-lg",
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
