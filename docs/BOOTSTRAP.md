# BOOTSTRAP.md — AI 도구용 설치 런북

> 이 문서는 **사람이 아니라 AI 도구(Claude Code, Codex, Antigravity 등)가 읽고 실행하는 문서**입니다.
> 사용자가 "이 문서를 읽고 진행해줘"라고 하면, 아래 절차를 순서대로 수행하세요.
> 사람용 설명서는 [SETUP.md](./SETUP.md), 개념 설명은 [CONCEPTS.md](./CONCEPTS.md)에 있습니다.

## AI 행동 원칙

1. **사용자는 개발을 전혀 모른다고 가정하세요.** 전문 용어를 쓰면 바로 한 줄 설명을 덧붙이세요.
2. **OS를 사용자에게 묻지 말고 직접 감지하세요.** (아래 0단계)
3. 명령은 **한 번에 하나씩** 실행하고, 각 단계의 확인 명령으로 성공을 검증한 뒤 다음으로 넘어가세요.
4. 에러가 나면 에러 전문을 읽고 아래 **에러별 복구** 표를 먼저 확인하세요. 표에 없으면 에러 메시지를 쉬운 말로 요약해서 사용자에게 알려주고 해결을 시도하세요.
5. **로그인이 필요한 단계**(GitHub, Vercel)에서는 브라우저 창이 열린다는 것, 그리고 거기서 뭘 눌러야 하는지를 **미리** 알려주세요. 사용자가 로그인을 마칠 때까지 기다리세요.
6. 같은 에러로 3번 실패하면 멈추고, 상황을 정리해 사용자에게 알려주세요.

## 0단계: OS 감지

터미널에서 실행해 보고 결과로 판단하세요:

- `uname -s` 실행 → `Darwin`이면 **Mac**, `Linux`면 **Linux**
- `uname`이 실패하거나 PowerShell 환경이면 → **Windows** (`$env:OS`가 `Windows_NT`)

이후 모든 단계에서 감지한 OS에 맞는 명령만 사용하세요.

## 1단계: 필수 도구 확인 및 설치

### 확인

```bash
node -v    # v20 이상이면 통과
git --version
```

### 없을 때 설치

