"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60 font-medium">
          {current + 1} / {total}
        </span>
        <span className="text-sm text-white/60 font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
