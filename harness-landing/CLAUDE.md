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
- Fonts via `next/font/google` — **no fixed font**. The template
  ships with Noto Sans KR as a placeholder; the designer picks the
  actual font(s) based on the reverse-question answers and swaps
  the import in `src/app/layout.tsx`.

## This template ships EMPTY on purpose

`src/app/page.tsx` is an empty placeholder. There are **no pre-built Hero /
Features / Gallery / CTA / Navbar / Footer** components. Claude is expected to
design and build the page from scratch, tailored to the actual project — not
to fill in a pre-baked schema.

What is preserved (shared foundation):
- `src/app/layout.tsx` — Pretendard font, SEO metadata, Vercel Analytics & Speed Insights, favicon, OG image
- `src/app/opengraph-image.tsx` — dynamic OG PNG
- `src/app/icon.svg`, `robots.ts`, `sitemap.ts`
- `src/components/ui/` — `Button`, `Card`, `AnimatedSection` (reusable primitives)
- `src/lib/data.ts` — `siteConfig` only (used by layout + OG)

## Planning flow (before writing code)

1. Read the user's unstructured description (may be a single line or a long paste).
2. Infer project type, audience, tone, tech needs, any reference sites.
3. Ask **3–5 smart reverse questions** with option-style choices about feel / mood / layout direction (see `.harness/agents/planner.md`).
4. Only after direction is locked, split work into designer → copywriter → builder → reviewer tasks.

## How to Change Brand Colors

Edit the `@theme` block in `src/app/globals.css`. Change the `--color-brand-*` values:

```css
--color-brand-500: #0ea5e9;  /* Main brand color */
```

Or edit the `colors.brand` object in `tailwind.config.ts`.

## Icons

Icons use Lucide React. Browse at https://lucide.dev/icons. Import directly in the component that needs them.

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
  app/           - Pages, global styles, SEO files (layout, OG, robots, sitemap)
  components/
    ui/          - Button, Card, AnimatedSection (reusable primitives only)
  lib/
    data.ts      - siteConfig (site name + SEO) — everything else is per-project
    utils.ts     - Utility functions
```

Claude creates `components/sections/`, `components/layout/`, or any other
structure it decides the project needs. Data shapes (nav items, hero content,
etc.) are defined alongside the components that use them, not pre-declared.

## Guidelines

- Respect references: if the user provides one, extract actual colors / spacing / layout from it — do not fall back to template defaults.
- Avoid template-looking defaults: `from-brand-50 to-white` blur-blob hero → 3-col icon grid → centered CTA is a tell-tale "AI did this" pattern. Pick a layout that matches the project's feel.
- Navigation pattern must match the site: route-based for multi-page, hash anchors for single-page scroll. Do not mix without intent.
- Every button / link must work (`onClick`, `type="submit"`, or a real `href`). No empty `href="#"`.
- Use Tailwind utility classes for styling.
- Images go in the `public/` folder.
- Fonts: pick Google Fonts that match the project's mood (editorial? tech? playful?). Pair a display font with a body font when the design calls for it. Swap `next/font/google` imports in `layout.tsx` and expose CSS variables — do NOT leave Noto Sans KR as the default unless the project actually wants a neutral sans.
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
