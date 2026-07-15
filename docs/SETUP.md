# 환경 설정 가이드

> AI 도구 하나만 켜고, 아래 프롬프트를 복붙하세요.
> 질문은 딱 2개 — "뭘 만들지" + "이름은 뭘로 할지"
> 브라우저에 내 사이트가 바로 떠요.

---

## 어떻게 작동하나요?

**1단계 — 사이트 만들기** (기본, 질문 2개)
- 뭘 만들고 싶은지 선택 (랜딩/회사/테스트)
- 프로젝트 이름 입력
- 자동으로: 파일 복사 → 패키지 설치 → Git 세팅 → 브라우저에 사이트 띄우기

**2단계 — 추가 기능** (필요할 때만, `npm run setup`)
- 인터넷에 올리기 (GitHub + Vercel)
- 데이터 저장소 (Neon — Vercel 안에서 무료 생성)
- 관리자 비밀번호
- 내 도메인 연결

두 단계가 **분리**되어 있어요. 일단 1단계로 돌아가는 걸 보고, 나중에 필요한 것만 2단계에서 추가하면 돼요.

---

## 먼저 이것만 이해해요

| 이름 | 역할 | 언제 필요? |
|---|---|---|
| **Node.js** | 내 컴퓨터에서 JavaScript 실행 | 처음부터 (필수) |
| **Git** | 코드 변경 이력 관리 | 처음부터 (필수) |
| **GitHub** | 코드 온라인 저장소 | 2단계: 배포할 때 |
| **Vercel** | 자동 배포 서버 | 2단계: 배포할 때 |
| **Neon** | 데이터베이스 (Vercel 마켓플레이스) | 2단계: 저장 기능 필요할 때 |
| **Cloudflare** | 도메인 DNS 관리 | 2단계: 내 도메인 쓸 때 |
| **가비아** | 도메인 구매 | 2단계: 내 도메인 쓸 때 |

**핵심:** 처음엔 Node.js + Git만 있으면 돼요. 나머지는 필요할 때 `npm run setup`이 하나씩 안내해줘요.

---

## 계정은 나중에 만들어도 돼요

**지금 당장 필요한 것은 없어요.** 1단계는 인터넷 없이도 완료돼요.

2단계에서 각 기능을 선택하면 그때그때 "이 계정이 필요해요"라고 안내하고 브라우저를 자동으로 열어줘요. **GitHub 하나만 있으면** Vercel은 그걸로 바로 로그인되고, DB(Neon)는 Vercel 안에서 만들기 때문에 별도 가입이 없어요.

| 서비스 | 주소 | 언제? |
|---|---|---|
| GitHub | [github.com](https://github.com) | 배포 기능 쓸 때 |
| Vercel | [vercel.com](https://vercel.com) | 배포 + DB 쓸 때 (GitHub으로 로그인) |

---

## AI 도구 선택 (구독 중인 것 1개만)

### 복붙 프롬프트 (모든 AI 도구 공통)

AI 도구를 열고 **아래 한 줄만 그대로 붙여넣으세요.** OS 확인, 설치, 실행까지 AI가 알아서 진행해요.

```
나 웹사이트 만들려고 해. 코딩은 전혀 몰라.
https://raw.githubusercontent.com/y-angel-intelligence/y-harness/main/docs/BOOTSTRAP.md
이 문서를 읽고 순서대로 진행해줘. 내 OS도 직접 확인해서 맞는 방법으로 해줘.
```

> AI가 내 컴퓨터(OS)를 직접 감지하고, Node.js/Git이 없으면 설치를 도와주고,
> GitHub/Vercel 로그인이 필요한 순간엔 "브라우저에서 뭘 눌러야 하는지"까지 안내해줘요.

**도구별 설치:**

| AI 구독 | 앱 | 설치 |
|---|---|---|
| Claude | Claude Desktop | [claude.ai/download](https://claude.ai/download) → 다운로드 → 로그인 |
| ChatGPT | Codex | [codex.openai.com](https://codex.openai.com) → 다운로드 또는 웹 → 로그인 |
| Gemini | Antigravity | Google에서 "Antigravity AI" 검색 → 설치 → Google 계정 로그인 |

<details>
<summary>AI가 URL을 못 읽는 환경이라면 (전체 프롬프트 펼치기)</summary>

```
나 웹사이트 만들려고 하는데 환경 세팅부터 도와줘. 코딩은 전혀 몰라.
내 OS(Mac/Windows)는 직접 확인해서 맞는 방법으로 진행해줘.

내 컴퓨터에 아래 것들이 설치되어 있는지 확인하고, 없으면 설치해줘:
- Node.js (LTS 버전)
- Git

다 설치됐으면:
1. 바탕화면에 y-harness 레포 클론
   git clone https://github.com/y-angel-intelligence/y-harness.git
2. y-harness/create-harness 폴더로 이동
3. npm install 실행 (1회만)
4. node index.js 실행

node index.js 에서는 질문 2개만 나와 (뭘 만들지 + 프로젝트 이름).
끝나면 브라우저에 내 사이트가 자동으로 떠.

나중에 배포/DB가 필요하면 프로젝트 폴더에서 npm run setup 실행.
GitHub이나 Vercel 로그인이 필요한 단계에서는 브라우저에서
뭘 눌러야 하는지 미리 알려주고 기다려줘.
```

</details>

---

## 1단계가 끝나면

터미널에 이런 메시지가 뜹니다:

```
  내 랜딩 페이지가 준비됐어요!

  위치: /Users/이름/Desktop/my-landing

  지금 할 수 있는 것:
    cd my-landing
    npm run dev    (브라우저에서 바로 확인)

  나중에 더 필요하면 (필요할 때만):
    npm run setup  (메뉴에서 선택)
      · 인터넷에 올리기 (GitHub + Vercel)
      · 내 도메인 연결 안내

  지금 바로 브라우저에서 사이트를 열어볼까요? (Y/n)
```

**Y 누르면 브라우저가 자동으로 열려요** (`http://localhost:3000`)

사이트를 끄려면 터미널에서 `Ctrl + C`

---

## 2단계 — 필요할 때만

프로젝트 폴더로 가서:

```bash
cd 내프로젝트이름
npm run setup
```

그러면 메뉴가 뜨고, 각 옵션마다 **이게 뭐고, 왜 필요하고, 얼마나 걸리는지** 먼저 알려줘요. 원하는 것만 골라서 하면 됩니다.

```
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  my-test-site  ·  성향 테스트
  GitHub 연결 안 됨  ·  Vercel 연결 안 됨
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  뭘 도와드릴까요?

  [1] 인터넷에 올리기
      GitHub + Vercel로 전 세계에 공개 (무료, 5분)

  [2] 데이터 저장소 설정
      Neon 무료 DB (Vercel 연동) — 테스트 결과 저장, 환경변수 자동 주입

  [3] 관리자 비밀번호 설정
      /admin 페이지 접속 비밀번호

  [4] 내 도메인 연결 안내
      가비아 → Cloudflare → Vercel 연결 방법

  [5] 나가기

  선택:
```

**몇 번이고 다시 실행해도 돼요.** 한 번에 다 안 해도 되고, 필요해질 때마다 돌아와서 하면 됩니다.

---

## 설치 확인

```bash
node -v       # v22.x.x 나오면 OK
git --version # git version 2.x.x 나오면 OK
```

**추가로 2단계에서 필요한 것** (그때 AI가 설치 안내해줘요):
- `gh` (GitHub CLI) — 배포 기능 쓸 때
- `vercel` (Vercel CLI) — 배포 기능 쓸 때
