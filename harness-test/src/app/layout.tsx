import type { Metadata, Viewport } from "next"
import { Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { testConfig } from "@/data/config"
import "./globals.css"

/* ── Font ────────────────────────────────────────────────────────
 *  PLACEHOLDER — Noto Sans KR is a safe Korean + Latin default.
 *
 *  This template does NOT ship a fixed font. During Discovery, the
 *  planner asks the user about mood / reference and the designer
 *  picks Google Fonts that match. Swap the import below.
 *
 *  For tests, font tone often carries the whole experience:
 *  - Playful quiz → Jua, Do Hyeon, Gowun Dodum
 *  - Serious / analytical → Noto Sans KR, IBM Plex Sans KR
 *  - Editorial / magazine → Nanum Myeongjo + Black Han Sans combo
 * ───────────────────────────────────────────────────────────── */
const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
})

/* ── SEO Metadata ─────────────────────────────────────
 *  1. .env.local의 NEXT_PUBLIC_SITE_URL을 실제 도메인으로 변경하세요.
 *  2. Google Search Console → 소유권 확인 → HTML 태그에서 코드 복사
 *     → .env.local의 GOOGLE_SITE_VERIFICATION에 붙여넣기
 *  3. 네이버 서치어드바이저 → 사이트 등록 → HTML 태그에서 코드 복사
 *     → .env.local의 NAVER_SITE_VERIFICATION에 붙여넣기
 * ──────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: testConfig.title,
    template: `%s | ${testConfig.title}`,
  },
  description: testConfig.subtitle,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: testConfig.title,
    description: testConfig.subtitle,
    type: "website",
    locale: 'ko_KR',
    url: BASE_URL,
    // OG 이미지는 src/app/opengraph-image.tsx 가 자동 생성 (동적 PNG)
  },
  twitter: {
    card: "summary_large_image",
    title: testConfig.title,
    description: testConfig.subtitle,
    // twitter 이미지도 opengraph-image 를 자동 재사용
  },
  // favicon 은 src/app/icon.svg 에서 자동 감지
  // 구글 서치콘솔 & 네이버 서치어드바이저 인증 코드 (.env.local에서 설정)
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  ...(process.env.NAVER_SITE_VERIFICATION && {
    other: { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION },
  }),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: designer sets this after deciding the palette.
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={fontSans.variable}>
      <body className="font-sans antialiased">
        <main className="min-h-screen flex flex-col">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
