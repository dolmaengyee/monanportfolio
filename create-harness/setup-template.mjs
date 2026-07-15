#!/usr/bin/env node

/**
 * Harness Setup Menu (Stage 2)
 * Run with: npm run setup
 *
 * Uses only Node.js built-ins — no extra dependencies required.
 */

import { execSync, spawn } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import readline from 'node:readline'

// ─── Color helpers ────────────────────────────────────────────────────────────
const color = process.stdout.isTTY && process.env.TERM !== 'dumb'
const w = (code) => (s) => color ? `\x1b[${code}m${s}\x1b[0m` : String(s)
const c = {
  gray: w(90), red: w(31), green: w(32), yellow: w(33), cyan: w(36),
  bold: w(1), dim: w(2), cyanBold: (s) => w(1)(w(36)(s)),
}

// ─── readline ─────────────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((r) => rl.question(q, r))

async function askConfirm(msg, defYes = true) {
  const hint = defYes ? '(Y/n)' : '(y/N)'
  const a = (await ask(`  ${msg} ${c.gray(hint)}: `)).trim().toLowerCase()
  if (!a) return defYes
  return a === 'y' || a === 'yes' || a === 'ㅇ'
}

async function askText(msg, hint = '') {
  const h = hint ? c.gray(` ${hint}`) : ''
  return (await ask(`  ${msg}${h}: `)).trim()
}

async function askPassword(msg) {
  console.log(c.dim('  (비밀번호가 화면에 보여요. 주변을 확인하세요)'))
  return (await ask(`  ${msg}: `)).trim()
}

// ─── System helpers ───────────────────────────────────────────────────────────
function cmdExists(cmd) {
  try {
    execSync(process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`, { stdio: 'pipe' })
    return true
  } catch { return false }
}

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'inherit', ...opts })
}

function runSilent(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', ...opts }).toString()
}

function openBrowser(url) {
  try {
    const cmd = process.platform === 'win32' ? `start "" "${url}"`
              : process.platform === 'darwin' ? `open "${url}"`
              : `xdg-open "${url}"`
    execSync(cmd, { stdio: 'ignore' })
  } catch {}
}

function addVercelEnv(key, value, env = 'production') {
  return new Promise((resolve) => {
    const child = spawn('vercel', ['env', 'add', key, env], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    })
    child.stdin.write(value + '\n')
    child.stdin.end()
    child.on('close', (code) => resolve(code === 0))
  })
}

function updateEnvLocal(projectDir, key, value) {
  const envPath = join(projectDir, '.env.local')
  let content = existsSync(envPath) ? readFileSync(envPath, 'utf8') : ''
  const regex = new RegExp(`^${key}=.*$`, 'm')
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`)
  } else {
    content += (content && !content.endsWith('\n') ? '\n' : '') + `${key}=${value}\n`
  }
  writeFileSync(envPath, content)
}

