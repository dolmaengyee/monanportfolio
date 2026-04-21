import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes conditionally.
 * Usage: cn("base-class", condition && "conditional-class", "override-class")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
