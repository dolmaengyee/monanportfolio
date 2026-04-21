# harness-company

Company introduction / portfolio website template with admin panel.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Framer Motion (scroll-triggered animations)
- Supabase (contact form storage + admin authentication)
- Lucide React (icons)
- Pretendard font (variable weight, loaded via next/font)

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── layout.tsx     # Root layout (font, nav, footer)
│   ├── page.tsx       # Home (assembles all sections)
│   ├── about/         # About page
│   ├── services/      # Services page
│   ├── contact/       # Contact page
│   └── admin/         # Admin dashboard (protected)
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Hero, About, Services, Portfolio, Testimonials, Contact
│   ├── admin/         # AdminLayout, ContactTable, ProtectedRoute
│   └── ui/            # Button, Card, AnimatedSection, PageHeader
├── hooks/             # useAuth (Supabase auth hook)
└── lib/               # data.ts (all content), supabase.ts, utils.ts
```

## How to Customize

### Content (text, links, services, testimonials)

Edit `src/lib/data.ts`. This single file contains ALL site content:
- `siteConfig` — company name, tagline, SEO description
- `navLinks` — navigation menu items
- `heroData` — hero title, subtitle, CTA button
- `aboutData` — about section text, stats, mission, vision
- `servicesData` — service cards (icon, title, description, features)
- `portfolioData` — project showcase (title, description, tags, image, link)
- `testimonialsData` — client reviews
- `contactData` — email, phone, address, social links
- `footerLinks` — footer navigation

### Colors / Branding

Edit `tailwind.config.ts`:
- `brand` colors — primary accent (default: mint/teal)
- `neutral` colors — grays and text

### Font

The template uses Pretendard. To change:
1. Replace `public/fonts/PretendardVariable.woff2` with your font file
2. Update the `localFont()` call in `src/app/layout.tsx`

### Icons

Icons use Lucide React. The `icon` field in `servicesData` is a Lucide icon name string (e.g., "Code", "Palette"). Browse icons at https://lucide.dev/icons

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key
3. Run this SQL in the Supabase SQL Editor:

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default now()
);
```

4. Enable Row Level Security (RLS) on the `contacts` table:

```sql
-- Allow anyone to INSERT (public contact form)
create policy "Allow public insert" on contacts for insert with check (true);

-- Allow authenticated users to SELECT (admin dashboard)
create policy "Allow authenticated select" on contacts for select using (auth.role() = 'authenticated');
```

## Admin Setup

1. In Supabase Dashboard: Authentication > Users > Add User
2. Create an admin user with email and password
3. Visit `/admin/login` and sign in
4. The dashboard shows all contact form submissions

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
| All text content | `src/lib/data.ts` |
| Colors / theme | `tailwind.config.ts` |
| Font | `src/app/layout.tsx` + `public/fonts/` |
| Page layout / sections | `src/app/page.tsx` (home) or individual page files |
| Navigation links | `src/lib/data.ts` → `navLinks` |
| Contact form fields | `src/components/sections/Contact.tsx` |
| Admin table columns | `src/components/admin/ContactTable.tsx` |
| Animation behavior | `src/components/ui/AnimatedSection.tsx` |
| SEO metadata | `src/app/layout.tsx` (global) or individual `page.tsx` files |
| Supabase config | `.env.local` |

## Guidelines

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

## DB 선택 가이드: Supabase vs Firebase

이 템플릿은 **Supabase** 기반입니다.

| 항목 | Supabase | Firebase |
|---|---|---|
| DB 종류 | PostgreSQL (SQL) | Firestore (NoSQL) |
| 쿼리 방식 | SQL / JavaScript SDK | 문서 기반 쿼리 |
| 인증 | 이메일, OAuth 내장 | 이메일, OAuth 내장 |
| 무료 한도 | DB 500MB, 대역폭 2GB | 1GB 저장, 읽기 50K/일 |
| 어울리는 프로젝트 | 구조화 데이터, 관리자 패널 | 실시간 채팅, 모바일 앱 |
| 로그인 방법 | GitHub으로 로그인 | Google 계정으로 로그인 |

**추천**: 회사/포트폴리오 사이트처럼 정형화된 데이터는 Supabase가 더 적합합니다.

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
