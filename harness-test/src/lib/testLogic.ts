/**
 * Score calculation logic.
 * This module handles all type-code operations and must NEVER be exposed to the UI layer.
 */

import type { TypeCode } from "@/data/questions"

export function calculateResult(answers: TypeCode[]): TypeCode {
  const counts: Record<TypeCode, number> = { A: 0, B: 0, C: 0, D: 0 }

  for (const type of answers) {
    counts[type]++
  }

  let maxCount = 0
  let result: TypeCode = "A"
  const tied: TypeCode[] = []

  for (const [type, count] of Object.entries(counts) as [TypeCode, number][]) {
    if (count > maxCount) {
      maxCount = count
      result = type
      tied.length = 0
      tied.push(type)
    } else if (count === maxCount) {
      tied.push(type)
    }
  }

  // Tie-breaking: use the last answer given
  if (tied.length > 1) {
    const lastAnswer = answers[answers.length - 1]
    return tied.includes(lastAnswer) ? lastAnswer : tied[0]
  }

  return result
}
