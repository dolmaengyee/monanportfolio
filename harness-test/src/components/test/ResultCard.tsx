"use client"

import { motion } from "framer-motion"
import { Share2, RotateCcw, ArrowRight, Check } from "lucide-react"
import type { ResultType } from "@/data/results"
import { results } from "@/data/results"
import { TypeIcon } from "@/components/ui/TypeIcon"
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

    if (navigator.share) {
      try {
        await navigator.share({ title: "나의 성향 결과", text: result.shareText, url: shareUrl })
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
      {/* Type icon with gradient ring */}
      <AnimatedSection delay={0}>
        <motion.div
          className="flex justify-center mb-6"
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <div
            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${result.gradient} flex items-center justify-center shadow-lg`}
          >
            <TypeIcon name={result.icon} className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Type name */}
      <AnimatedSection delay={0.12}>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-1">
          {result.name}
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.18}>
        <p className="text-white/50 text-sm text-center mb-6">{result.tagline}</p>
      </AnimatedSection>

      {/* Description */}
      <AnimatedSection delay={0.25}>
        <p className="text-white/70 text-center leading-relaxed mb-6 text-sm">
          {result.description}
        </p>
      </AnimatedSection>

      {/* Strengths */}
      <AnimatedSection delay={0.33}>
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
                transition={{ delay: 0.38 + i * 0.06 }}
                className="text-white/80 text-sm flex items-start gap-2.5"
              >
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: result.accentColor }}
                />
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Challenges */}
      <AnimatedSection delay={0.43}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-3">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            성장 포인트
          </h3>
          <ul className="space-y-2">
            {result.challenges.map((c, i) => (
              <li key={i} className="text-white/60 text-sm flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Compatible types */}
      <AnimatedSection delay={0.53}>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm mb-8">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            잘 맞는 성향
          </h3>
          <div className="flex gap-3">
            {compatibleTypes.map((ct) => (
              <div
                key={ct.typeNumber}
                className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3.5 py-2.5 border border-white/8"
              >
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${ct.gradient} flex items-center justify-center shrink-0`}
                >
                  <TypeIcon name={ct.icon} className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-white/70 text-sm">{ct.name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Actions */}
      {!isSharedView && (
        <AnimatedSection delay={0.62}>
          <div className="flex flex-col gap-3">
            {resultId && (
              <Button onClick={handleShare} size="lg" className="w-full gap-2">
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    링크가 복사됐어요
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    결과 공유하기
                  </>
                )}
              </Button>
            )}
            {onRetry && (
              <Button variant="secondary" onClick={onRetry} size="md" className="w-full gap-2">
                <RotateCcw className="w-4 h-4" />
                다시 해보기
              </Button>
            )}
          </div>
        </AnimatedSection>
      )}

      {isSharedView && (
        <AnimatedSection delay={0.62}>
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/15 transition-colors"
            >
              나도 해보기
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      )}
    </div>
  )
}