**Mac:**
```bash
# Node.js (nvm 사용)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# 설치 후 새 터미널을 열거나: source ~/.zshrc
nvm install --lts
node -v   # v22.x.x 확인

# Git: git --version 입력 시 설치 팝업이 뜨면 사용자에게
# "화면에 뜬 팝업에서 '설치'를 눌러주세요"라고 안내하고 기다리세요.
```

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
# winget이 없으면: https://nodejs.org 와 https://git-scm.com 에서 LTS 다운로드 안내
# 설치 후 반드시 터미널(PowerShell)을 새로 열어야 명령이 인식됩니다.
```

**Linux:**
```bash
sudo apt update && sudo apt install -y git curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts
```

## 2단계: 하네스 받기 + 프로젝트 생성

```bash
cd ~/Desktop
git clone https://github.com/y-angel-intelligence/y-harness.git
cd y-harness/create-harness
npm install
node index.js
```

`node index.js`는 질문을 딱 2개만 합니다:
1. 뭘 만들지 (랜딩 / 회사 / 테스트) — 사용자에게 물어보고 대신 선택하세요
2. 프로젝트 이름 — 영문 소문자와 하이픈만 (예: `my-test-site`)

끝나면 프로젝트 폴더가 만들어지고, 브라우저에서 사이트를 바로 열어볼 수 있습니다 (`npm run dev` → http://localhost:3000).

> CLI가 "잠깐! 시작하기 전에 준비가 필요해요"라고 출력하면, 그 안내대로 해결한 뒤 다시 실행하세요.

## 3단계: 커스터마이징 안내

프로젝트 폴더 안의 `CLAUDE.md`(Claude), `.cursorrules`(Codex/Cursor), `.antigravity.md`(Antigravity)가 AI 지시 파일입니다. 사용자에게 이렇게 안내하세요:

> "이제 이 폴더를 AI 도구로 열고, 만들고 싶은 사이트를 자유롭게 설명하면 돼요. AI가 무드·구성·폰트를 역질문으로 확인한 뒤 디자인부터 만들어줍니다."

## 4단계: 배포/DB/도메인 — `npm run setup`

배포, DB, 관리자 비밀번호, 도메인은 프로젝트 폴더에서 `npm run setup`을 실행하면 메뉴로 진행됩니다. AI는 각 메뉴에서 아래 **로그인 안내**를 미리 해주세요.

### 로그인 안내 (중요 — 사용자가 가장 헤매는 부분)

**GitHub CLI (`gh auth login`):**
- 터미널에 선택지가 떠요 → `GitHub.com` → `HTTPS` → `Login with a web browser` 순으로 선택
- 터미널에 뜬 **8자리 코드**를 복사해두라고 안내
- 브라우저가 열리면: GitHub 로그인 → 코드 붙여넣기 → `Authorize` 초록 버튼 클릭
- GitHub 계정이 없으면: https://github.com/signup 에서 Google 계정으로 가입 안내

**Vercel CLI (`vercel login`):**
- "Continue with GitHub"를 선택하라고 안내 (GitHub 계정으로 바로 로그인됨)
- 브라우저가 열리면 GitHub 로그인 → `Authorize Vercel` 클릭
- 성공하면 터미널에 "Congratulations!"가 표시됨

**DB (Neon):**
- 별도 가입 불필요. `npm run setup`의 DB 메뉴가 `vercel integration add neon`으로 Vercel 안에서 무료 DB를 만들고, `DATABASE_URL` 환경변수가 자동 주입됩니다. 테이블도 자동 생성됩니다.
- CLI가 실패하면 안내: Vercel 대시보드 → 프로젝트 → Storage 탭 → Create Database → Neon(무료) → Connect

## 에러별 복구

| 증상 | 원인 | 해결 |
|---|---|---|
| `command not found: node` / `npm` | Node 미설치 또는 터미널 재시작 안 함 | 1단계 설치 후 **새 터미널**에서 재시도 |
| `command not found: nvm` | 셸 설정 미반영 | `source ~/.zshrc` (Mac) 또는 새 터미널 |
| `git: command not found` | Git 미설치 | 1단계 Git 설치 |
| `EACCES` / `permission denied` (npm) | 권한 문제 | `sudo` 쓰지 말 것. nvm으로 Node 재설치가 정석 |
| `Port 3000 is in use` | 이전 dev 서버 실행 중 | 기존 터미널에서 Ctrl+C, 또는 뜨는 안내대로 다른 포트 사용 |
| `relation "..." does not exist` | DB 테이블 미생성 | `npm run setup` → DB 메뉴 재실행 (테이블 자동 생성) |
| 저장/문의 기능이 조용히 안 됨 | `DATABASE_URL` 없음 | 정상 동작임(DB는 선택). 필요하면 `npm run setup` → DB 메뉴 |
| 관리자 페이지 로그인 401 | `ADMIN_PASSWORD` 미설정 | `npm run setup` → 관리자 비밀번호 메뉴 |
| Windows에서 `winget` 없음 | 구버전 Windows | https://nodejs.org, https://git-scm.com 수동 설치 안내 |
| `실행할 수 없습니다... 스크립트` (PowerShell) | 실행 정책 | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 후 재시도 |

## 완료 기준

- [ ] `node -v`가 v20 이상
- [ ] 프로젝트 폴더가 생성되고 `npm run dev`로 localhost:3000에 사이트가 뜸
- [ ] 사용자가 "AI에게 사이트 설명 → 역질문 → 제작" 다음 단계를 이해함
- [ ] (선택) 배포까지 원하면 `npm run setup`으로 GitHub/Vercel 로그인까지 완료
