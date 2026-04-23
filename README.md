# Harness

웹사이트를 빠르고 퀄리티 있게 만들기 위한 AI-ready 프로젝트 템플릿 모음.
코딩을 몰라도 AI 도구와 함께라면 만들 수 있어요.

---

## 📚 학습 자료

| 문서 | 설명 |
|---|---|
| [docs/CONCEPTS.md](./docs/CONCEPTS.md) | 웹 개발 개념 완전 입문 가이드 (HTML부터 배포까지) |

> 처음 시작한다면 **CONCEPTS.md**를 먼저 읽어보세요. HTML이 뭔지 몰라도 괜찮아요.

---

## 템플릿 종류

```
harness/
├── harness-landing/    # 랜딩/이벤트/캠페인 페이지
├── harness-company/    # 회사소개/포트폴리오 + 관리자
├── harness-test/       # 심리/성향 테스트
└── create-harness/     # CLI 자동화 도구
```

---

## 1단계: 시작 전 준비

### Node.js 설치

**Mac:**
```bash
# nvm 설치 (터미널에 붙여넣기)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 터미널 재시작 후
nvm install --lts
node -v  # v22.x.x 나오면 성공
```

**Windows:**
1. https://nodejs.org 접속
2. LTS 버전 다운로드 및 설치
3. PowerShell(관리자)에서 확인: `node -v`

### Git 설치

**Mac:** 터미널에서 `git --version` 입력 → 없으면 자동 설치 안내 팝업이 뜹니다.

**Windows:** https://git-scm.com 에서 다운로드 및 설치

---

## 2단계: 서비스 가입 (아래 순서대로)

계정을 최대한 하나로 묶는 방법이에요.

