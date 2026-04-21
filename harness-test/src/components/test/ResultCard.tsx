"use client"

import { motion } from "framer-motion"
import type { ResultType } from "@/data/results"
import { results } from "@/data/results"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { useState } from "react"

interface ResultCardProps {
  result: ResultType
  resultId?: string | null
  onRetry?: () => void
  isSharedView?: boolean
}

export function ResultCard({ result, resultId, onRetry, isSharedView = false }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const shareUrl = resultId ? `${origin}/result/${resultId}` : origin
    const text = `${result.shareText}\n${shareUrl}`

    if (navigator.share) {
      try {
        await navigator.share({ title: "나의 성향 결과", text, url: shareUrl })
        return
      } catch {
        // fall through
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      const el = document.createElement("textarea")
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const compatibleTypes = result.compatibleWith.map((t) => results[t])

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ["#f97316", "#8b5cf6", "#ec4899", "#10b981", "#3b82f6"][i % 5],
              left: `${(i / 18) * 100}%`,
              top: `-5%`,
            }}
            animate={{ y: ["0vh", "110vh"], x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 3)], rotate: [0, 360], opacity: [1, 0] }}
            transition={{ duration: 2.5 + (i % 3) * 0.5, delay: (i % 6) * 0.25, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Emoji */}
      <AnimatedSection delay={0}>
        <motion.div
          className="text-7xl text-center mb-3"
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          {result.emoji}
        </motion.div>
      </AnimatedSection>

      {/* Type name */}
      <AnimatedSection delay={0.15}>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-1">
          {result.name}
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="text-white/50 text-sm text-center mb-2">{result.tagline}</p>
      </AnimatedSection>

      {/* Description */}
      <AnimatedSection delay={0.28}>
        <p className="text-white/70 text-center leading-relaxed mb-6 text-sm">
          {result.description}
        </p>
      </AnimatedSection>

      {/* Strengths */}
      <AnimatedSection delay={0.36}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-3">
          <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">
            강점
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="text-white/80 text-sm flex items-start gap-2"
              >
                <span className="text-brand-400 mt-0.5 shrink-0">✦</span>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Challenges */}
      <AnimatedSection delay={0.46}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-3">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            성장 포인트
          </h3>
          <ul className="space-y-2">
            {result.challenges.map((c, i) => (
              <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/30 mt-0.5 shrink-0">◦</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Compatible types */}
      <AnimatedSection delay={0.56}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-8">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            잘 맞는 성향
          </h3>
          <div className="flex gap-3">
            {compatibleTypes.map((ct) => (
              <div key={ct.typeNumber} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <span className="text-xl">{ct.emoji}</span>
                <span className="text-white/70 text-sm">{ct.name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Actions */}
      {!isSharedView && (
        <AnimatedSection delay={0.66}>
          <div className="flex flex-col gap-3">
            {resultId && (
              <Button onClick={handleShare} size="lg" className="w-full">
                {copied ? "링크가 복사되었어요! 🎉" : "결과 공유하기"}
              </Button>
            )}
            {onRetry && (
              <Button variant="secondary" onClick={onRetry} size="md" className="w-full">
                다시 해보기
              </Button>
            )}
          </div>
        </AnimatedSection>
      )}

      {isSharedView && (
        <AnimatedSection delay={0.66}>
          <div className="text-center">
            <a
              href="/"
              className="inline-block px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/15 transition-colors"
            >
              나도 해보기 →
            </a>
          </div>
        </AnimatedSection>
      )}
    </div>
  )
}
