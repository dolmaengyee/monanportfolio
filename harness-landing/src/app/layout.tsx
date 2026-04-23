import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/data";
import "./globals.css";

/* ── Font ────────────────────────────────────────────────────────
 *  PLACEHOLDER — Noto Sans KR is a safe Korean + Latin default.
 *
 *  This template does NOT ship a fixed font. During the Discovery
 *  phase (see .harness/agents/planner.md), the planner asks the
 *  user about mood / reference / tone and the designer picks
 *  1–2 Google Fonts that actually match the project.
 *
 *  How to swap:
 *  1. Pick fonts from https://fonts.google.com (filter: Korean if needed)
 *  2. Change the import below — e.g.
 *     `import { Nanum_Myeongjo, Black_Han_Sans } from "next/font/google"`
 *  3. For an editorial look, pair a display font (headings) with a
 *     clean sans (body) — expose both as CSS variables and use
 *     them via `font-[var(--font-display)]` / `font-sans`.
 *  4. Update the `className` on <html> to include every variable.
 *
 *  Common Korean-friendly Google Fonts:
 *  - Noto Sans KR (neutral, all-purpose)
 *  - Nanum Gothic / Nanum Myeongjo (editorial)
 *  - Gowun Dodum (soft, rounded)
 *  - IBM Plex Sans KR (tech, geometric)
 *  - Black Han Sans (display, headline-only)
 *  - Jua / Do Hyeon (playful, hand-drawn)
 * ───────────────────────────────────────────────────────────── */
const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

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
    // OG 이미지는 src/app/opengraph-image.tsx 가 자동 생성 (동적 PNG)
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={fontSans.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
