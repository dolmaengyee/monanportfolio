# 환경 설정 가이드

> AI 도구 하나만 켜고, 아래 프롬프트를 복붙하면 나머지는 AI가 다 해줘요.
> 설치, 가입, 클론 — 전부요.

---

## 먼저 이것만 이해해요

| 이름 | 역할 | 비유 |
|---|---|---|
| **Node.js** | 내 컴퓨터에서 JavaScript 실행 | 프로젝트를 돌리는 엔진 |
| **Git** | 코드 변경 이력 관리 | 저장 + 되돌리기 버튼 |
| **GitHub** | 코드 온라인 저장소 | 코드용 구글 드라이브 |
| **Vercel** | 자동 배포 서버 | push하면 자동으로 사이트 업데이트 |
| **Supabase** | 데이터베이스 | 테스트 결과, 폼 데이터 저장 |
| **Cloudflare** | 도메인 DNS 관리 | 도메인 ↔ 서버 연결 다리 |
| **가비아** | 도메인 구매 | 내 주소(도메인) 사는 곳 |

---

## 시작 전 — 계정 먼저 만들어요

AI가 진행하다가 막히는 걸 줄이려면 미리 만들어두는 게 좋아요.
**GitHub 하나만 만들면 Vercel · Supabase는 그걸로 바로 로그인돼요.**

| 순서 | 서비스 | 가입 방법 |
|---|---|---|
| 1 | **GitHub** | [github.com](https://github.com) → Sign up (이메일 또는 Google) |
| 2 | **Vercel** | [vercel.com](https://vercel.com) → Continue with GitHub |
| 3 | **Supabase** | [supabase.com](https://supabase.com) → Continue with GitHub |
| 4 | **Cloudflare** | [cloudflare.com](https://cloudflare.com) → Sign up (도메인 쓸 때만) |
| 5 | **가비아** | [gabia.com](https://gabia.com) → 회원가입 (도메인 살 때만) |

> **심리/성향 테스트(test) 타입을 쓸 경우:** Supabase 계정을 미리 만들어두세요.
> `node index.js` 실행 중간에 Supabase 프로젝트 생성 화면이 브라우저에 자동으로 열립니다.
> 그때 프로젝트를 만들고 돌아오면 됩니다.

---

## AI 도구 선택 (구독 중인 것 1개만)

---

## Claude Desktop 사용자

**설치:** [claude.ai/download](https://claude.ai/download) → 다운로드 → 로그인

**Claude Desktop을 열고, 아래 프롬프트를 붙여넣으세요.**

> **`[Mac 또는 Windows]` 부분만 본인 OS로 바꾸세요. 나머지는 그대로 두면 됩니다.**

```
나 웹사이트 만들려고 하는데 환경 세팅부터 도와줘.

지금 내 컴퓨터에 뭐가 설치되어 있는지 먼저 확인해줘.
없는 것들은 직접 설치해줘. 필요한 것들은:
- Node.js (nvm으로, LTS 버전)
- Git
- GitHub CLI (gh)
- Vercel CLI

그 다음에 아래 순서대로 진행해줘:
1. GitHub 로그인 (gh auth login)
2. Vercel 로그인 (vercel login)
3. 바탕화면에 harness 레포 클론
   git clone https://github.com/sana197111/y-harness.git
4. y-harness/create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

node index.js 실행 중에는 중간에 여러 번 멈추면서 질문이 나와.
브라우저가 자동으로 열릴 수 있고, 값을 직접 입력해야 할 수도 있어.
그때마다 뭘 해야 하는지 친절하게 설명해줘.

내 OS는 [Mac 또는 Windows]이야.
```

---

## Codex 사용자

**설치:** [codex.openai.com](https://codex.openai.com) → 다운로드 또는 웹 사용 → 로그인

**Codex를 열고, 아래 프롬프트를 붙여넣으세요.**

> **`[Mac 또는 Windows]` 부분만 본인 OS로 바꾸세요.**

```
나 웹사이트 만들려고 하는데 환경 세팅부터 도와줘.

지금 내 컴퓨터에 뭐가 설치되어 있는지 먼저 확인해줘.
없는 것들은 직접 설치해줘. 필요한 것들은:
- Node.js (nvm으로, LTS 버전)
- Git
- GitHub CLI (gh)
- Vercel CLI

그 다음에 아래 순서대로 진행해줘:
1. GitHub 로그인 (gh auth login)
2. Vercel 로그인 (vercel login)
3. 바탕화면에 harness 레포 클론
   git clone https://github.com/sana197111/y-harness.git
4. y-harness/create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

node index.js 실행 중에는 중간에 여러 번 멈추면서 질문이 나와.
브라우저가 자동으로 열릴 수 있고, 값을 직접 입력해야 할 수도 있어.
그때마다 뭘 해야 하는지 친절하게 설명해줘.

내 OS는 [Mac 또는 Windows]이야.
```

---

## Antigravity 사용자

**설치:** Google에서 "Antigravity AI" 검색 → 설치 → Google 계정으로 로그인

**Antigravity를 열고, 아래 프롬프트를 붙여넣으세요.**

> **`[Mac 또는 Windows]` 부분만 본인 OS로 바꾸세요.**

```
나 웹사이트 만들려고 하는데 환경 세팅부터 도와줘.

지금 내 컴퓨터에 뭐가 설치되어 있는지 먼저 확인해줘.
없는 것들은 직접 설치해줘. 필요한 것들은:
- Node.js (nvm으로, LTS 버전)
- Git
- GitHub CLI (gh)
- Vercel CLI

그 다음에 아래 순서대로 진행해줘:
1. GitHub 로그인 (gh auth login)
2. Vercel 로그인 (vercel login)
3. 바탕화면에 harness 레포 클론
   git clone https://github.com/sana197111/y-harness.git
4. y-harness/create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

node index.js 실행 중에는 중간에 여러 번 멈추면서 질문이 나와.
브라우저가 자동으로 열릴 수 있고, 값을 직접 입력해야 할 수도 있어.
그때마다 뭘 해야 하는지 친절하게 설명해줘.

내 OS는 [Mac 또는 Windows]이야.
```

---

## 세팅 완료 확인

AI가 모든 과정을 마치면 터미널에 **내 사이트 주소**가 출력됩니다.

```bash
# 로컬에서 확인
cd 프로젝트이름
npm run dev
# 브라우저에서 http://localhost:3000 열기
```

```bash
# 설치 확인
node -v           # v22.x.x 나오면 OK
git --version     # git version 2.x.x 나오면 OK
gh --version      # gh version 2.x.x 나오면 OK
vercel --version  # Vercel CLI x.x.x 나오면 OK
```

---

이제 다음 페이지에서 실제로 웹사이트를 만들어봐요!