| 순서 | 서비스 | 가입 방법 | 용도 |
|---|---|---|---|
| 1 | [GitHub](https://github.com) | Google 계정으로 가입 | 코드 저장소 |
| 2 | [Vercel](https://vercel.com) | GitHub으로 로그인 | 배포 |
| 3 | [Supabase](https://supabase.com) | GitHub으로 로그인 | DB/로그인 |
| 4 | [Cloudflare](https://cloudflare.com) | 이메일로 가입 | DNS/도메인 관리 |
| 5 | [가비아](https://gabia.com) | 이메일로 가입 | 도메인 구매 |

> GitHub 계정 하나만 만들면 Vercel과 Supabase는 그 계정으로 바로 로그인할 수 있어요.

### AI 도구 설치 (구독 서비스에 맞게 1개 선택)

| AI 구독 | 설치할 앱 | 다운로드 |
|---|---|---|
| Claude | Claude Desktop | https://claude.ai/download |
| ChatGPT | Codex | https://codex.openai.com |
| Gemini | Antigravity | Google 검색 |

---

## 3단계: CLI 도구 설치

```bash
# GitHub CLI (GitHub 자동화)
# Mac
brew install gh
# Windows: https://cli.github.com 에서 다운로드

gh auth login  # 브라우저에서 GitHub 로그인

# Vercel CLI (배포 자동화)
npm i -g vercel
vercel login   # 브라우저에서 Vercel 로그인
```

---

## 4단계: 프로젝트 생성

```bash
# create-harness 폴더에서 실행
cd create-harness
npm install
node index.js
```

대화형으로 진행돼요:
1. 템플릿 선택 (landing / company / test)
2. 프로젝트 이름 입력
3. GitHub 레포 생성 여부
4. Vercel 연결 여부
5. `.env.local` 자동 생성

---

## 5단계: AI 도구로 커스터마이징

각 프로젝트 폴더에 AI 지시 파일이 있어요. 해당 앱을 열고 작업하면 됩니다.

| 파일 | AI 도구 |
|---|---|
| `CLAUDE.md` | Claude Desktop (Claude Code) |
| `.cursorrules` | Codex / Cursor |
| `.antigravity.md` | Antigravity |

**작업 방식**: 템플릿은 의도적으로 비어있는 상태로 배포됩니다. AI에게 만들고 싶은 사이트를 자유 형식으로 설명하면, **역질문(무드·레퍼런스·페이지 구성·폰트 방향)** 으로 방향을 확정한 뒤 디자인과 코드를 처음부터 작성해요. 미리 깔린 Hero/Features 같은 섹션을 채워 넣는 방식이 아닙니다.

**색상 변경**: `tailwind.config.ts` (company/test) 또는 `globals.css` (landing)의 `@theme` 블록
**폰트 변경**: `src/app/layout.tsx`에서 `next/font/google` import만 교체 (예: `Noto_Sans_KR` → `Nanum_Myeongjo` + `Black_Han_Sans` 조합)
**사이트 이름/SEO**: `src/lib/data.ts`의 `siteConfig`

---

## 6단계: 배포 (GitHub → Vercel)

1. GitHub에 코드 push
2. https://vercel.com → New Project → GitHub 레포 선택
3. Environment Variables에 `.env.example`의 키 입력
4. Deploy 클릭

**이후에는 코드를 수정하고 push하면 자동으로 재배포돼요.**

---

## 7단계: DB 설정 (company / test 하네스)

### Supabase vs Firebase 비교

| 항목 | Supabase | Firebase |
|---|---|---|
| DB 종류 | PostgreSQL (SQL) | Firestore (NoSQL) |
| 무료 한도 | DB 500MB, 대역폭 2GB | 1GB 저장, 읽기 50K/일 |
| 인증 | 이메일, OAuth 내장 | 이메일, OAuth 내장 |
| 가입 방법 | GitHub으로 로그인 | Google 계정으로 로그인 |
| 어울리는 프로젝트 | 구조화 데이터, 관리자 패널 | 실시간 채팅, 모바일 앱 |

**이 하네스는 Supabase 기반**이에요. 대부분의 웹사이트에 Supabase가 더 적합합니다.

### Supabase 연결 방법

1. https://supabase.com 에서 New Project 생성 (GitHub으로 로그인)
2. Project Settings → API → Project URL 복사 → `.env.local`의 `NEXT_PUBLIC_SUPABASE_URL`에 입력
3. Project Settings → API → anon public 키 복사 → `.env.local`의 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 입력
4. SQL Editor에서 contacts 테이블 생성 (harness-company CLAUDE.md 참고)

---

## 8단계: 도메인 연결 (가비아 → Cloudflare → Vercel)

### 1. 가비아에서 도메인 구매
https://gabia.com → 원하는 도메인 검색 → 구매 (보통 1~2만원/년)

### 2. Cloudflare에 도메인 등록
1. https://cloudflare.com → Add a Site → 구매한 도메인 입력
2. 무료 플랜 선택
3. Cloudflare가 제공하는 **네임서버 2개** 복사 (예: `ara.ns.cloudflare.com`)

### 3. 가비아에서 네임서버 변경
가비아 로그인 → My가비아 → 서비스 관리 → 도메인 관리 → 해당 도메인 → 네임서버 → 직접입력 → Cloudflare 네임서버 2개 입력
> 반영까지 최대 48시간 걸릴 수 있어요.

### 4. Vercel에 도메인 연결
Vercel 대시보드 → 프로젝트 선택 → Settings → Domains → 도메인 입력 후 Add
→ Vercel이 CNAME 값을 알려줘요 (예: `cname.vercel-dns.com`)

### 5. Cloudflare에서 DNS 레코드 추가
Cloudflare → 해당 도메인 → DNS → Records → Add record:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` | Vercel CNAME 값 | DNS only (구름 아이콘 끄기) |
| CNAME | `www` | Vercel CNAME 값 | DNS only |

### 6. 환경변수 업데이트
`.env.local`의 `NEXT_PUBLIC_SITE_URL=https://실제도메인.com`으로 변경 후 Vercel 환경변수도 동일하게 업데이트 → 재배포

---

## 9단계: SEO 설정 (구글 + 네이버 검색 등록)

### sitemap.xml / robots.txt
자동 생성돼요. 배포 후 `https://your-domain.com/sitemap.xml`에서 확인할 수 있어요.

### 구글 서치콘솔 등록
1. https://search.google.com/search-console 접속 (Google 계정)
2. URL 접두어 → 도메인 입력 후 계속
3. '다른 확인 방법' → 'HTML 태그' 클릭
4. `content="XXXX"` 안의 값만 복사
5. `.env.local`에 `GOOGLE_SITE_VERIFICATION=복사한값` 입력
6. Vercel 환경변수에도 동일하게 추가 후 재배포
7. 구글로 돌아와 '확인' 클릭
8. Sitemaps → `sitemap.xml` 제출

### 네이버 서치어드바이저 등록
1. https://searchadvisor.naver.com 접속
2. 웹마스터 도구 → 사이트 등록 → 도메인 입력
3. 'HTML 태그' 방식 선택
4. `content="XXXX"` 안의 값만 복사
5. `.env.local`에 `NAVER_SITE_VERIFICATION=복사한값` 입력
6. Vercel 환경변수에도 동일하게 추가 후 재배포
7. 네이버로 돌아와 '소유 확인' 클릭
8. 요청 → 사이트맵 제출 → `https://your-domain.com/sitemap.xml`

### OG 이미지 (카카오톡/SNS 공유 시 미리보기)
- `public/og-image.png` 파일 추가 (권장 크기: 1200×630px)
- 없으면 SNS 공유 시 이미지 없이 링크만 표시돼요

---

## 스택

- **프레임워크**: Next.js 15 (App Router) + React 19
- **언어**: TypeScript (strict)
- **스타일**: Tailwind CSS v4 + Framer Motion
- **폰트**: `next/font/google` — 고정된 폰트 없음. Noto Sans KR이 플레이스홀더로 깔려 있고, 프로젝트 무드에 맞춰 디자이너가 교체
- **DB/Auth**: Supabase (company/test 하네스)
- **배포**: Vercel
- **DNS**: Cloudflare
