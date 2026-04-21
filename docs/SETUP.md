# 환경 설정 가이드

> AI 도구 하나만 켜고, 아래 프롬프트를 복붙하면 나머지는 AI가 다 해줘요.
> 설치, 가입, 클론 — 전부요.

---

## 먼저 이것만 이해해요

세팅 과정에서 설치하거나 가입하게 될 것들이에요.
왜 필요한지만 알고 있으면 AI가 시키는 대로 따라가면 됩니다.

| 이름 | 역할 | 비유 |
|---|---|---|
| **Node.js** | 내 컴퓨터에서 JavaScript 실행 | 프로젝트를 돌리는 엔진 |
| **Git** | 코드 변경 이력 관리 | 저장 + 되돌리기 버튼 |
| **GitHub** | 코드 온라인 저장소 | 코드용 구글 드라이브 |
| **Vercel** | 자동 배포 서버 | push하면 자동으로 사이트 업데이트 |
| **Supabase** | 데이터베이스 | 폼 데이터, 테스트 결과 저장 |
| **Cloudflare** | 도메인 DNS 관리 | 도메인 ↔ 서버 연결 다리 |
| **가비아** | 도메인 구매 | 내 주소(도메인) 사는 곳 |

---

## AI 도구 선택 (구독 중인 것 1개만)

---

## Claude Desktop 사용자

**설치:** [claude.ai/download](https://claude.ai/download) → 다운로드 → 로그인

**Claude Desktop을 열고, 아래 프롬프트를 그대로 붙여넣으세요.**

> **먼저 `[Mac / Windows]` 부분을 본인 OS로 바꾸세요. 이것만 바꾸면 됩니다.**

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
4. create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

중간에 뭔가 내가 직접 해야 하는 게 있으면 (브라우저 로그인, 계정 가입 등)
어디 가서 뭘 클릭해야 하는지 화면 캡처하거나 친절하게 알려줘.

내 OS는 [Mac / Windows 중 하나 입력]이야.
```

**Claude Desktop이 해주는 것:**
- 터미널을 직접 열어서 설치 명령어 실행
- 설치 확인 후 없는 것만 설치
- GitHub / Vercel 로그인 화면 안내
- harness 폴더 클론 및 CLI 실행까지

---

## Codex 사용자

**설치:** [codex.openai.com](https://codex.openai.com/) → 다운로드 또는 웹 사용 → 로그인

**Codex를 열고, 아래 프롬프트를 그대로 붙여넣으세요.**

> **먼저 `[Mac / Windows]` 부분을 본인 OS로 바꾸세요. 이것만 바꾸면 됩니다.**

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
4. create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

중간에 뭔가 내가 직접 해야 하는 게 있으면 (브라우저 로그인, 계정 가입 등)
어디 가서 뭘 클릭해야 하는지 친절하게 알려줘.

내 OS는 [Mac / Windows 중 하나 입력]이야.
```

---

## Antigravity 사용자

**설치:** Google에서 "Antigravity AI" 검색 → 설치 → Google 계정으로 로그인

**Antigravity를 열고, 아래 프롬프트를 그대로 붙여넣으세요.**

> **먼저 `[Mac / Windows]` 부분을 본인 OS로 바꾸세요. 이것만 바꾸면 됩니다.**

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
4. create-harness 폴더로 이동해서 npm install 하고 node index.js 실행

중간에 뭔가 내가 직접 해야 하는 게 있으면 (브라우저 로그인, 계정 가입 등)
어디 가서 뭘 클릭해야 하는지 친절하게 알려줘.

내 OS는 [Mac / Windows 중 하나 입력]이야.
```

---

## 계정 가입은 이 순서로

AI가 진행하다가 "이건 직접 가입해야 해요"라고 알려줄 거예요.
미리 만들어두면 더 빠르게 진행할 수 있어요.

1. **GitHub** — [github.com](https://github.com/) → Sign up (이메일 또는 Google)
2. **Vercel** — [vercel.com](https://vercel.com/) → Continue with GitHub *(별도 가입 없음)*
3. **Supabase** — [supabase.com](https://supabase.com/) → Continue with GitHub *(별도 가입 없음)*
   > `node index.js` 실행 중 Supabase 안내가 나올 때 만들면 돼요. 미리 만들어두면 더 빠릅니다.
4. **Cloudflare** — [cloudflare.com](https://cloudflare.com/) → Sign up (이메일)
5. **가비아** — [gabia.com](https://gabia.com/) → 회원가입 (도메인 살 때만 필요)

> GitHub 계정 하나만 만들면 Vercel · Supabase는 그걸로 바로 로그인 돼요.

---

## 세팅 완료 확인

AI가 모든 과정을 마쳤다면, 터미널에서 아래를 실행해서 확인해요.

```bash
node -v           # v22.x.x 나오면 OK
git --version     # git version 2.x.x 나오면 OK
gh --version      # gh version 2.x.x 나오면 OK
vercel --version  # Vercel CLI x.x.x 나오면 OK
```

이제 다음 페이지에서 실제로 웹사이트를 만들어봐요!
