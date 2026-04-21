/**
 * Question bank for the energy type test.
 *
 * IMPORTANT: TypeCode is an internal mapping and must NEVER be displayed to the user.
 * Users only see the `question` and `option.text` fields.
 */

export type TypeCode = "A" | "B" | "C" | "D"

export interface Option {
  text: string
  /** Internal type mapping - never expose in UI */
  type: TypeCode
}

export interface Question {
  id: number
  question: string
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 1,
    question: "아침에 눈을 떴을 때, 가장 먼저 하고 싶은 건?",
    options: [
      { text: "바로 일어나서 오늘 할 일을 시작한다", type: "A" },
      { text: "이불 속에서 오늘 하루를 천천히 그려본다", type: "B" },
      { text: "옆에 있는 사람에게 말을 걸거나 메시지를 보낸다", type: "C" },
      { text: "알람을 끄고 루틴대로 준비를 시작한다", type: "D" },
    ],
  },
  {
    id: 2,
    question: "친구들과 주말을 보낼 때 나는...",
    options: [
      { text: "다 같이 새로운 곳을 탐험하고 싶다", type: "A" },
      { text: "조용한 카페에서 깊은 대화를 나누고 싶다", type: "B" },
      { text: "계획 없이 그냥 즉흥적으로 움직이고 싶다", type: "C" },
      { text: "미리 짜둔 일정대로 알차게 보내고 싶다", type: "D" },
    ],
  },
  {
    id: 3,
    question: "스트레스를 받을 때 나는...",
    options: [
      { text: "밖에 나가서 활동하면서 푼다", type: "A" },
      { text: "혼자 있으면서 생각 정리를 한다", type: "B" },
      { text: "친한 사람에게 털어놓는다", type: "C" },
      { text: "할 일 목록을 만들고 하나씩 해결한다", type: "D" },
    ],
  },
  {
    id: 4,
    question: "새로운 프로젝트를 시작할 때 나의 스타일은?",
    options: [
      { text: "일단 부딪혀보면서 배운다", type: "A" },
      { text: "충분히 조사하고 이해한 뒤 시작한다", type: "B" },
      { text: "함께 할 사람부터 모은다", type: "C" },
      { text: "체계적인 계획표를 먼저 만든다", type: "D" },
    ],
  },
  {
    id: 5,
    question: "에너지가 가장 넘치는 순간은?",
    options: [
      { text: "새로운 도전을 앞두고 있을 때", type: "A" },
      { text: "좋은 아이디어가 떠올랐을 때", type: "B" },
      { text: "사람들과 즐거운 시간을 보낼 때", type: "C" },
      { text: "계획이 척척 진행될 때", type: "D" },
    ],
  },
  {
    id: 6,
    question: "여행 스타일에 가까운 것은?",
    options: [
      { text: "액티비티 가득한 모험 여행", type: "A" },
      { text: "혼자 조용히 즐기는 힐링 여행", type: "B" },
      { text: "현지인과 어울리는 자유 여행", type: "C" },
      { text: "맛집, 명소 다 찍는 알찬 여행", type: "D" },
    ],
  },
  {
    id: 7,
    question: "팀 프로젝트에서 나의 역할은?",
    options: [
      { text: "앞장서서 방향을 제시하는 리더", type: "A" },
      { text: "깊이 있는 분석과 전략을 담당", type: "B" },
      { text: "팀 분위기를 살리는 무드메이커", type: "C" },
      { text: "일정과 진행을 관리하는 매니저", type: "D" },
    ],
  },
  {
    id: 8,
    question: "하루가 끝날 때, 나에게 충전이 되는 건?",
    options: [
      { text: "내일 할 새로운 것들을 상상하기", type: "A" },
      { text: "조용히 책을 읽거나 음악 듣기", type: "B" },
      { text: "소중한 사람과 따뜻한 대화 나누기", type: "C" },
      { text: "오늘 해낸 것들을 정리하며 뿌듯해하기", type: "D" },
    ],
  },
]
