import type { TypeCode } from "./questions"

export interface ResultType {
  code: TypeCode
  title: string
  emoji: string
  description: string
  strengths: string[]
  challenges: string[]
  compatibleWith: TypeCode[]
  shareText: string
  gradient: string
  color: string
}

export const results: Record<TypeCode, ResultType> = {
  A: {
    code: "A",
    title: "불꽃 에너지",
    emoji: "🔥",
    description:
      "멈춰있는 것을 가장 싫어하는 당신. 새로운 것에 도전하고, 앞장서서 길을 개척하는 에너지의 소유자입니다. 주변 사람들에게 열정과 용기를 전파하는 존재예요.",
    strengths: [
      "타고난 리더십과 추진력",
      "새로운 환경에 빠르게 적응하는 능력",
      "주변에 에너지를 전염시키는 활력",
      "두려움 없는 도전 정신",
    ],
    challenges: [
      "한 곳에 오래 집중하기 어려울 수 있어요",
      "성급한 판단을 할 때가 있어요",
      "쉬는 것에 대한 죄책감을 느낄 수 있어요",
    ],
    compatibleWith: ["C", "D"],
    shareText: "나의 일상 에너지는 불꽃 에너지! 당신의 에너지 유형은?",
    gradient: "from-orange-400 via-red-400 to-amber-500",
    color: "typeA",
  },
  B: {
    code: "B",
    title: "달빛 에너지",
    emoji: "🌙",
    description:
      "깊은 사색과 풍부한 내면의 세계를 가진 당신. 조용하지만 강한 에너지로 주변을 밝히는 존재입니다. 혼자만의 시간에서 가장 큰 영감을 얻어요.",
    strengths: [
      "깊이 있는 사고력과 통찰",
      "풍부한 감성과 창의력",
      "신중하고 현명한 판단력",
      "혼자서도 충분히 빛나는 독립성",
    ],
    challenges: [
      "자신의 생각을 표현하는 데 시간이 필요해요",
      "과도한 분석으로 결정이 늦어질 수 있어요",
      "혼자 있는 시간이 부족하면 지칠 수 있어요",
    ],
    compatibleWith: ["A", "D"],
    shareText: "나의 일상 에너지는 달빛 에너지! 당신의 에너지 유형은?",
    gradient: "from-blue-400 via-indigo-400 to-purple-500",
    color: "typeB",
  },
  C: {
    code: "C",
    title: "햇살 에너지",
    emoji: "☀️",
    description:
      "따뜻한 햇살처럼 주변 사람들을 감싸는 당신. 공감 능력이 뛰어나고, 사람들 사이에서 에너지를 충전하는 타입이에요. 당신이 있으면 분위기가 밝아져요.",
    strengths: [
      "뛰어난 공감 능력과 소통력",
      "사람들을 하나로 모으는 친화력",
      "자유로운 발상과 즉흥적 창의성",
      "주변을 밝게 만드는 긍정 에너지",
    ],
    challenges: [
      "타인의 감정에 너무 휩쓸릴 수 있어요",
      "혼자 있는 시간이 불편할 수 있어요",
      "계획적인 일 처리가 어려울 수 있어요",
    ],
    compatibleWith: ["A", "B"],
    shareText: "나의 일상 에너지는 햇살 에너지! 당신의 에너지 유형은?",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-500",
    color: "typeC",
  },
  D: {
    code: "D",
    title: "대지 에너지",
    emoji: "🌿",
    description:
      "든든하고 안정적인 에너지의 소유자인 당신. 체계적이고 꼼꼼하게 일을 처리하며, 주변 사람들에게 믿음을 주는 존재예요. 묵묵히 성과를 만들어내요.",
    strengths: [
      "체계적인 계획 수립과 실행력",
      "뛰어난 집중력과 끈기",
      "안정감을 주는 든든한 존재감",
      "세밀한 관찰력과 꼼꼼함",
    ],
    challenges: [
      "변화에 적응하는 데 시간이 필요해요",
      "완벽주의로 스트레스를 받을 수 있어요",
      "즉흥적인 상황이 불편할 수 있어요",
    ],
    compatibleWith: ["B", "C"],
    shareText: "나의 일상 에너지는 대지 에너지! 당신의 에너지 유형은?",
    gradient: "from-emerald-400 via-teal-400 to-green-500",
    color: "typeD",
  },
}
