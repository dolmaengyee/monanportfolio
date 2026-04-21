import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { siteConfig } from '@/lib/data'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

/* ── Pretendard font ─────────────────────────────────
 *  Download Pretendard-Variable.woff2 into public/fonts/
 *  https://github.com/orioncactus/pretendard
 * ──────────────────────────────────────────────────── */
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
  fallback: ['system-ui', 'sans-serif'],
})

/* ── SEO Metadata ─────────────────────────────────────
 *  1. .env.local의 NEXT_PUBLIC_SITE_URL을 실제 도메인으로 변경하세요.
 *  2. public/og-image.png (1200×630px) 이미지를 추가하면
 *     카카오톡/SNS 공유 시 미리보기가 표시됩니다.
 *  3. Google Search Console → 소유권 확인 → HTML 태그에서 코드 복사
 *     → .env.local의 GOOGLE_SITE_VERIFICATION에 붙여넣기
 *  4. 네이버 서치어드바이저 → 사이트 등록 → HTML 태그에서 코드 복사
 *     → .env.local의 NAVER_SITE_VERIFICATION에 붙여넣기
 * ──────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [siteConfig.name],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  // 구글 서치콘솔 & 네이버 서치어드바이저 인증 코드 (.env.local에서 설정)
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  ...(process.env.NAVER_SITE_VERIFICATION && {
    other: { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION },
  }),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
