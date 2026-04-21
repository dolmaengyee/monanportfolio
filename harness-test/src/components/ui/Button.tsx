"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
  ghost: "text-white/70 hover:text-white hover:bg-white/10",
}

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className = "", children, ...props },
    ref,
  ) {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`font-semibold transition-colors duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)
