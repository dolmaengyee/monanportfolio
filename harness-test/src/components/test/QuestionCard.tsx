"use client"

/**
 * QuestionCard — renders a single question with a 1–4 Likert scale.
 *
 * DESIGN NOTE: Neutral styling on purpose. Designer replaces visual
 * treatment (colors, spacing, motion, button style) per project mood.
 *
 * What MUST stay:
 *  - The 1–4 Likert scale (scores = [1,2,3,4])
 *  - likertLabels mapping shown under each number
 *  - onAnswer(score) callback
 *  - Question text comes from props (never hardcoded)
 */

import type { Question, LikertScore } from "@/data/questions"
import { likertLabels } from "@/data/questions"

interface QuestionCardProps {
  question: Question
  questionIndex: number
  onAnswer: (score: LikertScore) => void
}

const scores: LikertScore[] = [1, 2, 3, 4]

export function QuestionCard({
  question,
  questionIndex,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-xs text-neutral-500 text-center mb-4 uppercase tracking-wider">
        Q{questionIndex + 1}
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-center mb-10 leading-relaxed">
        {question.text}
      </h2>

      <div className="flex gap-2">
        {scores.map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onAnswer(score)}
            className="flex-1 flex flex-col items-center gap-2 px-2 py-4 rounded-md border border-neutral-300 hover:border-neutral-900 transition-colors cursor-pointer"
          >
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-xs text-neutral-500 leading-tight text-center">
              {likertLabels[score]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-4 px-1">
        <span className="text-xs text-neutral-400">전혀 아니다</span>
        <span className="text-xs text-neutral-400">매우 그렇다</span>
      </div>
    </div>
  )
}
