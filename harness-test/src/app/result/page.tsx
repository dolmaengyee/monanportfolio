"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { TypeCode } from "@/data/questions"
import { results } from "@/data/results"
import { ResultCard } from "@/components/test/ResultCard"
import { saveResult } from "@/lib/supabase"
import { Footer } from "@/components/layout/Footer"

export default function ResultPage() {
  const router = useRouter()
  const [resultType, setResultType] = useState<TypeCode | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("test-result") as TypeCode | null
    if (!stored || !results[stored]) {
      router.replace("/")
      return
    }
    setResultType(stored)
  }, [router])

  useEffect(() => {
    if (resultType && !saved) {
      saveResult(resultType)
      setSaved(true)
    }
  }, [resultType, saved])

  if (!resultType) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const result = results[resultType]

  const handleRetry = () => {
    sessionStorage.removeItem("test-result")
    sessionStorage.removeItem("test-answers")
    router.push("/test")
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12">
        <ResultCard result={result} onRetry={handleRetry} />
      </div>
      <Footer />
    </div>
  )
}
