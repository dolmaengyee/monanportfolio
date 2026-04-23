"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { TypeNumber } from "@/data/questions"
import { results } from "@/data/results"
import { ResultCard } from "@/components/test/ResultCard"
import { saveTestResult } from "@/lib/supabase"
import { Footer } from "@/components/layout/Footer"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"
import type { LikertAnswer } from "@/data/questions"

interface StoredResult {
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
  answers: LikertAnswer[]
}

export default function ResultPage() {
  const router = useRouter()
  const [finalType, setFinalType] = useState<TypeNumber | null>(null)
  const [resultId, setResultId] = useState<string | null>(null)
  const [saving, setSaving] = useState(true)

  useEffect(() => {
    const raw = sessionStorage.getItem("test-result")
    const name = sessionStorage.getItem("participant-name")
    if (!raw || !name) {
      router.replace("/")
      return
    }

    let parsed: StoredResult
    try {
      parsed = JSON.parse(raw) as StoredResult
    } catch {
      router.replace("/")
      return
    }

    if (!results[parsed.finalType]) {
      router.replace("/")
      return
    }

    setFinalType(parsed.finalType)

    const phone = sessionStorage.getItem("participant-phone") || undefined

    saveTestResult({
      name,
      phone,
      finalType: parsed.finalType,
      scores: parsed.scores,
      ranking: parsed.ranking,
      answers: parsed.answers,
    }).then((id) => {
      if (id) setResultId(id)
      setSaving(false)
    })
  }, [router])

  const handleRetry = () => {
    sessionStorage.removeItem("test-result")
    router.push("/")
  }

  if (!finalType || saving) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm">결과를 분석하고 있어요...</p>
      </div>
    )
  }

  const result = results[finalType]

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12">
        <ResultCard result={result} resultId={resultId} onRetry={handleRetry} />
      </div>
      <Footer />
    </div>
  )
}
