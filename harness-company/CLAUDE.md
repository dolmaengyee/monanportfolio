# harness-company

Company introduction / portfolio website template with admin panel.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first `@theme` in `globals.css` — no `tailwind.config.ts`)
- Framer Motion (scroll-triggered animations)
- Neon (serverless Postgres) for contact form storage — server-side only, optional
- Password-based admin auth (server `ADMIN_PASSWORD` + httpOnly cookie)
- Lucide React (icons)
- Fonts via `next/font/google` — **no fixed font**. Ships with
  Noto Sans KR as a placeholder; designer swaps during planning
  based on the reverse-question answers.

## This template ships EMPTY on purpose

`src/app/page.tsx` is an empty placeholder. There are **no pre-built Hero /
About / Services / Portfolio / Testimonials / Contact / Navbar / Footer**
components, and **no `/about`, `/services`, `/contact` sub-pages**. Claude is
expected to design and build the pages from scratch, tailored to the actual
company — not to fill in a pre-baked schema.

The admin panel IS preserved (it is not content, it is app functionality):
- `src/app/admin/login` — password login (posts to `/api/admin/login`)
- `src/app/admin` — contact submissions table
- `src/components/admin/` — `AdminLayout`, `ContactTable`, `ProtectedRoute`
- `src/hooks/useAuth.ts` — cookie-session auth state
- `src/app/api/` — `contact`, `admin/login`, `admin/logout`, `admin/session`, `admin/contacts` route handlers
- `src/lib/db.ts` (Neon, server-only), `src/lib/auth.ts` (session, server-only), `src/lib/api.ts` (client fetch helpers)

## Planning flow (before writing code)

1. Read the user's unstructured description (may be a single line or a long paste).
2. Infer project type, audience, tone, pages needed, any reference sites.
3. Ask **3–5 smart reverse questions** with option-style choices about feel / mood / page structure (see `.harness/agents/planner.md`).
4. Only after direction is locked, split work into designer → copywriter → builder → reviewer tasks.
5. Most company sites are multi-page (route-based nav). Single-page scroll is acceptable for event/landing-style requests.

## Project Structure

```
src/
├── app/               # Next.js App Router
│   ├── layout.tsx     # Root layout (font, SEO, Analytics)
│   ├── page.tsx       # Home — empty placeholder
│   ├── admin/         # Admin dashboard (preserved — protected)
│   ├── api/           # Route handlers: contact, admin/{login,logout,session,contacts}
│   ├── opengraph-image.tsx, icon.svg, robots.ts, sitemap.ts
│   └── error.tsx, not-found.tsx, loading.tsx
├── components/
│   ├── admin/         # AdminLayout, ContactTable, ProtectedRoute (preserved)
│   └── ui/            # Button, Card, AnimatedSection (reusable primitives)
├── hooks/             # useAuth (cookie-session auth hook)
└── lib/               # data.ts (siteConfig), db.ts, auth.ts, api.ts, utils.ts
```

Claude creates `components/sections/`, `components/layout/`, sub-page routes,
and any other structure the project actually needs. Data shapes are defined
alongside the components that use them.

## How to Customize

### Content

The site ships with **no seeded content** beyond `siteConfig` in
`src/lib/data.ts` (used by `layout.tsx` and the OG image generator). Claude
writes page content from the user's brief and reverse-question answers, not
from a pre-baked schema.

### Colors / Branding

