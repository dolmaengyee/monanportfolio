# Harness Test Template

Reusable psychology test / personality assessment template. Ships as an
Enneagram-style system (9 types) scored on a Likert scale, but the type system
is content — swap it for MBTI-like codes, compatibility results, etc. The
underlying type number is NEVER shown to the user.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/app/globals.css` —
  there is NO `tailwind.config.ts`; the `@theme` block is the source of truth)
- Framer Motion for animations
- Fonts via `next/font/google` — **no fixed font**. Ships with Noto Sans KR
  as a placeholder; designer swaps based on Discovery answers.
- Optional Neon Postgres for result storage / sharing / admin (server-side only)

## Content is fixed, design is replaceable

The **logic** of the test is user-driven — you fill in questions, results,
and scoring rules through the data files. That part is stable.

The **visual design** is not baked in. The bundled components use neutral
placeholder styling (grays, simple borders, no gradient-heavy theme) so the
designer can replace the entire look to match the project's mood. Every
interactive component has a `DESIGN NOTE:` comment at the top explaining
which parts must stay (data contract, flow) and which parts the designer
should rewrite (colors, radius, motion, typography, layout).

## Planning flow (before writing code)

1. Read the user's unstructured description.
2. Infer test type, audience, tone, number of result types, share story.
3. Ask **3–5 smart reverse questions** with option-style choices about:
   - Visual mood (playful quiz / serious analytical / editorial magazine)
   - Number of result types and whether they should feel distinct per-type
   - Font pairing (see `.harness/agents/planner.md`)
4. Only after direction is locked, build out `src/data/` (content) and then
   rewrite the component styling (design).

## Data model (how scoring works)

This is a **Likert-scored, multi-type** system, not a single-answer quiz.

- `src/data/questions.ts` — a flat list of statements. Each `Question` has an
  `id`, `text`, and a hidden `typeNumber` (1–9). Users rate each statement on a
  1–4 Likert scale (`likertLabels`). The default set is 36 statements
  (4 per type × 9 types), interleaved one-per-type per round.
- `src/lib/testLogic.ts` — `calculateResult(answers)` sums the Likert scores per
  `typeNumber` (`calculateScores`), ranks them (`calculateRanking`), and returns
  `{ finalType, scores, ranking }`. Ties break on the highest single answer.
- `src/data/results.ts` — one `ResultType` entry per type number with user-facing
  copy: `name`, `icon` (Lucide icon name), `tagline`, `description`,
  `strengths[]`, `challenges[]`, `compatibleWith[]`, `shareText`, plus
  `gradient` / `accentColor` for optional per-type theming.
- `src/data/config.ts` — test metadata (title, subtitle, description,
  questionCount, share hashtag, og image, site url).

`TypeNumber` (1–9) is internal only — never render it in the UI.

## Architecture

```
src/data/       - Content layer (questions, results, config)
src/lib/        - Logic + data access (testLogic, db, api, adminAuth, utils)
src/context/    - State layer (TestContext with sessionStorage persistence)
src/components/ - UI layer (test/, ui/, layout/)
src/app/        - Pages (intro, test, result, ranking, admin) + API routes
src/app/api/    - Server route handlers (results, ranking, admin)
```

## Critical Rules

- NEVER expose `TypeNumber` to users in any UI component.
- **2-step entry flow (do not merge):** the home page (`src/app/page.tsx`) has
  two steps. Step 1 is `IntroScreen` — intro copy + a single "시작하기" CTA,
  **no inputs**. Step 2 is `ParticipantForm` — name (required), phone (optional),
  and a **REQUIRED** privacy-consent checkbox. Intro always comes first.
- **Consent is mandatory:** the consent checkbox
  ("개인정보 수집·이용에 동의합니다 (필수)") must never be removed or pre-checked.
  Submit stays disabled until name is filled AND consent is checked. The consent
  timestamp is stored as `participant-consented-at` (ISO) in sessionStorage and
  persisted to the DB as `consented_at`. Customize the collected items / purpose /
  retention text in `ParticipantForm.tsx` per project.
- Personal data (name, phone) is **server-side only**. It is never queried from
  the browser and never returned by public endpoints. `/api/results/[id]`
  returns only `{ name, finalType, createdAt }` — never phone.
- Result page reads from sessionStorage (set by TestContext on completion).
- All animations use Framer Motion (no CSS animations for interactive elements).
- Mobile-first design (most users access on mobile).

## How to Customize

### Change test questions
Edit `src/data/questions.ts`. Each `Question` has `text` (shown) and a hidden
`typeNumber`. Keep roughly the same number of statements per type so scores stay
comparable.

### Change result descriptions
Edit `src/data/results.ts` (title, tagline, description, strengths, challenges,
compatibleWith, shareText).

### Change test metadata
Edit `src/data/config.ts` for title, subtitle, description, share hashtag.

### Scale to more/fewer types
1. Expand or shrink the `TypeNumber` union in `questions.ts`.
2. Add/remove matching entries in `results.ts` (keep `compatibleWith` valid).
3. Add statements so every type has a comparable count.
4. `testLogic.ts` handles any number of types automatically.

## Data storage (Neon Postgres — optional)

The DB is **optional**. With no `DATABASE_URL` the site runs fully; only result
storage, sharing, and the admin dashboard are disabled (helpers fail soft).

### Enable via Vercel Storage → Neon
1. Vercel 프로젝트 → Storage → Create Database → **Neon** 연동.
2. 연동하면 `DATABASE_URL` 환경변수가 프로젝트에 **자동 주입**됩니다.
3. 로컬 개발은 `vercel env pull .env.local` 로 값을 받아옵니다.
4. Neon SQL Editor에서 아래 테이블을 한 번 생성하세요:

```sql
CREATE TABLE IF NOT EXISTS test_results (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  phone        text,
  final_type   text NOT NULL,
  scores       jsonb,
  ranking      jsonb,
  answers      jsonb,
  consented_at timestamptz,
  created_at   timestamptz DEFAULT now()
);
```

Data access lives in `src/lib/db.ts` (server-only). `src/lib/api.ts` holds the
typed client-side fetch helpers (`saveTestResult`, `getResultById`, `getRanking`,
`adminLogin`, `getAdminResults`) that talk to the API routes below.

### API surface (`src/app/api/`)
- `POST /api/results` — save a result; returns `{ id }` (or `{ id: null }` when
  the DB is not configured).
- `GET /api/results/[id]` — public-safe single result `{ name, finalType, createdAt }`.
  Never returns phone; 404 when missing.
- `GET /api/ranking` — aggregated distribution only: `[{ finalType, count }]`.
- `POST /api/admin/login` — see admin auth below.
- `POST /api/admin/logout` — clears the session cookie.
- `GET /api/admin/results` — full rows for the authenticated admin.

## Admin auth

- Set a **server-only** `ADMIN_PASSWORD` env var. Never prefix it with
  `NEXT_PUBLIC_` — that would embed it in the client bundle.
- `POST /api/admin/login` compares the submitted password with `ADMIN_PASSWORD`
  and, on success, sets an **httpOnly** cookie `admin_session` (value = SHA-256
  hex of the password, `sameSite: lax`, `secure` in production, 24h maxAge).
- `GET /api/admin/results` verifies that cookie (constant-time) before returning
  data; 401 otherwise. The client (`useAdminAuth`) checks "am I logged in" by
  calling this guarded endpoint.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

## Guidelines

- Never use emoji characters anywhere in the site UI (headings, buttons, labels,
  cards, etc.). Use Lucide React icons instead.

## Deployment

### GitHub → Vercel 자동 배포
1. GitHub에 코드 push
2. https://vercel.com → New Project → GitHub 레포 Import
3. Storage → Neon 연동 시 `DATABASE_URL` 자동 주입. `ADMIN_PASSWORD`는 직접 입력
   (서버 전용, `NEXT_PUBLIC_` 금지). 나머지 키는 `.env.example` 참고.
4. Deploy 버튼 클릭

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
- `src/app/opengraph-image.tsx`가 동적 OG 이미지를 자동 생성합니다.
- 고정 이미지를 쓰려면 `public/og-image.png`(권장 1200×630px)를 추가하고
  `src/data/config.ts`의 `ogImage` 경로를 함께 업데이트하세요.

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
Vercel 대시보드 → 프로젝트 → Settings → Domains → 도메인 입력 후 Add

### 5단계: Cloudflare DNS 레코드 추가
- Type: `CNAME`, Name: `@`, Target: Vercel CNAME 값, Proxy: DNS only
- Type: `CNAME`, Name: `www`, Target: Vercel CNAME 값, Proxy: DNS only

### 6단계: .env.local 업데이트
`NEXT_PUBLIC_SITE_URL=https://실제도메인.com`으로 변경 후 재배포
