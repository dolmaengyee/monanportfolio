# Harness Landing - AI Instructions for Claude Code

## What is this?

A reusable Next.js landing page template designed for non-developers to customize using AI tools. Built for education, events, and campaign sites.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first config in globals.css)
- Framer Motion (scroll animations)
- Lucide React (icons)
- Pretendard font (Korean-optimized)

## How to Customize Content

All site text lives in `src/lib/data.ts`. This is the ONLY file users need to edit for content changes:

- `siteConfig` - Site name, tagline, description
- `navLinks` - Navigation menu items
- `heroData` - Hero section title, subtitle, CTA button
- `featuresData` - Feature cards (icon, title, description)
- `galleryData` - Gallery items (image, title, description)
- `ctaData` - Call-to-action text and button
- `footerData` - Copyright and footer links

## How to Change Brand Colors

Edit the `@theme` block in `src/app/globals.css`. Change the `--color-brand-*` values:

```css
--color-brand-500: #0ea5e9;  /* Main brand color */
```

Or edit the `colors.brand` object in `tailwind.config.ts`.

## How to Add Icons

Icons use Lucide React. To use a new icon:

1. Find the icon name at https://lucide.dev/icons
2. Import it in the component (e.g., `import { Star } from "lucide-react"`)
3. For features section, add the icon name string to `data.ts` and register it in the `iconMap` in `Features.tsx`

## How to Add New Sections

1. Create a new file in `src/components/sections/`
2. Use `AnimatedSection` wrapper for scroll animations
3. Import data from `src/lib/data.ts`
4. Add the component to `src/app/page.tsx`

## Common Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
  app/           - Pages and global styles
  components/
    layout/      - Navbar, Footer
    sections/    - Hero, Features, Gallery, CTA
    ui/          - Button, Card, AnimatedSection (reusable)
  lib/
    data.ts      - ALL site content (edit this!)
    utils.ts     - Utility functions
```

## Guidelines

- Keep it simple. This template is for beginners.
- All text content goes in `data.ts`, never hardcode strings in components.
- Use Tailwind utility classes for styling.
- Wrap sections with `AnimatedSection` for scroll animations.
- Images go in the `public/` folder.
- The font is loaded via `next/font` in layout.tsx using the pretendard npm package.
- Never use emoji characters anywhere in the site UI (headings, buttons, labels, cards, etc.). Use Lucide React icons instead.

## Deployment

### GitHub → Vercel 자동 배포
1. GitHub에 코드 push
2. https://vercel.com → New Project → GitHub 레포 Import
3. Environment Variables에 `.env.example`의 모든 키 입력
4. Deploy 버튼 클릭
5. 이후 main 브랜치에 push할 때마다 자동 재배포됨

---

## SEO 설정 가이드

### 구글 검색 등록
1. https://search.google.com/search-console 접속
2. 'URL 접두어'로 사이트 추가
3. '다른 확인 방법' → 'HTML 태그' 선택
4. `content="XXXX"` 안의 값을 `.env.local`의 `GOOGLE_SITE_VERIFICATION`에 입력
5. 배포 후 '확인' 클릭
6. Sitemaps 메뉴에서 `sitemap.xml` 등록

### 네이버 검색 등록
1. https://searchadvisor.naver.com 접속
2. 웹마스터 도구 → 사이트 등록
3. 'HTML 태그' 방식 선택
4. `content="XXXX"` 안의 값을 `.env.local`의 `NAVER_SITE_VERIFICATION`에 입력
5. 배포 후 '소유 확인' 클릭
6. 요청 → 사이트맵 제출 → `https://your-domain.com/sitemap.xml`

### OG 이미지 (카카오톡/SNS 공유 미리보기)
- `public/og-image.png` 파일 추가 (권장 크기: 1200×630px)

---

## 도메인 연결 가이드 (가비아 → Cloudflare → Vercel)

### 1단계: 가비아에서 도메인 구매
https://gabia.com → 원하는 도메인 검색 및 구매

### 2단계: Cloudflare에 도메인 등록
1. https://cloudflare.com → Add a Site → 도메인 입력
2. 무료 플랜 선택
3. Cloudflare가 제공하는 **네임서버 2개** 복사

### 3단계: 가비아 네임서버 변경
가비아 로그인 → My가비아 → 도메인 관리 → 네임서버 → 직접입력 → Cloudflare 네임서버로 교체 (반영 최대 48시간)

### 4단계: Vercel에 도메인 연결
Vercel 대시보드 → 프로젝트 → Settings → Domains → 도메인 입력 후 Add → Vercel CNAME 값 확인

### 5단계: Cloudflare DNS 레코드 추가
Cloudflare → 해당 도메인 → DNS → 레코드 추가:
- Type: `CNAME`, Name: `@`, Target: Vercel CNAME 값, Proxy: DNS only (구름 끄기)
- Type: `CNAME`, Name: `www`, Target: Vercel CNAME 값, Proxy: DNS only

### 6단계: .env.local 업데이트
`NEXT_PUBLIC_SITE_URL=https://실제도메인.com`으로 변경 후 재배포
