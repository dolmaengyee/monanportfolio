"use client"

import { useEffect, useState } from "react"
import { getResultCounts } from "@/lib/supabase"
import { results } from "@/data/results"
import { TypeIcon } from "@/components/ui/TypeIcon"
import type { TypeNumber } from "@/data/questions"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Footer } from "@/components/layout/Footer"

export default function RankingPage() {
  const [counts, setCounts] = useState<Record<TypeNumber, number> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getResultCounts().then((c) => {
      setCounts(c)
      setLoading(false)
    })
  }, [])

  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0
  const sorted = counts
    ? (Object.entries(counts) as [string, number][])
        .map(([t, c]) => ({ type: Number(t) as TypeNumber, count: c }))
        .sort((a, b) => b.count - a.count)
    : []

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 px-6 py-12 max-w-md mx-auto w-full">
        <AnimatedSection delay={0}>
          <h1 className="text-2xl font-bold text-white text-center mb-1">성향 분포</h1>
          <p className="text-white/40 text-sm text-center mb-10">
            {total > 0 ? `${total.toLocaleString()}명 참여` : "첫 번째 참여자가 되어보세요"}
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map(({ type, count }, idx) => {
              const result = results[type]
              const pct = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <AnimatedSection key={type} delay={0.05 * idx}>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${result.gradient} flex items-center justify-center shrink-0`}
                      >
                        <TypeIcon name={result.icon} className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{result.name}</p>
                        <p className="text-white/40 text-xs">{count}명 · {pct}%</p>
                      </div>
                      {idx === 0 && count > 0 && (
                        <span className="text-xs bg-brand-400/15 text-brand-400 px-2 py-0.5 rounded-full border border-brand-400/25 shrink-0">
                          1위
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-400 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        )}

        <AnimatedSection delay={0.5}>
          <div className="text-center mt-10">
            <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors">
              ← 테스트 하러가기
            </a>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  )
}
