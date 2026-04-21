import type { Metadata, Viewport } from "next"
import { testConfig } from "@/data/config"
import "./globals.css"

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
    images: [{ url: testConfig.ogImage, width: 1200, height: 630, alt: testConfig.title }],
    type: "website",
    locale: 'ko_KR',
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: testConfig.title,
    description: testConfig.subtitle,
    images: [testConfig.ogImage],
  },
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
  themeColor: "#0f0b1a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-[Pretendard] antialiased">
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}
