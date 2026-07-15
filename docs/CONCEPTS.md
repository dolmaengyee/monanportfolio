# 웹사이트 만들기 완전 가이드

> 코딩을 몰라도 괜찮아요. 이 가이드는 웹사이트를 만들기 위해 필요한 개념들을 처음부터 차근차근 설명합니다.

---

## 목차

1. [웹사이트가 어떻게 동작하는가](#1-웹사이트가-어떻게-동작하는가)
2. [HTML — 뼈대](#2-html--뼈대)
3. [CSS — 옷입히기](#3-css--옷입히기)
4. [JavaScript — 움직임](#4-javascript--움직임)
5. [TypeScript — 더 안전한 JavaScript](#5-typescript--더-안전한-javascript)
6. [React — 컴포넌트로 만드는 UI](#6-react--컴포넌트로-만드는-ui)
7. [Next.js — React를 실제 웹사이트로](#7-nextjs--react를-실제-웹사이트로)
8. [Tailwind CSS — 빠른 스타일링](#8-tailwind-css--빠른-스타일링)
9. [Framer Motion — 애니메이션](#9-framer-motion--애니메이션)
10. [DB와 백엔드 — 데이터 저장](#10-db와-백엔드--데이터-저장)
11. [API — 서비스끼리 대화하는 방법](#11-api--서비스끼리-대화하는-방법)
12. [Neon — 하네스의 데이터베이스](#12-neon--하네스의-데이터베이스)
13. [환경변수 — 비밀 열쇠 관리](#13-환경변수--비밀-열쇠-관리)
14. [Git과 GitHub — 코드 저장소](#14-git과-github--코드-저장소)
15. [Vercel — 배포와 CI/CD](#15-vercel--배포와-cicd)
16. [도메인과 DNS — 주소 만들기](#16-도메인과-dns--주소-만들기)
17. [Cloudflare — 도메인 관리](#17-cloudflare--도메인-관리)
18. [AI 코딩 도구](#18-ai-코딩-도구)
19. [하네스(Harness) 사용법](#19-하네스harness-사용법)

---

## 1. 웹사이트가 어떻게 동작하는가

브라우저에서 `google.com`을 입력하면 무슨 일이 일어날까요?

```
사용자 브라우저
    ↓ "google.com 주세요"
DNS 서버 (전화번호부)
    ↓ "IP 주소는 142.250.x.x 입니다"
구글 서버
    ↓ HTML 파일 전송
브라우저가 HTML 해석 → 화면에 표시
```

웹사이트는 크게 두 부분으로 나뉩니다:

| | 설명 | 예시 |
|---|---|---|
| **프론트엔드** | 사용자가 보는 화면 | 버튼, 텍스트, 이미지 |
| **백엔드** | 서버에서 처리하는 것 | 회원가입, 데이터 저장 |

---

## 2. HTML — 뼈대

HTML은 웹페이지의 **구조**를 만들어요. 마치 집의 뼈대와 같아요.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>내 첫 웹사이트</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
    <p>이것은 문단입니다.</p>
    <button>클릭하세요</button>
  </body>
</html>
```

**자주 쓰는 태그들:**

| 태그 | 용도 |
|---|---|
| `<h1>` ~ `<h6>` | 제목 (h1이 가장 큼) |
| `<p>` | 문단 |
| `<a href="...">` | 링크 |
| `<img src="...">` | 이미지 |
| `<div>` | 영역 나누기 |
| `<button>` | 버튼 |
| `<input>` | 입력창 |

> **핵심**: HTML은 "무엇이 있는가"를 정의해요. 어떻게 보이는지는 CSS가 담당해요.

---

## 3. CSS — 옷입히기

CSS는 HTML에 **디자인**을 입혀요. 색상, 크기, 위치, 글꼴 등을 정해요.

```css
/* 버튼을 파란색으로 만들기 */
button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
}

/* 제목 스타일 */
h1 {
  font-size: 48px;
  font-weight: bold;
  color: #333333;
}
```

**레이아웃의 핵심 — Flexbox:**
```css
.container {
  display: flex;          /* 가로로 나열 */
  justify-content: center; /* 가운데 정렬 */
  gap: 16px;              /* 사이 간격 */
}
```

> **핵심**: 요즘은 CSS를 직접 쓰는 대신 **Tailwind CSS** 같은 도구를 써서 더 빠르게 스타일링해요.

---

## 4. JavaScript — 움직임

JavaScript(JS)는 웹페이지를 **살아있게** 만들어요. 버튼 클릭, 데이터 불러오기, 애니메이션 등을 담당해요.

```javascript
// 버튼 클릭 시 알림 표시
document.querySelector('button').addEventListener('click', () => {
  alert('클릭했습니다!')
})

// 숫자 계산
const 합계 = 10 + 20  // 30

// 조건문
if (합계 > 25) {
  console.log('25보다 큽니다')
}

// 반복문
const 과일들 = ['사과', '바나나', '딸기']
과일들.forEach(과일 => {
  console.log(과일)
})
```

**비동기 처리 (API 호출):**
```javascript
// 데이터를 서버에서 가져오기
const response = await fetch('https://api.example.com/data')
const data = await response.json()
console.log(data)
```

> **핵심**: JS는 HTML/CSS에 생명을 불어넣어요. React, Next.js는 모두 JavaScript 기반이에요.

---

## 5. TypeScript — 더 안전한 JavaScript

TypeScript(TS)는 JavaScript에 **타입**을 추가해요. 실수를 미리 잡아줘서 안전해요.

```typescript
// JavaScript (타입 없음 — 실수해도 모름)
function 더하기(a, b) {
  return a + b
}
더하기('10', 5)  // '105' — 버그! 하지만 실행 전에 모름

// TypeScript (타입 있음 — 실수를 미리 잡음)
function 더하기(a: number, b: number): number {
  return a + b
}
더하기('10', 5)  // 에러! "문자열은 안 돼요" 라고 미리 알려줌
```

**자주 쓰는 타입들:**
```typescript
const 이름: string = '김산하'
const 나이: number = 30
const 활성화: boolean = true
const 목록: string[] = ['사과', '바나나']

// 객체 타입 정의
interface 사용자 {
  이름: string
  나이: number
  이메일: string
}
```

> **핵심**: 하네스는 TypeScript strict 모드를 사용해요. 처음엔 어색하지만 익숙해지면 훨씬 편해요.

---

## 6. React — 컴포넌트로 만드는 UI

React는 UI를 **재사용 가능한 컴포넌트**로 만드는 라이브러리예요.

**컴포넌트란?** 레고 블럭처럼 조각조각 만들어서 조합해요.

```tsx
// Button 컴포넌트
function Button({ 텍스트, 색상 }: { 텍스트: string, 색상: string }) {
  return (
    <button style={{ backgroundColor: 색상 }}>
      {텍스트}
    </button>
  )
}

// 사용하기
function App() {
  return (
    <div>
      <Button 텍스트="저장" 색상="blue" />
      <Button 텍스트="취소" 색상="gray" />
    </div>
  )
}
```

**useState — 상태 관리 (화면을 바꾸는 데이터):**
```tsx
import { useState } from 'react'

function 카운터() {
  const [숫자, set숫자] = useState(0)  // 초기값 0

  return (
    <div>
      <p>현재 숫자: {숫자}</p>
      <button onClick={() => set숫자(숫자 + 1)}>+1</button>
    </div>
  )
}
```

**Server Component vs Client Component (Next.js에서 중요!):**

| | Server Component | Client Component |
|---|---|---|
| 기본값 | ✅ 기본 | 파일 상단에 `'use client'` 필요 |
| 실행 위치 | 서버 | 브라우저 |
| useState 사용 | ❌ 불가 | ✅ 가능 |
| 데이터 직접 조회 | ✅ 가능 | ❌ API 통해서 |
| 언제 씀 | 정적 콘텐츠, DB 조회 | 버튼 클릭, 입력창, 애니메이션 |

> **핵심**: 상호작용이 필요한 컴포넌트에는 `'use client'`를 붙여요.

---

## 7. Next.js — React를 실제 웹사이트로

Next.js는 React로 **완전한 웹 애플리케이션**을 만들 수 있게 해주는 프레임워크예요.

**React vs Next.js 차이:**

| | React | Next.js |
|---|---|---|
| 페이지 이동 | 직접 설정 필요 | 폴더 구조로 자동 |
| SEO | 약함 | 강함 (서버에서 HTML 생성) |
| 성능 | 보통 | 최적화 자동 |
| 이미지 최적화 | 직접 | next/image로 자동 |

**App Router 폴더 구조 (하네스 사용):**
```
src/app/
├── page.tsx          → 홈페이지 (/)
├── about/
│   └── page.tsx      → /about 페이지
├── layout.tsx        → 전체 레이아웃 (공통 헤더/푸터)
├── not-found.tsx     → 404 페이지
├── error.tsx         → 에러 페이지
├── loading.tsx       → 로딩 중 표시
├── sitemap.ts        → sitemap.xml 자동 생성
└── robots.ts         → robots.txt 자동 생성
```

**특수 파일들:**
```tsx
// layout.tsx — 모든 페이지에 공통으로 적용되는 틀
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Navbar />        {/* 네비게이션 바 */}
        {children}        {/* 각 페이지 내용 */}
        <Footer />        {/* 푸터 */}
      </body>
    </html>
  )
}
```

---

## 8. Tailwind CSS — 빠른 스타일링

Tailwind CSS는 CSS를 **클래스 이름으로** 바로 적용하는 방식이에요.

**기존 CSS vs Tailwind CSS:**

```css
/* 기존 CSS — 파일 따로 만들어야 함 */
.my-button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

```tsx
{/* Tailwind CSS — 클래스만 추가하면 끝 */}
<button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
  버튼
</button>
```

**자주 쓰는 클래스들:**

| 용도 | 클래스 예시 |
|---|---|
| 배경색 | `bg-blue-500`, `bg-white`, `bg-neutral-900` |
| 텍스트색 | `text-white`, `text-gray-600` |
| 크기 | `w-full`, `h-screen`, `max-w-lg` |
| 여백 | `p-4`, `px-6`, `py-3`, `mt-8`, `mb-4` |
| 폰트 | `text-xl`, `font-bold`, `text-center` |
| 레이아웃 | `flex`, `grid`, `items-center`, `justify-between` |
| 반응형 | `md:text-xl` (중간화면 이상), `lg:flex` |
| 호버 | `hover:bg-blue-600` |
| 애니메이션 | `transition-colors`, `duration-200` |

**반응형 디자인:**
```tsx
<div className="text-sm md:text-base lg:text-lg">
  {/* 작은화면: text-sm / 중간화면: text-base / 큰화면: text-lg */}
</div>
```

> **하네스는 Tailwind CSS v4** 를 사용해요. v3와 설정 방식이 조금 달라요.
> - v3: `tailwind.config.js` 중심
> - v4: `globals.css`의 `@theme` 블록에 CSS 변수로 설정

---

## 9. Framer Motion — 애니메이션

Framer Motion은 React에서 **부드러운 애니메이션**을 만들어주는 라이브러리예요.

```tsx
import { motion } from 'framer-motion'

// 스크롤 시 아래에서 위로 나타나는 효과
<motion.div
  initial={{ opacity: 0, y: 30 }}   // 처음: 투명, 30px 아래
  animate={{ opacity: 1, y: 0 }}    // 최종: 불투명, 원래 위치
  transition={{ duration: 0.5 }}    // 0.5초 동안
>
  내용이 부드럽게 나타납니다
</motion.div>

// 호버 효과
<motion.button
  whileHover={{ scale: 1.05 }}  // 마우스 올리면 1.05배
  whileTap={{ scale: 0.95 }}    // 클릭하면 0.95배
>
  버튼
</motion.button>
```

> **하네스에서는** `AnimatedSection` 컴포넌트가 Framer Motion을 내부적으로 사용해요.
> 섹션을 `<AnimatedSection>`으로 감싸면 스크롤 시 자동으로 나타나는 효과가 생겨요.

---

## 10. DB와 백엔드 — 데이터 저장

**DB(데이터베이스)** 는 데이터를 저장하는 곳이에요. 엑셀 파일처럼 생각하면 돼요.

**DB가 필요한 경우:**
- 회원가입/로그인
- 글 작성, 댓글
- 문의 폼 저장
- 사용자 데이터

**DB 종류:**

| 종류 | 설명 | 예시 |
|---|---|---|
| **관계형 DB (SQL)** | 표 형태, 엄격한 구조 | PostgreSQL, MySQL |
| **비관계형 DB (NoSQL)** | 자유로운 구조, 유연함 | MongoDB, Firestore |

**SQL vs NoSQL 비유:**

```
SQL = 엑셀 스프레드시트
  이름   | 나이 | 이메일
  -------|------|-------
  김산하 |  30  | kim@...

NoSQL = 메모장
  {
    "이름": "김산하",
    "나이": 30,
    "취미": ["코딩", "독서"]  // 다양한 형태 저장 가능
  }
```

---

## 11. API — 서비스끼리 대화하는 방법

**API**는 "Application Programming Interface"의 약자예요.
쉽게 말하면 **서비스끼리 정해진 방식으로 대화하는 규칙**이에요.

**식당 비유:**
```
나 (프론트엔드) → 종업원 (API) → 주방 (서버/DB)

1. "김치찌개 주세요" (요청, Request)
2. 종업원이 주방에 전달
3. 주방에서 요리
4. "여기 김치찌개입니다" (응답, Response)
```

**실제 API 예시 — Gemini AI API:**
```typescript
// 1. API 키 발급 (신분증 같은 것)
const API_KEY = process.env.GEMINI_API_KEY

// 2. API 호출 (요청 보내기)
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: '안녕하세요!' }] }]
    })
  }
)

// 3. 응답 받기
const data = await response.json()
console.log(data.candidates[0].content.parts[0].text)
// "안녕하세요! 무엇을 도와드릴까요?"
```

**자주 쓰는 AI API들:**

| 서비스 | API | 무료 한도 |
|---|---|---|
| Google Gemini | Google AI Studio | 넉넉함 |
| OpenAI GPT | platform.openai.com | 유료 (결제 필요) |
| Anthropic Claude | console.anthropic.com | 유료 (결제 필요) |
| 이메일 발송 | Resend | 3,000건/월 무료 |

> **중요**: API 키는 절대 코드에 직접 쓰지 마세요! `.env.local`에 저장하고 `process.env.API_KEY`로 불러와요.

---

## 12. Neon — 하네스의 데이터베이스

### Neon이 뭔가요?

Neon은 **서버리스 PostgreSQL** 서비스예요. Vercel 마켓플레이스에서 클릭 몇 번으로 무료 DB를 만들 수 있어요.

```
장점:
✅ PostgreSQL 사용 (강력한 SQL 쿼리)
✅ Vercel 안에서 바로 생성 — 별도 가입 불필요
✅ 연동하면 DATABASE_URL이 배포 환경변수에 자동 주입
✅ 무료 플랜으로 시작 가능
✅ 안 쓸 때는 자동으로 잠들어서 (scale to zero) 무료 한도가 오래감

단점:
❌ 서버에서만 접속 가능 (브라우저에서 직접 접속 불가 — 그래서 하네스는 API 라우트를 통해 읽고 써요. 오히려 보안상 장점!)
```

**설정 방법:**
1. Vercel 대시보드 → 프로젝트 → **Storage** 탭
2. **Create Database** → **Neon** (무료 플랜) → Connect
3. `DATABASE_URL`이 Vercel 환경변수에 자동 주입됨
4. 로컬에서 쓰려면: `vercel env pull .env.local`

### 다른 선택지는?

| 프로젝트 | 추천 |
|---|---|
| 회사 소개/포트폴리오, 문의 폼 | **Neon** (하네스 기본) |
| 테스트/퀴즈 앱, 랭킹 | **Neon** (하네스 기본) |
| 실시간 채팅, 모바일 앱 연동 | Firebase (Google의 NoSQL BaaS) |
| 소셜 로그인 등 본격적인 인증 | Supabase (PostgreSQL + Auth 내장) |

> **하네스는 Neon 기반**이에요. Vercel과 한 몸처럼 붙어 있어서 설정이 가장 간단합니다.

---

## 13. 환경변수 — 비밀 열쇠 관리

환경변수는 **코드에 직접 쓰면 안 되는 비밀 정보**를 안전하게 관리하는 방법이에요.

**왜 필요한가요?**
```
❌ 잘못된 방법 — DB 접속 주소가 GitHub에 공개됨
const DB_URL = "postgresql://user:password@xxx.neon.tech/db"

✅ 올바른 방법 — .env.local 파일에 저장
const DB_URL = process.env.DATABASE_URL
```

**`.env.local` 파일 예시:**
```bash
# DB (Vercel의 Neon 연동 시 자동 주입 — vercel env pull로 받아옴)
DATABASE_URL=postgresql://...

# 관리자 페이지 비밀번호 (서버 전용 — NEXT_PUBLIC_ 붙이면 안 돼요!)
ADMIN_PASSWORD=나만아는비밀번호

# 사이트
NEXT_PUBLIC_SITE_URL=https://mysite.com

# SEO
GOOGLE_SITE_VERIFICATION=abc123
NAVER_SITE_VERIFICATION=xyz789
```

**규칙:**
- `NEXT_PUBLIC_` 접두사 → 브라우저에서도 접근 가능 (공개 정보만!)
- 접두사 없음 → 서버에서만 접근 가능 (비밀 정보: DB 주소, 관리자 비밀번호)
- `.env.local`은 `.gitignore`에 포함 → GitHub에 올라가지 않음

**Vercel 배포 시:**
`.env.local`은 내 컴퓨터에만 있으니까, Vercel 대시보드 → Settings → Environment Variables에 동일하게 입력해야 해요.

---

## 14. Git과 GitHub — 코드 저장소

### Git이란?
코드의 **변경 이력을 기록**하는 도구예요. 저장을 하면서 타임머신처럼 이전 상태로 돌아갈 수 있어요.

```bash
git init              # Git 시작
git add .             # 변경사항 선택
git commit -m "메시지" # 저장 (스냅샷 찍기)
git push              # GitHub에 올리기
git pull              # GitHub에서 내려받기
```

### GitHub이란?
Git으로 관리하는 코드를 **인터넷에 저장**하는 서비스예요. 코드의 구글 드라이브라고 생각하면 돼요.

**GitHub 주요 개념:**

| 용어 | 설명 |
|---|---|
| Repository (레포) | 프로젝트 폴더 (저장소) |
| Commit | 변경사항 저장 |
| Push | 로컬 → GitHub 업로드 |
| Pull | GitHub → 로컬 다운로드 |
| Branch | 독립적인 작업 공간 |
| Clone | GitHub 레포를 내 컴퓨터로 복사 |

### 하네스 클론하기

```bash
# 1. GitHub에서 레포 주소 복사 (Code → HTTPS 복사)
git clone https://github.com/사용자명/harness.git

# 2. 폴더 이동
cd harness

# 3. create-harness로 프로젝트 생성
cd create-harness
npm install
node index.js
```

---

## 15. Vercel — 배포와 CI/CD

### 배포란?
내 컴퓨터에서만 보이던 웹사이트를 **전 세계 누구나 접근할 수 있게** 만드는 것이에요.

### Vercel이란?
Next.js를 만든 회사가 제공하는 **무료 호스팅 서비스**예요. GitHub과 연결하면 코드를 올릴 때마다 자동으로 배포해줘요.

### CI/CD란?
**Continuous Integration / Continuous Deployment**의 약자예요.
쉽게 말하면 **"코드 올리면 자동으로 배포"**예요.

```
내가 코드 수정
    ↓ git push
GitHub에 업로드
    ↓ 자동 감지
Vercel이 빌드
    ↓ 성공하면
전 세계에 배포됨 ✅
```

### Vercel 사용법

1. https://vercel.com → GitHub으로 로그인
2. New Project → GitHub 레포 선택
3. Environment Variables에 `.env.example` 내용 입력
4. Deploy 클릭

**배포 후:**
- `프로젝트명.vercel.app` 주소로 바로 접근 가능
- GitHub에 push할 때마다 자동 재배포
- 배포 실패 시 이전 버전 유지 (롤백 자동)

### Vercel 무료 플랜 한도
- 프로젝트 수: 무제한
- 대역폭: 100GB/월
- 빌드 시간: 6,000분/월
- 일반적인 개인 프로젝트에 충분해요

---

## 16. 도메인과 DNS — 주소 만들기

### 도메인이란?
`mysite.com` 같은 **인터넷 주소**예요. IP 주소(숫자) 대신 사람이 기억하기 쉬운 이름을 써요.

```
IP 주소: 192.168.1.1 (실제 서버 주소, 숫자라 기억하기 어려움)
도메인: mysite.com (사람이 기억하기 쉬운 이름)
```

### DNS란?
DNS(Domain Name System)는 **도메인과 IP 주소를 연결**해주는 전화번호부예요.

```
사용자가 mysite.com 입력
    ↓
DNS 서버에 물어봄: "mysite.com의 IP 주소가 뭐예요?"
    ↓
DNS 서버: "76.76.21.21이에요" (Vercel 서버)
    ↓
해당 서버로 연결
```

### 도메인 구매 (가비아)

1. https://gabia.com 접속
2. 원하는 도메인 검색 (예: `mycompany.co.kr`)
3. 결제 (보통 1~3만원/년)
4. My가비아 → 도메인 관리에서 확인

### DNS 레코드 종류

| 레코드 | 역할 |
|---|---|
| **A 레코드** | 도메인 → IP 주소 연결 |
| **CNAME** | 도메인 → 다른 도메인 연결 (Vercel 연결 시 사용) |
| **NS** | 네임서버 지정 (Cloudflare 쓸 때 변경) |
| **MX** | 이메일 서버 지정 |

---

## 17. Cloudflare — 도메인 관리

Cloudflare는 **무료 DNS 관리 + CDN + 보안** 서비스예요.

**왜 Cloudflare를 쓰나요?**
- 가비아에서 직접 DNS 관리하는 것보다 더 편리해요
- CDN으로 전 세계 어디서나 빠르게 접속
- DDoS 공격 방어
- HTTPS 자동 적용

**도메인 연결 전체 흐름:**

```
1. 가비아에서 도메인 구매 (mysite.com)
       ↓
2. Cloudflare에 도메인 등록
   - Cloudflare 네임서버 2개 받기
       ↓
3. 가비아에서 네임서버 변경
   - Cloudflare 네임서버로 교체
   - (반영 최대 48시간)
       ↓
4. Vercel에서 도메인 추가
   - Settings → Domains → mysite.com 입력
   - Vercel이 CNAME 값 제공
       ↓
5. Cloudflare DNS에 레코드 추가
   - CNAME @ → Vercel CNAME 값
   - CNAME www → Vercel CNAME 값
   - Proxy: DNS only (구름 끄기)
       ↓
6. 완료! mysite.com → Vercel 서버 연결
```

---

## 18. AI 코딩 도구

코딩을 몰라도 AI 도구를 활용하면 웹사이트를 만들 수 있어요.

### Claude Desktop (Claude Code)

Anthropic의 Claude를 코딩 도구로 사용해요. 하네스의 `CLAUDE.md` 파일을 자동으로 읽어서 프로젝트 구조를 파악해요.

**사용법:**
```
1. Claude Desktop 설치 (https://claude.ai/download)
2. 하네스 프로젝트 폴더 열기
3. 자연어로 요청하기

예시:
"히어로 섹션의 제목을 '나의 포트폴리오'로 바꿔줘"
"연락처 섹션에 인스타그램 링크 추가해줘"
"배경색을 남색 계열로 바꿔줘"
```

### Codex (OpenAI)

GPT 구독자라면 Codex를 사용해요. `.cursorrules` 파일을 읽어요.

```
다운로드: https://codex.openai.com
사용법: Claude Desktop과 동일
```

### Antigravity (Google)

Gemini 구독자라면 Antigravity를 사용해요. `.antigravity.md` 파일을 읽어요.

```
설치: Google 검색에서 Antigravity 검색
사용법: Claude Desktop과 동일
```

### AI 도구 활용 팁

**잘 되는 요청:**
- "src/lib/data.ts의 회사명을 '내 회사'로 바꿔줘"
- "히어로 섹션 버튼 색상을 남색으로 변경해줘"
- "포트폴리오에 새 프로젝트 카드 추가해줘. 제목은 '...' 설명은 '...'"

**잘 안 되는 요청:**
- "멋있게 만들어줘" (너무 막연함)
- "다 바꿔줘" (범위가 너무 넓음)
- 한 번에 너무 많은 것 요청

> **팁**: 변경하고 싶은 파일과 구체적인 내용을 함께 말해주면 훨씬 정확해요.

---

## 19. 하네스(Harness) 사용법

### 하네스란?

하네스는 **AI 도구와 함께 쓰도록 설계된 Next.js 웹사이트 템플릿 모음**이에요. 반복적인 초기 설정을 생략하고 바로 커스터마이징에 집중할 수 있어요.

**3가지 템플릿:**

| 템플릿 | 용도 | DB 필요 |
|---|---|---|
| `harness-landing` | 랜딩/이벤트/캠페인 페이지 | ❌ |
| `harness-company` | 회사소개/포트폴리오 + 관리자 | 선택 (Neon) |
| `harness-test` | 심리/성향 테스트 + 랭킹 | 선택 |

### GitHub에서 클론하기

```bash
# 1. Git이 설치되어 있어야 해요
# Mac: git --version (없으면 설치 팝업)
# Windows: https://git-scm.com 설치

# 2. 클론 (내 컴퓨터로 복사)
git clone https://github.com/[사용자명]/harness.git

# 3. 폴더 이동
cd harness

# 4. CLI 도구 준비
cd create-harness
npm install

# 5. 프로젝트 생성 (대화형)
node index.js
```

### create-harness 실행 흐름

```
? 어떤 하네스를 사용할까요?
  ❯ 🚀 landing  — 랜딩/이벤트/캠페인 페이지
    🏢 company  — 회사소개/포트폴리오 + 관리자
    🧪 test     — 심리/성향 테스트

? 프로젝트 이름을 입력하세요: my-company-site

✅ 템플릿 복사 완료
✅ 패키지 설치 완료
✅ Git 초기화 완료

? GitHub에 'my-company-site' 레포를 생성할까요? › Yes
✅ GitHub 레포 생성 완료

? Vercel에 배포 설정을 할까요? › Yes
✅ Vercel 연결 완료

? .env.example을 .env.local로 복사할까요? › Yes
✅ .env.local 생성 완료

다음 단계:
  cd my-company-site
  npm run dev
```

### 커스터마이징

**콘텐츠 변경:**
```typescript
// src/lib/data.ts — 이 파일 하나만 수정하면 됩니다

export const siteConfig = {
  name: '내 회사 이름',        // ← 회사명 변경
  tagline: '우리의 슬로건',    // ← 슬로건 변경
  description: 'SEO 설명글',  // ← 구글 검색 설명 변경
}

export const heroData = {
  title: '히어로 제목',
  subtitle: '히어로 부제목',
  ctaText: '시작하기',
}
```

**색상 변경:**
```typescript
// tailwind.config.ts (company/test)
colors: {
  brand: {
    500: '#0ea5e9',  // ← 여기를 원하는 색상으로 변경
  }
}
```
```css
/* globals.css (landing) */
@theme {
  --color-brand-500: #0ea5e9; /* ← 여기를 원하는 색상으로 변경 */
}
```

**개발 서버 실행:**
```bash
cd my-company-site
npm run dev
# → http://localhost:3000 에서 미리보기
```

### 파일 구조 한눈에 보기

```
my-company-site/
├── src/
│   ├── app/                # 페이지들
│   │   ├── page.tsx        # 홈페이지
│   │   ├── layout.tsx      # 공통 레이아웃 + SEO
│   │   ├── sitemap.ts      # 사이트맵 자동생성
│   │   └── robots.ts       # 검색봇 설정
│   ├── components/         # UI 조각들
│   │   ├── layout/         # 네비게이션, 푸터
│   │   ├── sections/       # 히어로, 소개, 서비스...
│   │   └── ui/             # 버튼, 카드, 애니메이션
│   └── lib/
│       └── data.ts         # ⭐ 모든 텍스트 내용 (여기만 수정!)
├── public/                 # 이미지, 폰트
├── CLAUDE.md               # Claude Code용 AI 지시서
├── .cursorrules            # Codex용 AI 지시서
├── .antigravity.md         # Antigravity용 AI 지시서
├── .env.local              # 환경변수 (비밀 설정)
└── .env.example            # 환경변수 예시
```

### SEO 설정 체크리스트

배포 후 검색엔진에 등록하세요:

- [ ] `.env.local`의 `NEXT_PUBLIC_SITE_URL` → 실제 도메인으로 변경
- [ ] `public/og-image.png` 추가 (1200×630px, 카카오톡 공유 미리보기)
- [ ] Google Search Console 등록 → `GOOGLE_SITE_VERIFICATION` 입력
- [ ] 네이버 서치어드바이저 등록 → `NAVER_SITE_VERIFICATION` 입력
- [ ] Vercel 환경변수에도 동일하게 입력
- [ ] 재배포 후 sitemap.xml 제출

### 전체 흐름 요약

```
1. GitHub에서 하네스 클론
       ↓
2. create-harness로 프로젝트 생성
   (GitHub 레포 + Vercel 연결 자동)
       ↓
3. .env.local 설정
   (Neon DB, 사이트 URL 등 — npm run setup이 자동 안내)
       ↓
4. npm run dev로 로컬에서 확인
       ↓
5. src/lib/data.ts 수정으로 콘텐츠 변경
   (AI 도구 활용)
       ↓
6. git push → Vercel 자동 배포
       ↓
7. 가비아 도메인 구매
   → Cloudflare 네임서버 연결
   → Vercel 도메인 추가
       ↓
8. Google/네이버 SEO 등록
       ↓
9. 완성! 🎉
```

---

## 추가 참고 자료

- **Next.js 공식 문서**: https://nextjs.org/docs
- **Tailwind CSS 문서**: https://tailwindcss.com/docs
- **Neon 문서**: https://neon.tech/docs
- **Framer Motion 문서**: https://www.framer.com/motion
- **Lucide 아이콘**: https://lucide.dev/icons
- **Google AI Studio**: https://aistudio.google.com
- **Google Search Console**: https://search.google.com/search-console
- **네이버 서치어드바이저**: https://searchadvisor.naver.com
