import type { TypeNumber, LikertAnswer } from "@/data/questions"

export type TypeScores = Record<TypeNumber, number>
export type TypeRanking = Array<{ type: TypeNumber; score: number }>

export function calculateScores(answers: LikertAnswer[]): TypeScores {
  const scores: TypeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const answer of answers) {
    scores[answer.typeNumber] += answer.score
  }
  return scores
}

export function calculateRanking(scores: TypeScores): TypeRanking {
  return (Object.entries(scores) as [string, number][])
    .map(([type, score]) => ({ type: Number(type) as TypeNumber, score }))
    .sort((a, b) => b.score - a.score)
}

export function calculateResult(answers: LikertAnswer[]): {
  finalType: TypeNumber
  scores: TypeScores
  ranking: TypeRanking
} {
  const scores = calculateScores(answers)
  const ranking = calculateRanking(scores)
  const topScore = ranking[0].score
  const tied = ranking.filter((r) => r.score === topScore)

  // Tiebreak: highest single answer score among tied types
  let finalType = tied[0].type
  if (tied.length > 1) {
    let maxSingle = -1
    for (const { type } of tied) {
      const maxForType = Math.max(
        ...answers.filter((a) => a.typeNumber === type).map((a) => a.score)
      )
      if (maxForType > maxSingle) {
        maxSingle = maxForType
        finalType = type
      }
    }
  }

  return { finalType, scores, ranking }
}
