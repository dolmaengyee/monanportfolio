"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// -- Button Variants --
// Add or modify variants to match your design system.
const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
  outline:
    "border-2 border-brand-500 text-brand-500 hover:bg-brand-50 focus-visible:ring-brand-500",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Render as a link-styled button */
  href?: string;
}

/**
 * Animated button component with multiple variants.
 * Supports primary, secondary, outline, and ghost styles.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl font-semibold",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    // If href is provided, render as an anchor tag
    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
