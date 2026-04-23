"use client"

/**
 * ResultCard — renders the computed result type.
 *
 * DESIGN NOTE: Neutral layout. Designer replaces:
 *  - Visual treatment of the type icon (currently plain circle)
 *  - Color usage (currently neutral-900 accents)
 *  - Card/section styling (currently simple borders)
 *  - Motion (none by default)
 *
 * What MUST stay:
 *  - Reads from `results[typeNumber]` in src/data/results.ts
 *  - Render fields: name, tagline, description, strengths, challenges,
 *    compatibleWith
 *  - Share action via Web Share API with clipboard fallback
 *  - `isSharedView` hides retry/share CTAs on the public /result/[id] page
 */

import { useState } from "react"
import { Share2, RotateCcw, ArrowRight, Check } from "lucide-react"
import type { ResultType } from "@/data/results"
import { results } from "@/data/results"
import { TypeIcon } from "@/components/ui/TypeIcon"

interface ResultCardProps {
  result: ResultType
  resultId?: string | null
  onRetry?: () => void
  isSharedView?: boolean
}

export function ResultCard({
  result,
  resultId,
  onRetry,
  isSharedView = false,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : ""
    const shareUrl = resultId ? `${origin}/result/${resultId}` : origin

    if (navigator.share) {
      try {
        await navigator.share({
          title: "나의 성향 결과",
          text: result.shareText,
          url: shareUrl,
        })
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
    <div className="w-full max-w-md mx-auto px-4 py-12">
      {/* Type icon — designer replaces the shape/treatment */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full border border-neutral-300 flex items-center justify-center">
          <TypeIcon name={result.icon} className="w-10 h-10" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">
        {result.name}
      </h1>
      <p className="text-neutral-500 text-sm text-center mb-6">
        {result.tagline}
      </p>

      <p className="text-neutral-700 text-center leading-relaxed mb-6 text-sm">
        {result.description}
      </p>

      <section className="border border-neutral-200 rounded-md p-5 mb-3">
        <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-3">
          강점
        </h3>
        <ul className="space-y-2">
          {result.strengths.map((s, i) => (
            <li
              key={i}
              className="text-neutral-800 text-sm flex items-start gap-2.5"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-neutral-200 rounded-md p-5 mb-3">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
          성장 포인트
        </h3>
        <ul className="space-y-2">
          {result.challenges.map((c, i) => (
            <li
              key={i}
              className="text-neutral-700 text-sm flex items-start gap-2.5"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-neutral-200 rounded-md p-5 mb-8">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
          잘 맞는 성향
        </h3>
        <div className="flex gap-3 flex-wrap">
          {compatibleTypes.map((ct) => (
            <div
              key={ct.typeNumber}
              className="flex items-center gap-2.5 border border-neutral-200 rounded-md px-3.5 py-2.5"
            >
              <div className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center shrink-0">
                <TypeIcon
                  name={ct.icon}
                  className="w-3.5 h-3.5"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-neutral-700 text-sm">{ct.name}</span>
            </div>
          ))}
        </div>
      </section>

      {!isSharedView && (
        <div className="flex flex-col gap-3">
          {resultId && (
            <button
              type="button"
              onClick={handleShare}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
            >
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
            </button>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-neutral-300 hover:border-neutral-900 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              다시 해보기
            </button>
          )}
        </div>
      )}

      {isSharedView && (
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-neutral-300 hover:border-neutral-900 transition-colors text-sm"
          >
            나도 해보기
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}
