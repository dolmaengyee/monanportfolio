"use client"

import { motion } from "framer-motion"
import type { ResultType } from "@/data/results"
import { results } from "@/data/results"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { copyToClipboard } from "@/lib/utils"
import { useState } from "react"
import { testConfig } from "@/data/config"

interface ResultCardProps {
  result: ResultType
  onRetry: () => void
}

export function ResultCard({ result, onRetry }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.origin : ""
    const text = `${result.shareText}\n${shareUrl}\n${testConfig.shareHashtag}`

    if (navigator.share) {
      try {
        await navigator.share({ title: testConfig.title, text, url: shareUrl })
        return
      } catch {
        // Fall through to clipboard
      }
    }

    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const compatibleTypes = result.compatibleWith.map((code) => results[code])

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Confetti-like particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ["#f97316", "#3b82f6", "#ec4899", "#10b981"][i % 4],
              left: `${Math.random() * 100}%`,
              top: `-5%`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Result Emoji */}
      <AnimatedSection delay={0}>
        <motion.div
          className="text-7xl text-center mb-4"
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          {result.emoji}
        </motion.div>
      </AnimatedSection>

      {/* Title */}
      <AnimatedSection delay={0.15}>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          {result.title}
        </h1>
      </AnimatedSection>

      {/* Description */}
      <AnimatedSection delay={0.25}>
        <p className="text-white/70 text-center leading-relaxed mb-8">
          {result.description}
        </p>
      </AnimatedSection>

      {/* Strengths */}
      <AnimatedSection delay={0.35}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-4">
          <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3">
            강점
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="text-white/80 text-sm flex items-start gap-2"
              >
                <span className="text-brand-400 mt-0.5 shrink-0">+</span>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Challenges */}
      <AnimatedSection delay={0.45}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-4">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            성장 포인트
          </h3>
          <ul className="space-y-2">
            {result.challenges.map((c, i) => (
              <li
                key={i}
                className="text-white/60 text-sm flex items-start gap-2"
              >
                <span className="text-white/40 mt-0.5 shrink-0">-</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Compatible Types */}
      <AnimatedSection delay={0.55}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-8">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            잘 맞는 에너지
          </h3>
          <div className="flex gap-3">
            {compatibleTypes.map((ct) => (
              <div
                key={ct.code}
                className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2"
              >
                <span className="text-xl">{ct.emoji}</span>
                <span className="text-white/70 text-sm">{ct.title}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Actions */}
      <AnimatedSection delay={0.65}>
        <div className="flex flex-col gap-3">
          <Button onClick={handleShare} size="lg" className="w-full">
            {copied ? "링크가 복사되었어요!" : "결과 공유하기"}
          </Button>
          <Button
            variant="secondary"
            onClick={onRetry}
            size="md"
            className="w-full"
          >
            다시 해보기
          </Button>
        </div>
      </AnimatedSection>
    </div>
  )
}
