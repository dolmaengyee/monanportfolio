"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { LikertAnswer, LikertScore, TypeNumber } from "@/data/questions"
import { questions } from "@/data/questions"
import { calculateResult } from "@/lib/testLogic"
import type { TypeScores, TypeRanking } from "@/lib/testLogic"

interface TestState {
  name: string
  phone: string
  answers: LikertAnswer[]
  currentQuestion: number
  finalType: TypeNumber | null
  scores: TypeScores | null
  ranking: TypeRanking | null
  resultId: string | null
  isComplete: boolean
}

interface TestContextType extends TestState {
  setParticipantInfo: (name: string, phone: string) => void
  answerQuestion: (score: LikertScore) => void
  reset: () => void
  setResultId: (id: string) => void
  totalQuestions: number
}

const TestContext = createContext<TestContextType | null>(null)

const initialState: TestState = {
  name: "",
  phone: "",
  answers: [],
  currentQuestion: 0,
  finalType: null,
  scores: null,
  ranking: null,
  resultId: null,
  isComplete: false,
}

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TestState>(initialState)

  const setParticipantInfo = useCallback((name: string, phone: string) => {
    setState((prev) => ({ ...prev, name, phone }))
  }, [])

  const answerQuestion = useCallback((score: LikertScore) => {
    setState((prev) => {
      const question = questions[prev.currentQuestion]
      if (!question) return prev

      const newAnswer: LikertAnswer = {
        questionId: question.id,
        score,
        typeNumber: question.typeNumber,
      }
      const newAnswers = [...prev.answers, newAnswer]
      const nextQ = prev.currentQuestion + 1

      if (nextQ >= questions.length) {
        const { finalType, scores, ranking } = calculateResult(newAnswers)
        if (typeof window !== "undefined") {
          sessionStorage.setItem("test-result", JSON.stringify({ finalType, scores, ranking, answers: newAnswers }))
        }
        return { ...prev, answers: newAnswers, finalType, scores, ranking, isComplete: true }
      }

      return { ...prev, answers: newAnswers, currentQuestion: nextQ }
    })
  }, [])

  const setResultId = useCallback((id: string) => {
    setState((prev) => ({ ...prev, resultId: id }))
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("test-result")
    }
    setState(initialState)
  }, [])

  return (
    <TestContext.Provider
      value={{
        ...state,
        setParticipantInfo,
        answerQuestion,
        reset,
        setResultId,
        totalQuestions: questions.length,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

export function useTest() {
  const ctx = useContext(TestContext)
  if (!ctx) throw new Error("useTest must be used within TestProvider")
  return ctx
}