There is **no `tailwind.config.ts`** — Tailwind v4 is CSS-first. Theme tokens
live in the `@theme` block of `src/app/globals.css`. The template ships with a
neutral placeholder palette (Tailwind's built-in `neutral` scale). To add a
brand accent, define it in `@theme` (e.g. `--color-brand-500: #...;`) and use
`bg-brand-500` etc. — do not reintroduce a config file.

### Font

The template uses `next/font/google` — no font file is bundled. To change:
1. Pick Google Fonts that match the project (filter: Korean at https://fonts.google.com)
2. Update the `import { Noto_Sans_KR } from "next/font/google"` line in `src/app/layout.tsx`
3. Pair a display font with a body font if the design needs editorial contrast
4. Expose extra variables (e.g. `--font-display`) and apply via `font-[var(--font-display)]`

### Icons

Icons use Lucide React. Browse at https://lucide.dev/icons and import directly in the component that needs them.

## Neon (Postgres) Setup

The database is **optional** — the site builds and runs with zero env vars.
Without `DATABASE_URL`, the contact form reports "저장 설정 전" and the admin
table is empty; nothing crashes. All DB access is server-side only (`src/lib/db.ts`).

1. On Vercel: project → **Storage → Neon** 연동 (Create/Connect). `DATABASE_URL`
   is auto-injected into every environment — no manual copy needed.
2. Local dev: run `vercel env pull .env.local` to download `DATABASE_URL`
   (or paste a Neon connection string into `.env.local`).
3. The `contacts` table is created automatically on first use. To create it
   by hand instead, run this in the Neon SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);
```

No row-level security policies are needed: the browser never talks to Postgres
directly. Writes go through `POST /api/contact`; reads through the cookie-guarded
`GET /api/admin/contacts`.

## Admin Setup

Admin auth is a single shared password (no user accounts, no external provider).

1. Set `ADMIN_PASSWORD` in Vercel → Settings → Environment Variables
   (server-only — never exposed to the browser). For local dev, add it to `.env.local`.
2. Visit `/admin/login` and enter the password.
3. On success the server sets an httpOnly `admin_session` cookie (sha256 of the
   password, sameSite lax, secure in production, 24h). The dashboard shows all
   contact submissions. Logout clears the cookie.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## File Ownership Map

| What to change | File to edit |
|---|---|
| Site name / SEO description | `src/lib/data.ts` → `siteConfig` |
| Colors / theme | `src/app/globals.css` `@theme` block (no config file) |
| Font | `src/app/layout.tsx` (swap `next/font/google` imports) |
| Page content / sections | Components Claude creates under `src/components/` and `src/app/` routes |
| Admin table columns | `src/components/admin/ContactTable.tsx` |
| Contact form → DB queries | `src/lib/db.ts` + `src/app/api/contact/route.ts` |
| Admin auth logic | `src/lib/auth.ts` + `src/app/api/admin/*` |
| Animation behavior | `src/components/ui/AnimatedSection.tsx` |
| SEO metadata | `src/app/layout.tsx` (global) or individual `page.tsx` files |
| DB / admin credentials | `.env.local` (`DATABASE_URL`, `ADMIN_PASSWORD`) |

## Guidelines

- Respect references: if the user provides one, extract actual colors / spacing / layout from it — do not fall back to template defaults.
- Avoid template-looking defaults: dark `bg-neutral-900` hero with soft accent blur blobs → 3-col service grid → centered testimonials is the obvious "AI did this" pattern. Pick a layout that matches the project's feel.
- Navigation pattern must match the site: route-based for multi-page company sites, hash anchors for single-page scroll. Do not mix without intent.
- Every button / link must work (`onClick`, `type="submit"`, or a real `href`). No empty `href="#"`.
- If you add a sub-page linked from the navbar, actually create the route under `src/app/`. No dangling links.
- Never use emoji characters anywhere in the site UI (headings, buttons, labels, cards, etc.). Use Lucide React icons instead.

## Deployment

### GitHub → Vercel 자동 배포
1. GitHub에 코드 push
2. https://vercel.com → New Project → GitHub 레포 Import
3. Environment Variables에 `.env.example`의 모든 키 입력
4. Deploy 버튼 클릭
5. 이후 main 브랜치에 push할 때마다 자동 재배포됨

### 배포 후 환경변수 추가/수정
Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

---

## DB / 인증 구조 (Neon + 비밀번호)

이 템플릿은 **Neon(서버리스 PostgreSQL)** 기반이며, DB 접근은 전부 서버
사이드(`src/lib/db.ts`)에서만 일어납니다. 브라우저는 Postgres에 직접 접속하지
않습니다.

| 항목 | 내용 |
|---|---|
| DB | Neon (서버리스 PostgreSQL), `DATABASE_URL` 환경변수 |
| 연동 | Vercel → Storage → Neon 연동 시 `DATABASE_URL` 자동 주입 |
| 로컬 | `vercel env pull .env.local` |
| DB 없이 실행 | 가능 — 연락처 폼은 "저장 설정 전" 안내, 관리자 표는 빈 상태 |
| 연락처 저장 | `POST /api/contact` → `contacts` 테이블 |
| 관리자 조회 | 쿠키 인증된 `GET /api/admin/contacts` |
| 관리자 인증 | 단일 비밀번호 `ADMIN_PASSWORD` (서버 전용) + httpOnly 쿠키 |

**참고**: 회사/포트폴리오 사이트처럼 정형화된 데이터에는 Postgres 계열이
적합하며, Vercel Neon 연동으로 별도 설정 없이 바로 사용할 수 있습니다.

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
