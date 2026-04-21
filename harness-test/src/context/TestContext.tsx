"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { TypeCode } from "@/data/questions"
import { questions } from "@/data/questions"
import { calculateResult } from "@/lib/testLogic"

interface TestState {
  answers: TypeCode[]
  currentQuestion: number
  result: TypeCode | null
  isComplete: boolean
}

interface TestContextType extends TestState {
  answerQuestion: (type: TypeCode) => void
  reset: () => void
  totalQuestions: number
}

const TestContext = createContext<TestContextType | null>(null)

const initialState: TestState = {
  answers: [],
  currentQuestion: 0,
  result: null,
  isComplete: false,
}

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TestState>(initialState)

  const answerQuestion = useCallback((type: TypeCode) => {
    setState((prev) => {
      const newAnswers = [...prev.answers, type]
      const nextQ = prev.currentQuestion + 1

      if (nextQ >= questions.length) {
        const result = calculateResult(newAnswers)
        // Persist to sessionStorage for cross-page access
        if (typeof window !== "undefined") {
          sessionStorage.setItem("test-result", result)
          sessionStorage.setItem("test-answers", JSON.stringify(newAnswers))
        }
        return {
          answers: newAnswers,
          currentQuestion: prev.currentQuestion,
          result,
          isComplete: true,
        }
      }

      return {
        ...prev,
        answers: newAnswers,
        currentQuestion: nextQ,
      }
    })
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("test-result")
      sessionStorage.removeItem("test-answers")
    }
    setState(initialState)
  }, [])

  return (
    <TestContext.Provider
      value={{
        ...state,
        answerQuestion,
        reset,
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
