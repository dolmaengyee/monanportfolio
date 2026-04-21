"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import type { TypeCode } from "@/data/questions"
import { results } from "@/data/results"
import { getResultCounts } from "@/lib/supabase"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Footer } from "@/components/layout/Footer"

const typeColors: Record<TypeCode, string> = {
  A: "bg-typeA",
  B: "bg-typeB",
  C: "bg-typeC",
  D: "bg-typeD",
}

// Placeholder data used when Supabase is not configured
const placeholderCounts: Record<TypeCode, number> = {
  A: 342,
  B: 287,
  C: 415,
  D: 256,
}

export default function RankingPage() {
  const router = useRouter()
  const [counts, setCounts] = useState<Record<TypeCode, number> | null>(null)

  useEffect(() => {
    async function load() {
      const data = await getResultCounts()
      const total = Object.values(data).reduce((a, b) => a + b, 0)
      // Use placeholder if no real data
      setCounts(total > 0 ? data : placeholderCounts)
    }
    load()
  }, [])

  if (!counts) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const sorted = (Object.entries(counts) as [TypeCode, number][]).sort(
    (a, b) => b[1] - a[1],
  )

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 px-6 py-12 max-w-md mx-auto w-full">
        <AnimatedSection>
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            에너지 유형 분포
          </h1>
          <p className="text-white/50 text-center text-sm mb-10">
            총 {total.toLocaleString()}명 참여
          </p>
        </AnimatedSection>

        <div className="space-y-5">
          {sorted.map(([code, count], idx) => {
            const r = results[code]
            const pct = total > 0 ? (count / total) * 100 : 0

            return (
              <AnimatedSection key={code} delay={0.1 + idx * 0.1}>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-white font-semibold text-sm flex-1">
                    {r.title}
                  </span>
                  <span className="text-white/60 text-sm font-medium">
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${typeColors[code]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + idx * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <p className="text-white/30 text-xs mt-1">
                  {count.toLocaleString()}명
                </p>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="mt-10">
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              className="w-full"
            >
              테스트 하러 가기
            </Button>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  )
}