// Read a single key from .env.local (quotes stripped). Returns null if absent.
function readEnvLocal(projectDir, key) {
  const envPath = join(projectDir, '.env.local')
  if (!existsSync(envPath)) return null
  const content = readFileSync(envPath, 'utf8')
  const m = content.match(new RegExp(`^${key}=(.*)$`, 'm'))
  if (!m) return null
  return m[1].trim().replace(/^["']|["']$/g, '')
}

// Push an env var to every Vercel environment. Returns true only if all succeed.
async function addVercelEnvAll(key, value, envs = ['production', 'preview', 'development']) {
  let ok = true
  for (const env of envs) {
    if (!(await addVercelEnv(key, value, env))) ok = false
  }
  return ok
}

// ─── Project info ─────────────────────────────────────────────────────────────
function getProjectInfo(projectDir) {
  const pkg = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'))
  const hasRemote = (() => {
    try {
      runSilent('git remote get-url origin', { cwd: projectDir })
      return true
    } catch { return false }
  })()
  return {
    name: pkg.name,
    type: pkg.harness?.type || 'landing',
    vercelLinked: existsSync(join(projectDir, '.vercel', 'project.json')),
    githubLinked: hasRemote,
  }
}

function typeLabel(t) {
  return ({ landing: '랜딩 페이지', company: '회사 홈페이지', test: '성향 테스트' })[t] || t
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
async function showMenu(info) {
  console.log('')
  console.log(c.bold('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log('  ' + c.bold(info.name) + c.gray(`  ·  ${typeLabel(info.type)}`))

  const badges = []
  badges.push(info.githubLinked ? c.green('GitHub 연결됨') : c.gray('GitHub 연결 안 됨'))
  badges.push(info.vercelLinked ? c.green('Vercel 연결됨') : c.gray('Vercel 연결 안 됨'))
  console.log('  ' + badges.join(c.gray('  ·  ')))
  console.log(c.bold('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))

  console.log(c.bold('\n  뭘 도와드릴까요?\n'))

  const options = []
  let n = 1

  options.push({
    key: String(n++), id: 'deploy',
    label: info.vercelLinked ? '인터넷 재배포' : '인터넷에 올리기',
    desc: info.vercelLinked
      ? '코드 변경사항을 다시 배포합니다'
      : 'GitHub + Vercel로 전 세계에 공개 (무료, 5분)',
  })

  if (info.type !== 'landing') {
    options.push({
      key: String(n++), id: 'database',
      label: '데이터 저장소 설정',
      desc: info.type === 'test'
        ? 'Neon 무료 DB (Vercel 연동) — 테스트 결과 저장'
        : 'Neon 무료 DB (Vercel 연동) — 문의 내용 저장',
    })
  }

  if (info.type === 'test') {
    options.push({
      key: String(n++), id: 'admin_password',
      label: '관리자 비밀번호 설정',
      desc: '/admin 페이지 접속 비밀번호',
    })
  }

  options.push({
    key: String(n++), id: 'domain',
    label: '내 도메인 연결 안내',
    desc: '가비아 → Cloudflare → Vercel 연결 방법',
  })

  options.push({ key: String(n++), id: 'exit', label: '나가기', desc: '' })

  for (const o of options) {
    console.log(`  ${c.cyan(`[${o.key}]`)} ${c.bold(o.label)}`)
    if (o.desc) console.log(`      ${c.gray(o.desc)}`)
  }

  const answer = await ask(c.cyan('\n  선택: '))
  return options.find((o) => o.key === answer.trim())?.id
}

// ─── Deploy flow ──────────────────────────────────────────────────────────────
async function deployFlow(projectDir, info) {
  console.log(c.cyanBold('\n  ━━━ 인터넷에 올리기 ━━━\n'))
  console.log('  지금 내 컴퓨터에만 있는 사이트를')
  console.log('  전 세계 누구나 볼 수 있게 만들어요.\n')
  console.log(c.bold('  필요한 것 (둘 다 무료):'))
  console.log('    - GitHub 계정  (코드 저장소)')
  console.log('    - Vercel 계정  (자동 배포 서비스)')
  console.log(c.dim('    → GitHub 계정으로 Vercel도 바로 로그인돼요\n'))
  console.log(c.bold('  작동 방식:'))
  console.log('    1. 코드를 GitHub에 올려요')
  console.log('    2. Vercel이 코드를 가져가서 인터넷에 띄워요')
  console.log('    3. my-site.vercel.app 같은 주소가 생겨요')
  console.log('    4. 다음에 코드를 수정하면 자동으로 재배포돼요\n')
  console.log(c.bold('  예상 시간: 약 5분\n'))

  if (!(await askConfirm('계속할까요?'))) return

  // Check tools
  if (!cmdExists('gh')) {
    console.log(c.yellow('\n  GitHub CLI가 필요해요.'))
    console.log('  설치: ' + c.cyan('https://cli.github.com'))
    console.log(c.gray('  설치 후 "gh auth login" 실행, 그 다음 이 메뉴를 다시 열어주세요.\n'))
    return
  }
  if (!cmdExists('vercel')) {
    console.log(c.yellow('\n  Vercel CLI가 필요해요.'))
    console.log('  터미널에서: ' + c.cyan('npm i -g vercel'))
    console.log(c.gray('  설치 후 "vercel login" 실행, 그 다음 이 메뉴를 다시 열어주세요.\n'))
    return
  }

  // GitHub auth check
  try {
    runSilent('gh auth status')
  } catch {
    console.log(c.yellow('\n  GitHub 로그인이 필요해요.'))
    console.log('  터미널에서 실행: ' + c.cyan('gh auth login'))
    console.log(c.gray('  (브라우저가 열리면서 로그인 화면이 나와요)\n'))
    return
  }

  // GitHub repo create
  if (!info.githubLinked) {
    const pkg = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'))
    const defaultName = pkg.name

    console.log(c.bold('\n  GitHub 레포 생성\n'))
    const repoName = (await askText(`레포 이름`, `(그냥 Enter 누르면: ${defaultName})`)) || defaultName
    const isPublic = await askConfirm('공개 레포로 만들까요? (아니면 비공개)', false)
    const visibility = isPublic ? '--public' : '--private'

    console.log(c.gray('  레포 생성 중...'))
    try {
      run(`gh repo create ${repoName} ${visibility} --source=. --remote=origin --push`, { cwd: projectDir })
      console.log(c.green('\n  ✓ GitHub 레포 생성 완료'))
      info.githubLinked = true
    } catch {
      console.log(c.yellow('\n  레포 생성 실패. 이미 있는 이름일 수 있어요.\n'))
      return
    }
  } else {
    console.log(c.gray('\n  GitHub 연결 확인됨. 최신 코드 push 중...'))
    try {
      run('git push', { cwd: projectDir, stdio: 'pipe' })
    } catch {}
  }

  // Vercel auth check
  try {
    runSilent('vercel whoami')
  } catch {
    console.log(c.yellow('\n  Vercel 로그인이 필요해요.'))
    console.log('  터미널에서 실행: ' + c.cyan('vercel login'))
    console.log(c.gray('  (이메일로 로그인 링크가 와요)\n'))
    return
  }

  // Vercel link
  if (!info.vercelLinked) {
    console.log(c.bold('\n  Vercel 프로젝트 연결'))
    console.log(c.gray('  (질문이 몇 개 나와요. 대부분 그냥 Enter 눌러도 됩니다)\n'))
    try {
      const child = spawn('vercel', ['link', '--yes'], { cwd: projectDir, stdio: 'inherit', shell: true })
      await new Promise((r) => child.on('close', r))
      info.vercelLinked = existsSync(join(projectDir, '.vercel', 'project.json'))
      if (info.vercelLinked) console.log(c.green('\n  ✓ Vercel 연결 완료'))
    } catch {
      console.log(c.yellow('\n  Vercel 연결 실패'))
      return
    }
  }

  // Deploy
  console.log(c.bold('\n  배포 중... (보통 1~2분)\n'))
  try {
    const output = runSilent('vercel --prod --yes', { cwd: projectDir })
    const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/)
    const url = urlMatch ? urlMatch[0] : null
    if (url) {
      console.log(c.green('  ✓ 배포 완료!'))
      console.log(c.cyanBold(`\n  내 사이트 주소: ${url}\n`))
      if (await askConfirm('브라우저에서 열어볼까요?')) {
        openBrowser(url)
      }
    } else {
      console.log(c.green('  ✓ 배포 완료 — Vercel 대시보드에서 URL 확인하세요\n'))
    }
  } catch {
    console.log(c.yellow('  배포 실패 — Vercel 대시보드에서 로그를 확인하세요'))
    console.log(c.gray('  환경변수가 없으면 배포가 실패할 수 있어요.'))
    console.log(c.gray('  메뉴에서 "데이터 저장소 설정"을 먼저 해보세요.\n'))
  }
}

// ─── Neon database flow ───────────────────────────────────────────────────────

// CREATE TABLE statement for the current template. Landing has no DB → null.
function tableSql(type) {
  if (type === 'test') {
    return `CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  final_type text NOT NULL,
  scores jsonb,
  ranking jsonb,
  answers jsonb,
  consented_at timestamptz,
  created_at timestamptz DEFAULT now()
);`
  }
  if (type === 'company') {
    return `CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);`
  }
  return null
}

function printTableSql(type) {
  const sql = tableSql(type)
  if (!sql) return
  console.log(c.gray('  ' + '─'.repeat(64)))
  sql.split('\n').forEach((l) => console.log(c.cyan('  ' + l)))
  console.log(c.gray('  ' + '─'.repeat(64)) + '\n')
}

function printNeonDashboardGuide() {
  console.log('    Vercel 대시보드 → 프로젝트 → ' + c.cyan('Storage') + ' 탭')
  console.log('    → ' + c.cyan('Create Database') + ' → ' + c.cyan('Neon(무료)') + ' → ' + c.cyan('Connect'))
  console.log(c.dim('    연동하면 DATABASE_URL이 배포 환경변수에 자동 주입돼요.'))
}

// Create the template table over the Neon HTTP driver, imported from the
// generated project's own node_modules. Returns false on any failure.
async function createTable(dbUrl, sqlText) {
  let neon
  try {
    ({ neon } = await import('@neondatabase/serverless'))
  } catch {
    console.log(c.dim('  (@neondatabase/serverless 패키지를 찾지 못했어요. npm install 후 다시 시도)'))
    return false
  }
  try {
    const sql = neon(dbUrl)
    await sql.query(sqlText)
    return true
  } catch (e) {
    console.log(c.dim('  ' + (e?.message || String(e))))
    return false
  }
}

async function databaseFlow(projectDir, info) {
  console.log(c.cyanBold('\n  ━━━ 데이터 저장소 설정 (Neon) ━━━\n'))
  console.log('  Neon은 Vercel 마켓플레이스에서 무료로 붙일 수 있는')
  console.log('  서버리스 PostgreSQL 데이터베이스예요.')
  console.log(
    info.type === 'test'
      ? '  테스트 결과가 저장되고, 관리자 페이지에서 볼 수 있어요.\n'
      : '  문의 내용이 저장되고, 관리자 페이지에서 볼 수 있어요.\n'
  )
  console.log(c.bold('  가장 큰 장점:'))
  console.log('    연동하면 ' + c.cyan('DATABASE_URL') + '이 배포 환경변수에 자동 주입돼요.')
  console.log(c.dim('    (API 키를 직접 복사/붙여넣기 할 필요가 없어요)\n'))
  console.log(c.bold('  작동 방식:'))
  console.log('    1. Vercel에 Neon 데이터베이스를 붙여요 (무료)')
  console.log('    2. DATABASE_URL을 내 컴퓨터로 가져와요')
  console.log('    3. 테이블을 자동으로 만들어요')
  console.log('    4. 재배포하면 바로 저장이 동작해요\n')
  console.log(c.bold('  예상 시간: 3~5분\n'))

  if (!(await askConfirm('계속할까요?'))) return

  // ── Precondition: Vercel CLI + login + linked project ──────────────────────
  if (!cmdExists('vercel')) {
    console.log(c.yellow('\n  Vercel CLI가 필요해요.'))
    console.log('  터미널에서: ' + c.cyan('npm i -g vercel'))
    console.log(c.gray('  설치 후 "vercel login" 실행, 그 다음 이 메뉴를 다시 열어주세요.\n'))
    return
  }
  try {
    runSilent('vercel whoami')
  } catch {
    console.log(c.yellow('\n  Vercel 로그인이 필요해요.'))
    console.log('  터미널에서 실행: ' + c.cyan('vercel login') + '\n')
    return
  }
  if (!info.vercelLinked) {
    console.log(c.bold('\n  먼저 Vercel 프로젝트에 연결할게요.'))
    console.log(c.gray('  (질문이 몇 개 나와요. 대부분 그냥 Enter 눌러도 됩니다)\n'))
    try {
      const child = spawn('vercel', ['link', '--yes'], { cwd: projectDir, stdio: 'inherit', shell: true })
      await new Promise((r) => child.on('close', r))
      info.vercelLinked = existsSync(join(projectDir, '.vercel', 'project.json'))
    } catch {}
    if (!info.vercelLinked) {
      console.log(c.yellow('\n  Vercel 연결이 안 됐어요. 먼저 메뉴에서 "인터넷에 올리기"를 진행해주세요.\n'))
      return
    }
    console.log(c.green('  ✓ Vercel 연결 완료'))
  }

  // ── Step 1: attach Neon from the Vercel Marketplace ────────────────────────
  console.log(c.bold('\n  1단계 — Neon 데이터베이스 붙이기\n'))
  console.log('  아래 명령이 Vercel 마켓플레이스에서 Neon을 붙여줍니다.')
  console.log(c.dim('  (플랜/이름을 물어보면 무료(Free)와 기본값으로 진행하세요)\n'))

  let integrationOk = false
  try {
    run('vercel integration add neon', { cwd: projectDir })
    integrationOk = true
  } catch {
    integrationOk = false
  }

  // Always show the dashboard fallback for reference.
  console.log(c.bold('\n  대시보드에서 직접 붙이는 방법 (안 될 때):\n'))
  printNeonDashboardGuide()

  if (!integrationOk) {
    if (!(await askConfirm('\n  대시보드에서 Neon 연결을 완료했어요'))) return
  }

  // ── Step 2: pull DATABASE_URL into .env.local ──────────────────────────────
  console.log(c.bold('\n  2단계 — DATABASE_URL 가져오기\n'))
  console.log(c.gray('  vercel env pull .env.local 실행 중...'))
  try {
    runSilent('vercel env pull .env.local --yes', { cwd: projectDir })
  } catch {
    try {
      runSilent('vercel env pull .env.local', { cwd: projectDir })
    } catch {}
  }

  const dbUrl = readEnvLocal(projectDir, 'DATABASE_URL')
  if (!dbUrl) {
    console.log(c.yellow('\n  DATABASE_URL을 아직 찾지 못했어요.'))
    console.log(c.gray('  Neon 연결이 끝난 뒤 이 메뉴를 다시 실행하거나,'))
    console.log(c.gray('  터미널에서 ' + c.cyan('vercel env pull .env.local') + ' 을 직접 실행해보세요.\n'))
    console.log(c.bold('  테이블은 아래 SQL로 직접 만들 수 있어요'))
    console.log(c.gray('  (Vercel → Storage → Neon → Open in Neon → SQL Editor):\n'))
    printTableSql(info.type)
    return
  }
  console.log(c.green('  ✓ DATABASE_URL 가져오기 완료'))

  // ── Step 3: auto-create the table ──────────────────────────────────────────
  const sqlText = tableSql(info.type)
  if (!sqlText) {
    console.log(c.gray('\n  이 템플릿은 데이터베이스가 필요 없어요.\n'))
    return
  }

  console.log(c.bold('\n  3단계 — 테이블 만들기\n'))
  console.log(c.gray('  Neon에 테이블 생성 중...'))
  const created = await createTable(dbUrl, sqlText)
  if (created) {
    console.log(c.green('  ✓ 테이블 생성 완료'))
    console.log(c.green('\n  데이터베이스 설정 완료!'))
    console.log(c.gray('  재배포하면 저장 기능이 동작해요. (메뉴 → 인터넷 재배포)\n'))
  } else {
    console.log(c.yellow('\n  자동 생성에 실패했어요. Neon 콘솔에서 직접 실행해주세요:'))
    console.log(c.gray('  Vercel → Storage → Neon → Open in Neon → SQL Editor\n'))
    printTableSql(info.type)
  }
}

// ─── Admin password flow ──────────────────────────────────────────────────────
async function adminPasswordFlow(projectDir, info) {
  console.log(c.cyanBold('\n  ━━━ 관리자 비밀번호 설정 ━━━\n'))
  console.log('  관리자 페이지(/admin)에 들어갈 때 쓰는 비밀번호예요.')
  console.log(c.dim('  소스 코드에는 저장되지 않고 환경변수로 관리됩니다.\n'))
  console.log(c.yellow('  주의: 영문+숫자 조합 8자 이상 권장'))
  console.log(c.dim('  (단순한 인증이라 민감한 정보는 담지 마세요)\n'))

  const pw = await askPassword('새 관리자 비밀번호')
  if (pw.length < 6) {
    console.log(c.yellow('\n  6자 이상 입력하세요. 취소합니다.\n'))
    return
  }

  const confirm = await askPassword('한 번 더 입력')
  if (pw !== confirm) {
    console.log(c.yellow('\n  두 비밀번호가 다릅니다. 취소합니다.\n'))
    return
  }

  updateEnvLocal(projectDir, 'ADMIN_PASSWORD', pw)
  console.log(c.green('\n  ✓ .env.local에 저장 완료'))

  if (info.vercelLinked) {
    if (await askConfirm('Vercel에도 설정할까요?')) {
      const ok = await addVercelEnvAll('ADMIN_PASSWORD', pw)
      console.log(ok ? c.green('  ✓ Vercel 설정 완료') : c.yellow('  Vercel 설정 실패 (이미 있는 값일 수 있어요)'))

      if (ok && (await askConfirm('지금 재배포할까요?'))) {
        try {
          run('vercel --prod --yes', { cwd: projectDir })
          console.log(c.green('\n  ✓ 재배포 완료'))
        } catch {
          console.log(c.yellow('  재배포 실패'))
        }
      }
    }
  }

  console.log(c.gray('\n  /admin 페이지에서 새 비밀번호로 로그인하세요.\n'))
}

// ─── Domain guide ─────────────────────────────────────────────────────────────
function domainGuide() {
  console.log(c.cyanBold('\n  ━━━ 내 도메인 연결하기 ━━━\n'))
  console.log('  my-site.vercel.app 같은 기본 주소 대신')
  console.log('  my-brand.com 같은 내 도메인을 쓰는 방법이에요.\n')
  console.log(c.bold('  필요한 것:'))
  console.log('    - 가비아 계정 — 도메인 구매처')
  console.log('    - Cloudflare 계정 — DNS 관리 (무료)')
  console.log('    - 도메인 가격: 보통 연 1~3만원\n')

  console.log(c.bold('  순서:\n'))

  console.log(c.bold('  1. 가비아에서 도메인 구매'))
  console.log('     ' + c.cyan('gabia.com') + ' → 도메인 검색 → 결제\n')

  console.log(c.bold('  2. Cloudflare에 도메인 등록'))
  console.log('     ' + c.cyan('cloudflare.com') + ' → Add a Site → 무료 플랜')
  console.log(c.gray('     → Cloudflare가 네임서버 2개를 알려줘요 (복사해두기)\n'))

  console.log(c.bold('  3. 가비아 네임서버 교체'))
  console.log('     가비아 → My가비아 → 도메인 관리 → 네임서버')
  console.log('     → 직접입력 → Cloudflare 네임서버 2개 입력')
  console.log(c.dim('     (전파 최대 48시간, 보통 몇 시간)\n'))

  console.log(c.bold('  4. Vercel에 도메인 추가'))
  console.log('     Vercel 대시보드 → 프로젝트 → Settings → Domains')
  console.log('     → 도메인 입력 → Add\n')

  console.log(c.bold('  5. Cloudflare DNS 레코드 추가'))
  console.log('     Cloudflare → 내 도메인 → DNS → 레코드 추가:')
  console.log(c.gray('       CNAME  @    cname.vercel-dns.com    Proxy: DNS only'))
  console.log(c.gray('       CNAME  www  cname.vercel-dns.com    Proxy: DNS only\n'))

  console.log('  몇 분 기다리면 내 도메인으로 접속됩니다.\n')
  console.log(c.dim('  자세한 안내는 프로젝트 루트의 CLAUDE.md → "도메인 연결 가이드" 참고\n'))
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const projectDir = process.cwd()

  if (!existsSync(join(projectDir, 'package.json'))) {
    console.log(c.red('\n  package.json이 없어요.'))
    console.log(c.gray('  프로젝트 폴더에서 실행하세요:'))
    console.log(c.cyan('    cd 내프로젝트 && npm run setup\n'))
    rl.close()
    process.exit(1)
  }

  const info = getProjectInfo(projectDir)

  while (true) {
    const choice = await showMenu(info)

    if (!choice || choice === 'exit') {
      console.log(c.gray('\n  또 봐요!\n'))
      break
    }

    try {
      if (choice === 'deploy') await deployFlow(projectDir, info)
      else if (choice === 'database') await databaseFlow(projectDir, info)
      else if (choice === 'admin_password') await adminPasswordFlow(projectDir, info)
      else if (choice === 'domain') domainGuide()
    } catch (e) {
      console.log(c.red('\n  오류: ') + e.message + '\n')
    }

    // Refresh state after each action
    Object.assign(info, getProjectInfo(projectDir))
  }

  rl.close()
}

main().catch((e) => {
  console.error(c.red('\n  오류: '), e.message)
  rl.close()
  process.exit(1)
})
