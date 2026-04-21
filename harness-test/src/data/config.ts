export const testConfig = {
  title: "나는 어떤 사람일까?",
  subtitle: "36가지 질문으로 알아보는 나의 숨겨진 성향",
  description: "맞고 틀린 답은 없어요. 가장 솔직하게 느껴지는 답을 골라주세요.",
  questionCount: 36,
  shareHashtag: "#성향테스트",
  ogImage: "/og-image.png",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  adminPassword: "ydp12000",
} as const
