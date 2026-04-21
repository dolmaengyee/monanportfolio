import type { TypeNumber } from "./questions"

export interface ResultType {
  typeNumber: TypeNumber
  name: string
  /** Lucide icon name — render with <LucideIcon name={result.icon} /> */
  icon: string
  tagline: string
  description: string
  strengths: string[]
  challenges: string[]
  compatibleWith: TypeNumber[]
  shareText: string
  gradient: string
  accentColor: string
}

export const results: Record<TypeNumber, ResultType> = {
  1: {
    typeNumber: 1,
    name: "원칙을 지키는 사람",
    icon: "Scale",
    tagline: "더 나은 세상을 만드는 기준의 소유자",
    description:
      "높은 기준과 원칙을 가지고 세상을 더 나은 곳으로 만들고자 하는 당신. 옳고 그름에 대한 감각이 뛰어나며, 맡은 일에서만큼은 최선을 다합니다. 스스로에게 엄격한 만큼 진정성 있는 삶을 살아갑니다.",
    strengths: [
      "철저한 윤리의식과 강한 책임감",
      "높은 집중력과 꼼꼼한 완성도",
      "체계적이고 일관된 업무 처리",
      "지속적인 발전과 개선을 향한 열정",
    ],
    challenges: [
      "완벽함에 대한 높은 기준이 스트레스가 될 수 있어요",
      "타인의 실수나 부족함에 예민하게 반응할 수 있어요",
      "내면의 비판적인 목소리가 때로 힘들 수 있어요",
    ],
    compatibleWith: [7, 2],
    shareText: "나의 성향은 '원칙을 지키는 사람'이에요! 당신의 성향은?",
    gradient: "from-blue-500 to-indigo-600",
    accentColor: "#6366f1",
  },
  2: {
    typeNumber: 2,
    name: "따뜻한 마음의 사람",
    icon: "Heart",
    tagline: "마음으로 세상을 돌보는 따뜻한 존재",
    description:
      "주변 사람들을 따뜻하게 돌보고 도움을 주는 것에서 진정한 의미를 찾는 당신. 섬세한 공감 능력으로 상대방의 필요를 먼저 알아채고, 관계 속에서 자신의 가치를 발견합니다.",
    strengths: [
      "뛰어난 공감 능력과 따뜻한 마음",
      "타인의 필요를 직관적으로 파악하는 감각",
      "사람들을 하나로 모으는 자연스러운 친화력",
      "진심 어린 배려와 헌신적인 태도",
    ],
    challenges: [
      "자신의 필요보다 타인을 먼저 생각하다 지칠 수 있어요",
      "도움에 대한 감사를 기대할 때 실망할 수 있어요",
      "거절하는 것이 어렵게 느껴질 수 있어요",
    ],
    compatibleWith: [4, 8],
    shareText: "나의 성향은 '따뜻한 마음의 사람'이에요! 당신의 성향은?",
    gradient: "from-rose-400 to-pink-500",
    accentColor: "#f43f5e",
  },
  3: {
    typeNumber: 3,
    name: "목표를 향해 달리는 사람",
    icon: "Trophy",
    tagline: "성취를 통해 빛나는 실행의 달인",
    description:
      "명확한 목표를 세우고 그것을 향해 에너지를 집중하는 당신. 어떤 환경에서도 성과를 만들어내는 뛰어난 적응력과 실행력을 가지고 있으며, 자신의 잠재력을 최대한 발휘합니다.",
    strengths: [
      "강한 실행력과 추진력",
      "어떤 환경에서도 발휘되는 적응력",
      "명확한 목표 설정과 달성 능력",
      "주변에 동기를 부여하는 에너지",
    ],
    challenges: [
      "성과에만 집중하다 과정을 놓칠 수 있어요",
      "이미지 관리에 지나치게 신경 쓸 수 있어요",
      "바쁘게 지내면서 감정을 돌보지 못할 수 있어요",
    ],
    compatibleWith: [6, 9],
    shareText: "나의 성향은 '목표를 향해 달리는 사람'이에요! 당신의 성향은?",
    gradient: "from-amber-400 to-orange-500",
    accentColor: "#f97316",
  },
  4: {
    typeNumber: 4,
    name: "깊이 있는 감성의 사람",
    icon: "Waves",
    tagline: "감수성으로 세상을 바라보는 독창적 영혼",
    description:
      "풍부한 감수성과 독창적인 내면의 세계를 가진 당신. 진정성 있는 경험과 깊은 의미를 추구하며, 아름다움과 감동에 민감하게 반응하는 섬세한 사람입니다.",
    strengths: [
      "풍부한 감수성과 창의적 표현력",
      "깊은 공감과 진정성 있는 관계",
      "독창적인 시각과 심미적 감각",
      "자신만의 고유한 정체성",
    ],
    challenges: [
      "감정의 기복이 크게 느껴질 수 있어요",
      "자신과 타인을 비교하며 우울해질 수 있어요",
      "현재보다 이상적인 것을 갈망할 수 있어요",
    ],
    compatibleWith: [1, 5],
    shareText: "나의 성향은 '깊이 있는 감성의 사람'이에요! 당신의 성향은?",
    gradient: "from-purple-400 to-violet-500",
    accentColor: "#8b5cf6",
  },
  5: {
    typeNumber: 5,
    name: "지식을 탐구하는 사람",
    icon: "Compass",
    tagline: "통찰로 세상을 이해하는 지식의 탐험가",
    description:
      "세상을 깊이 이해하고자 끊임없이 탐구하는 당신. 방대한 지식과 예리한 통찰력을 바탕으로 핵심을 꿰뚫어보며, 독립적이고 사려 깊은 판단을 내립니다.",
    strengths: [
      "뛰어난 분석력과 통찰력",
      "깊이 있는 전문 지식 탐구",
      "독립적이고 객관적인 사고",
      "복잡한 문제를 단순화하는 능력",
    ],
    challenges: [
      "지나치게 분석하다 결정을 미룰 수 있어요",
      "에너지 보존을 위해 사람을 피할 수 있어요",
      "감정 표현이 어렵게 느껴질 수 있어요",
    ],
    compatibleWith: [4, 8],
    shareText: "나의 성향은 '지식을 탐구하는 사람'이에요! 당신의 성향은?",
    gradient: "from-teal-400 to-cyan-500",
    accentColor: "#06b6d4",
  },
  6: {
    typeNumber: 6,
    name: "신뢰를 소중히 여기는 사람",
    icon: "Shield",
    tagline: "안전과 신뢰로 공동체를 지키는 든든한 버팀목",
    description:
      "신뢰와 안전을 중요하게 여기며 주변 사람들을 보호하려는 당신. 미리 위험을 감지하고 대비하는 뛰어난 직관과 충성스러운 마음으로 공동체를 지킵니다.",
    strengths: [
      "강한 책임감과 충성스러운 마음",
      "위험을 미리 감지하는 예리한 직관",
      "팀과 공동체를 위한 헌신",
      "문제를 미리 예방하는 꼼꼼함",
    ],
    challenges: [
      "불확실한 상황에서 불안이 커질 수 있어요",
      "지나친 걱정과 최악의 상황을 상상할 수 있어요",
      "타인의 의도를 의심하게 될 수 있어요",
    ],
    compatibleWith: [3, 9],
    shareText: "나의 성향은 '신뢰를 소중히 여기는 사람'이에요! 당신의 성향은?",
    gradient: "from-slate-400 to-blue-500",
    accentColor: "#3b82f6",
  },
  7: {
    typeNumber: 7,
    name: "자유를 사랑하는 사람",
    icon: "Sparkles",
    tagline: "새로운 가능성을 향해 날아가는 자유로운 영혼",
    description:
      "호기심 가득한 눈으로 세상의 가능성을 탐색하는 당신. 즐거움과 새로운 경험에 대한 열린 마음이 주변 사람들에게 에너지와 영감을 전달합니다.",
    strengths: [
      "넘치는 호기심과 다양한 관심사",
      "긍정적이고 밝은 에너지",
      "새로운 아이디어와 가능성 발견",
      "어려운 상황에서도 유쾌함 유지",
    ],
    challenges: [
      "한 가지에 집중하기 어려울 수 있어요",
      "불편한 감정을 외면하려 할 수 있어요",
      "충동적인 결정을 내릴 수 있어요",
    ],
    compatibleWith: [1, 5],
    shareText: "나의 성향은 '자유를 사랑하는 사람'이에요! 당신의 성향은?",
    gradient: "from-yellow-400 to-orange-400",
    accentColor: "#f59e0b",
  },
  8: {
    typeNumber: 8,
    name: "강인한 의지의 사람",
    icon: "Flame",
    tagline: "강한 의지로 세상을 주도하는 리더",
    description:
      "강한 의지와 결단력으로 목표를 향해 직진하는 당신. 불의에 맞서고 약자를 보호하려는 정의감과 타인을 이끄는 타고난 리더십으로 변화를 만들어냅니다.",
    strengths: [
      "강한 추진력과 결단력",
      "약자를 보호하는 강한 정의감",
      "타고난 리더십과 카리스마",
      "어떤 도전도 맞서는 용기",
    ],
    challenges: [
      "강한 에너지가 주변을 압도할 수 있어요",
      "약함을 드러내는 것이 어려울 수 있어요",
      "갈등 상황에서 과하게 반응할 수 있어요",
    ],
    compatibleWith: [2, 6],
    shareText: "나의 성향은 '강인한 의지의 사람'이에요! 당신의 성향은?",
    gradient: "from-red-500 to-rose-600",
    accentColor: "#ef4444",
  },
  9: {
    typeNumber: 9,
    name: "조화를 이루는 사람",
    icon: "Cloud",
    tagline: "평화로 세상을 연결하는 따뜻한 중재자",
    description:
      "주변과의 평화와 조화를 소중히 여기는 당신. 다양한 관점을 수용하고 이해하는 넓은 마음으로 갈등을 중재하고 모두가 편안한 분위기를 만들어냅니다.",
    strengths: [
      "다양한 관점을 수용하는 넓은 마음",
      "자연스러운 중재 능력",
      "편안하고 안정적인 존재감",
      "갈등 없이 협력을 이끄는 능력",
    ],
    challenges: [
      "자신의 의견을 표현하는 것을 미룰 수 있어요",
      "중요한 결정을 내리기 어려울 수 있어요",
      "갈등 회피를 위해 무기력해질 수 있어요",
    ],
    compatibleWith: [3, 7],
    shareText: "나의 성향은 '조화를 이루는 사람'이에요! 당신의 성향은?",
    gradient: "from-green-400 to-emerald-500",
    accentColor: "#10b981",
  },
}
