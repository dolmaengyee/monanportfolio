/**
 * 36 statements scored on a 1-4 Likert scale (4 per type × 9 types).
 * TypeNumber (1-9) is internal only — never exposed in UI.
 */

export type TypeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type LikertScore = 1 | 2 | 3 | 4

export interface Question {
  id: number
  text: string
  /** Internal type mapping — never expose in UI */
  typeNumber: TypeNumber
}

export interface LikertAnswer {
  questionId: number
  score: LikertScore
  typeNumber: TypeNumber
}

export const likertLabels: Record<LikertScore, string> = {
  1: "전혀 아니다",
  2: "별로 아니다",
  3: "어느 정도",
  4: "매우 그렇다",
}

// Interleaved order: rounds of 9, one question per type each round
export const questions: Question[] = [
  // Round 1
  { id: 1,  text: "잘못된 것을 발견하면 그냥 넘기기가 어렵다",                               typeNumber: 1 },
  { id: 2,  text: "다른 사람이 힘들어 보이면 먼저 도움의 손을 내밀게 된다",                   typeNumber: 2 },
  { id: 3,  text: "목표를 세우고 달성했을 때 가장 큰 보람을 느낀다",                           typeNumber: 3 },
  { id: 4,  text: "나는 다른 사람들과는 다른 독특한 무언가를 가지고 있다고 느낀다",             typeNumber: 4 },
  { id: 5,  text: "나만의 시간과 개인 공간이 충분히 필요하다",                                 typeNumber: 5 },
  { id: 6,  text: "중요한 결정을 내릴 때 믿을 수 있는 사람의 의견이 필요하다",                 typeNumber: 6 },
  { id: 7,  text: "새로운 경험과 가능성을 탐색하는 것이 즐겁다",                               typeNumber: 7 },
  { id: 8,  text: "하고 싶은 것이 있으면 직접적으로 행동하고 표현하는 편이다",                 typeNumber: 8 },
  { id: 9,  text: "다툼이나 갈등 상황을 피하고 화목한 분위기를 유지하고 싶다",                 typeNumber: 9 },

  // Round 2
  { id: 10, text: "내가 정한 기준이나 원칙을 지키는 것이 중요하다",                             typeNumber: 1 },
  { id: 11, text: "주변 사람들의 필요를 잘 파악하고 그것을 채워주려 한다",                     typeNumber: 2 },
  { id: 12, text: "다른 사람들에게 유능하고 성공적인 모습으로 보이고 싶다",                     typeNumber: 3 },
  { id: 13, text: "깊은 감정과 의미 있는 경험을 추구하는 편이다",                               typeNumber: 4 },
  { id: 14, text: "관심 있는 분야에 대해 깊이 파고드는 것을 즐긴다",                           typeNumber: 5 },
  { id: 15, text: "앞으로 일어날 수 있는 문제나 위험을 미리 생각하고 대비하는 편이다",         typeNumber: 6 },
  { id: 16, text: "즐거운 계획이나 기대할 것이 있을 때 에너지가 넘친다",                       typeNumber: 7 },
  { id: 17, text: "불공정한 상황이나 약자가 억울하게 당하는 것을 보면 강하게 반응하게 된다",   typeNumber: 8 },
  { id: 18, text: "여러 입장을 모두 이해하려 하며 쉽게 한쪽 편을 들지 않는다",                 typeNumber: 9 },

  // Round 3
  { id: 19, text: "더 나은 방법이 있다면 개선하고 싶은 욕구가 생긴다",                         typeNumber: 1 },
  { id: 20, text: "내가 누군가에게 꼭 필요한 존재라는 느낌이 중요하다",                         typeNumber: 2 },
  { id: 21, text: "어떤 일이든 최대한 효율적으로 빠르게 처리하려 한다",                         typeNumber: 3 },
  { id: 22, text: "때로 자신의 내면에서 일어나는 감정에 깊이 빠져들기도 한다",                 typeNumber: 4 },
  { id: 23, text: "결정을 내리기 전에 충분한 정보와 지식을 확보하고 싶다",                     typeNumber: 5 },
  { id: 24, text: "내가 속한 공동체나 팀에 대한 신뢰와 의리를 중요하게 생각한다",             typeNumber: 6 },
  { id: 25, text: "한 가지에만 매여 있기보다 다양한 것들을 경험하고 싶다",                     typeNumber: 7 },
  { id: 26, text: "스스로가 강하고 자립적이어야 한다고 생각한다",                               typeNumber: 8 },
  { id: 27, text: "주변이 평온하고 조화로울 때 가장 편안함을 느낀다",                           typeNumber: 9 },

  // Round 4
  { id: 28, text: "실수나 부족함을 발견했을 때 그냥 지나치기 어렵다",                           typeNumber: 1 },
  { id: 29, text: "누군가를 도울 수 있는 상황에서 거절하기가 어렵다",                           typeNumber: 2 },
  { id: 30, text: "나는 성과와 결과로 나 자신의 가치를 평가하는 경향이 있다",                   typeNumber: 3 },
  { id: 31, text: "나는 평범하게 보이는 것보다 나만의 특별함을 드러내고 싶다",                 typeNumber: 4 },
  { id: 32, text: "사람들과 어울리는 것보다 혼자 있을 때 에너지가 회복된다",                   typeNumber: 5 },
  { id: 33, text: "일이 계획대로 잘 되고 있는지 자주 확인하게 된다",                           typeNumber: 6 },
  { id: 34, text: "즐겁지 않거나 지루한 상황에서 금방 흥미를 잃는 편이다",                     typeNumber: 7 },
  { id: 35, text: "누군가가 내 영역을 침범하거나 통제하려 하면 강하게 반발한다",               typeNumber: 8 },
  { id: 36, text: "모든 사람이 편안한 분위기를 만들기 위해 내 의견을 양보하기도 한다",         typeNumber: 9 },
]
