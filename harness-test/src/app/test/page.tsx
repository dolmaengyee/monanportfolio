"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TestProvider, useTest } from "@/context/TestContext"
import { questions } from "@/data/questions"
import { QuestionCard } from "@/components/test/QuestionCard"
import { ProgressBar } from "@/components/test/ProgressBar"
import { Footer } from "@/components/layout/Footer"

function TestFlow() {
  const { currentQuestion, isComplete, result, answerQuestion, totalQuestions } =
    useTest()
  const router = useRouter()

  useEffect(() => {
    if (isComplete && result) {
      router.push("/result")
    }
  }, [isComplete, result, router])

  const question = questions[currentQuestion]
  if (!question) return null

  return (
    <div className="flex-1 flex flex-col">
      <div className="pt-8 px-6">
        <ProgressBar current={currentQuestion} total={totalQuestions} />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <QuestionCard
          question={question}
          onAnswer={answerQuestion}
          questionIndex={currentQuestion}
        />
      </div>

      <Footer />
    </div>
  )
}

export default function TestPage() {
  return (
    <TestProvider>
      <TestFlow />
    </TestProvider>
  )
}
