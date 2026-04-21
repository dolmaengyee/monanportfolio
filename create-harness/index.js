#!/usr/bin/env node

/**
 * create-harness CLI
 * Usage: node index.js [landing|company|test] [project-name]
 *
 * Automates:
 *  1. Template copy
 *  2. npm install
 *  3. Git init + initial commit
 *  4. GitHub repo creation (requires gh CLI)
 *  5. Vercel project link (requires vercel CLI)
 *  6. Supabase setup guide (test / company types)
 *  7. Vercel env var injection
 *  8. .env.local generation
 */

import { execSync, spawn } from 'child_process'
import { existsSync, cpSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// ─── Lazy imports ─────────────────────────────────────────────────────────────
let chalk, ora, prompts

async function loadDeps() {
  try {
    chalk = (await import('chalk')).default
    ora = (await import('ora')).default
    prompts = (await import('prompts')).default
  } catch {
    console.error('Missing dependencies. Run: npm install')
    process.exit(1)
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: opts.silent ? 'pipe' : 'inherit', ...opts })
}

function cmdExists(cmd) {
  try {
    run(process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`, { silent: true })
    return true
  } catch {
    return false
  }
}

function replaceInFile(filePath, from, to) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf8')
  writeFileSync(filePath, content.replaceAll(from, to))
}

// Pipe a value into `vercel env add KEY environment` non-interactively
function addVercelEnv(key, value, env = 'production') {
  return new Promise((resolve) => {
    const child = spawn('vercel', ['env', 'add', key, env], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    child.stdin.write(value + '\n')
    child.stdin.end()
    child.on('close', (code) => resolve(code === 0))
  })
}

// ─── Supabase guide ───────────────────────────────────────────────────────────
async function showSupabaseGuide(harnessType) {
  const divider = chalk.gray('  ' + '─'.repeat(56))

  console.log(chalk.bold.yellow('\n  ━━━ Supabase 데이터베이스 설정 ━━━\n'))
  console.log(chalk.white('  결과 저장 및 관리자 페이지를 위해 Supabase가 필요합니다.'))
  console.log(chalk.white('  무료 플랜으로 충분합니다.\n'))

  console.log(chalk.bold('  1단계 — 프로젝트 생성'))
  console.log(chalk.gray('     https://supabase.com 접속 → New Project 클릭'))
  console.log(chalk.gray('     (GitHub 계정으로 로그인하면 빠릅니다)\n'))

  console.log(chalk.bold('  2단계 — API 키 확인'))
  console.log(chalk.gray('     프로젝트 생성 후 Project Settings > API 탭 이동'))
  console.log(chalk.gray('     아래 두 값을 복사해두세요:'))
  console.log(chalk.cyan('       Project URL       → NEXT_PUBLIC_SUPABASE_URL'))
  console.log(chalk.cyan('       anon public key   → NEXT_PUBLIC_SUPABASE_ANON_KEY\n'))

  console.log(chalk.bold('  3단계 — 테이블 생성 (SQL Editor에서 실행)'))
  console.log(divider)

  if (harnessType === 'test') {
    const sql = [
      'CREATE TABLE test_results (',
      '  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,',
      '  name TEXT NOT NULL,',
      '  phone TEXT,',
      '  final_type INTEGER NOT NULL CHECK (final_type BETWEEN 1 AND 9),',
      '  scores JSONB NOT NULL,',
      '  ranking JSONB NOT NULL,',
      '  answers JSONB NOT NULL,',
      '  created_at TIMESTAMPTZ DEFAULT now()',
      ');',
      '',
      '-- 보안: 행 단위 접근 제어 활성화',
      'ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;',
      '',
      '-- 누구나 결과를 저장할 수 있음 (테스트 제출)',
      'CREATE POLICY "public_insert" ON test_results',
      '  FOR INSERT WITH CHECK (true);',
      '',
      '-- 누구나 결과를 조회할 수 있음 (공유 링크)',
      'CREATE POLICY "public_select" ON test_results',
      '  FOR SELECT USING (true);',
    ]
    sql.forEach(line => console.log(chalk.cyan('  ' + line)))
  } else if (harnessType === 'company') {
    console.log(chalk.cyan('  -- .env.example 파일의 SQL 주석을 참고하세요'))
  }

  console.log(divider)

  console.log(chalk.bold.red('\n  보안 주의사항:'))
  console.log(chalk.gray('    • RLS(Row Level Security)가 반드시 활성화되어 있어야 합니다'))
  console.log(chalk.gray('    • anon key는 공개 키입니다 — service_role key는 절대 노출하지 마세요'))
  console.log(chalk.gray('    • .env.local은 git에 커밋되지 않습니다 (.gitignore 포함됨)\n'))

  await prompts({
    type: 'confirm',
    name: 'ok',
    message: 'SQL 실행 완료 후 계속하려면 Enter',
    initial: true,
  })
}

// ─── Vercel env var setup ─────────────────────────────────────────────────────
async function setupVercelEnvVars(harnessType, targetDir) {
  const { doSetup } = await prompts({
    type: 'confirm',
    name: 'doSetup',
    message: 'Vercel 환경변수를 지금 설정할까요?',
    initial: true,
  })

  if (!doSetup) {
    console.log(chalk.gray('\n  나중에 vercel.com > 프로젝트 > Settings > Environment Variables 에서 설정하세요.\n'))
    return {}
  }

  const collected = {}

  // Supabase vars
  if (harnessType === 'test' || harnessType === 'company') {
    console.log(chalk.cyan('\n  Supabase 정보 입력 (Project Settings > API)'))

    const { supabaseUrl } = await prompts({
      type: 'text',
      name: 'supabaseUrl',
      message: 'NEXT_PUBLIC_SUPABASE_URL',
      validate: (v) => v.startsWith('https://') ? true : 'https://로 시작해야 합니다',
    })

    const { supabaseKey } = await prompts({
      type: 'password',
      name: 'supabaseKey',
      message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      validate: (v) => v.length > 20 ? true : '올바른 anon key를 입력하세요',
    })

    collected['NEXT_PUBLIC_SUPABASE_URL'] = supabaseUrl
    collected['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = supabaseKey
  }

  // Admin password (test type only)
  if (harnessType === 'test') {
    console.log(chalk.cyan('\n  관리자 비밀번호 설정'))
    console.log(chalk.yellow('  (영문+숫자 조합 8자 이상 권장)'))

    const { adminPw } = await prompts({
      type: 'password',
      name: 'adminPw',
      message: 'NEXT_PUBLIC_ADMIN_PASSWORD',
      validate: (v) => v.length >= 6 ? true : '6자 이상 입력하세요',
    })

    collected['NEXT_PUBLIC_ADMIN_PASSWORD'] = adminPw
  }

  // Site URL
  const { siteUrl } = await prompts({
    type: 'text',
    name: 'siteUrl',
    message: 'NEXT_PUBLIC_SITE_URL (배포 후 실제 도메인으로 변경 가능)',
    initial: 'https://your-domain.com',
  })
  collected['NEXT_PUBLIC_SITE_URL'] = siteUrl

  // Push to Vercel
  console.log('')
  for (const [key, value] of Object.entries(collected)) {
    if (!value) continue
    const spinner = ora(`  Vercel: ${key}`).start()
    const ok = await addVercelEnv(key, value)
    if (ok) {
      spinner.succeed(chalk.green(`  Vercel: ${key} 설정 완료`))
    } else {
      spinner.warn(chalk.yellow(`  Vercel: ${key} 실패 — 대시보드에서 수동 입력하세요`))
    }
  }

  // Sync to .env.local
  const envLocalPath = join(targetDir, '.env.local')
  if (existsSync(envLocalPath)) {
    let envContent = readFileSync(envLocalPath, 'utf8')
    for (const [key, value] of Object.entries(collected)) {
      if (!value) continue
      const regex = new RegExp(`^${key}=.*$`, 'm')
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`)
      } else {
        envContent += `\n${key}=${value}`
      }
    }
    writeFileSync(envLocalPath, envContent)
    console.log(chalk.green('\n  .env.local 업데이트 완료'))
  }

  return collected
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  await loadDeps()

  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  console.log(chalk.bold.cyan('\n  create-harness\n'))

  // ── Step 1: 타입 선택 ────────────────────────────────────────────────────────
  let harnessType = args[0]
  let projectName = args[1]

  const validTypes = ['landing', 'company', 'test']

  if (!harnessType || !validTypes.includes(harnessType)) {
    const res = await prompts({
      type: 'select',
      name: 'type',
      message: '어떤 하네스를 사용할까요?',
      choices: [
        { title: 'landing  — 랜딩/이벤트/캠페인 페이지', value: 'landing' },
        { title: 'company  — 회사소개/포트폴리오 + 관리자', value: 'company' },
        { title: 'test     — 심리/성향 테스트', value: 'test' },
      ],
    })
    harnessType = res.type
    if (!harnessType) process.exit(0)
  }

  // ── Step 2: 프로젝트 이름 ────────────────────────────────────────────────────
  if (!projectName) {
    const res = await prompts({
      type: 'text',
      name: 'name',
      message: '프로젝트 이름 (예: my-test-site)',
      validate: (v) => /^[a-z0-9-]+$/.test(v) ? true : '소문자, 숫자, 하이픈만 사용 가능합니다',
    })
    projectName = res.name
  }

  if (!projectName) {
    console.log(chalk.red('\n  프로젝트 이름이 필요합니다.\n'))
    process.exit(1)
  }

  const targetDir = resolve(process.cwd(), projectName)
  const templateDir = resolve(__dirname, '..', `harness-${harnessType}`)

  // ── Step 3: 템플릿 확인 ──────────────────────────────────────────────────────
  if (!existsSync(templateDir)) {
    console.log(chalk.red(`\n  템플릿을 찾을 수 없습니다: harness-${harnessType}`))
    console.log(chalk.gray('  y-harness 레포 루트의 create-harness 폴더에서 실행하세요.\n'))
    process.exit(1)
  }

  if (existsSync(targetDir)) {
    console.log(chalk.red(`\n  이미 존재하는 폴더입니다: ${projectName}\n`))
    process.exit(1)
  }

  // ── Step 4: 템플릿 복사 ──────────────────────────────────────────────────────
  const spinnerCopy = ora('  템플릿 복사 중...').start()
  try {
    cpSync(templateDir, targetDir, {
      recursive: true,
      filter: (src) => !src.includes('node_modules') && !src.includes('.next'),
    })
    replaceInFile(join(targetDir, 'package.json'), `"harness-${harnessType}"`, `"${projectName}"`)
    replaceInFile(join(targetDir, 'CLAUDE.md'), `harness-${harnessType}`, projectName)
    spinnerCopy.succeed(chalk.green('  템플릿 복사 완료'))
  } catch (e) {
    spinnerCopy.fail('  템플릿 복사 실패')
    console.error(e.message)
    process.exit(1)
  }

  // ── Step 5: npm install ──────────────────────────────────────────────────────
  const spinnerInstall = ora('  패키지 설치 중... (잠시 기다려주세요)').start()
  try {
    run('npm install', { cwd: targetDir, stdio: 'pipe' })
    spinnerInstall.succeed(chalk.green('  패키지 설치 완료'))
  } catch {
    spinnerInstall.warn(chalk.yellow('  패키지 설치 실패 — cd ' + projectName + ' && npm install 을 실행하세요'))
  }

  // ── Step 6: Git 초기화 ───────────────────────────────────────────────────────
  const spinnerGit = ora('  Git 초기화 중...').start()
  try {
    run('git init', { cwd: targetDir, stdio: 'pipe' })
    run('git add .', { cwd: targetDir, stdio: 'pipe' })
    run('git commit -m "feat: initial harness setup"', { cwd: targetDir, stdio: 'pipe' })
    spinnerGit.succeed(chalk.green('  Git 초기화 완료'))
  } catch {
    spinnerGit.warn(chalk.yellow('  Git 초기화 실패 — git이 설치되어 있는지 확인하세요'))
  }

  // ── Step 7: GitHub 레포 (선택) ───────────────────────────────────────────────
  if (cmdExists('gh')) {
    const { createRepo } = await prompts({
      type: 'confirm',
      name: 'createRepo',
      message: `GitHub에 '${projectName}' 레포를 생성할까요?`,
      initial: true,
    })

    if (createRepo) {
      const { visibility } = await prompts({
        type: 'select',
        name: 'visibility',
        message: '공개 설정',
        choices: [
          { title: 'Private (비공개) — 권장', value: '--private' },
          { title: 'Public (공개)', value: '--public' },
        ],
      })

      const spinnerGH = ora('  GitHub 레포 생성 중...').start()
      try {
        run(
          `gh repo create ${projectName} ${visibility} --source=. --remote=origin --push`,
          { cwd: targetDir }
        )
        spinnerGH.succeed(chalk.green('  GitHub 레포 생성 완료'))
      } catch {
        spinnerGH.fail(chalk.yellow('  GitHub 레포 생성 실패 — gh auth login 상태를 확인하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  gh CLI가 없어서 GitHub 레포 자동 생성을 건너뜁니다.'))
    console.log(chalk.gray('  설치: https://cli.github.com\n'))
  }

  // ── Step 8: Vercel 연결 (선택) ───────────────────────────────────────────────
  let vercelLinked = false
  if (cmdExists('vercel')) {
    const { deployVercel } = await prompts({
      type: 'confirm',
      name: 'deployVercel',
      message: 'Vercel 배포 설정을 할까요?',
      initial: true,
    })

    if (deployVercel) {
      console.log(chalk.cyan('\n  Vercel 연결 중... (브라우저가 열릴 수 있습니다)'))
      try {
        const child = spawn('vercel', ['link', '--yes'], { cwd: targetDir, stdio: 'inherit' })
        await new Promise((resolve) => child.on('close', resolve))
        vercelLinked = existsSync(join(targetDir, '.vercel', 'project.json'))
        if (vercelLinked) {
          console.log(chalk.green('  Vercel 연결 완료'))
        } else {
          console.log(chalk.yellow('  Vercel 연결 결과를 확인할 수 없습니다.'))
        }
      } catch {
        console.log(chalk.yellow('  Vercel 연결 실패 — vercel login을 먼저 실행하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  Vercel CLI가 없어서 배포 설정을 건너뜁니다.'))
    console.log(chalk.gray('  설치: npm i -g vercel\n'))
  }

  // ── Step 9: .env.local 생성 ──────────────────────────────────────────────────
  const envExample = join(targetDir, '.env.example')
  const envLocal = join(targetDir, '.env.local')

  if (existsSync(envExample) && !existsSync(envLocal)) {
    const { copyEnv } = await prompts({
      type: 'confirm',
      name: 'copyEnv',
      message: '.env.example을 .env.local로 복사할까요?',
      initial: true,
    })
    if (copyEnv) {
      cpSync(envExample, envLocal)
      console.log(chalk.green('  .env.local 생성 완료'))
    }
  }

  // ── Step 10: Supabase 안내 (test / company) ──────────────────────────────────
  if (harnessType === 'test' || harnessType === 'company') {
    await showSupabaseGuide(harnessType)
  }

  // ── Step 11: Vercel 환경변수 설정 ────────────────────────────────────────────
  if (vercelLinked && (harnessType === 'test' || harnessType === 'company')) {
    await setupVercelEnvVars(harnessType, targetDir)
  } else if (!vercelLinked && (harnessType === 'test' || harnessType === 'company')) {
    // Vercel 없어도 .env.local에 직접 입력 안내
    console.log(chalk.yellow('\n  환경변수를 .env.local 파일에 직접 입력하세요:'))
    if (harnessType === 'test') {
      console.log(chalk.gray('    NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co'))
      console.log(chalk.gray('    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key'))
      console.log(chalk.gray('    NEXT_PUBLIC_ADMIN_PASSWORD=your-strong-password'))
      console.log(chalk.gray('    NEXT_PUBLIC_SITE_URL=https://your-domain.com'))
    }
  }

  // ── 완료 ─────────────────────────────────────────────────────────────────────
  console.log(chalk.bold.green('\n  완료!\n'))
  console.log(chalk.bold('  시작하기:'))
  console.log(chalk.cyan(`    cd ${projectName}`))
  console.log(chalk.cyan('    npm run dev'))
  console.log(chalk.gray('    → http://localhost:3000\n'))

  if (harnessType === 'test') {
    console.log(chalk.bold('  배포 전 체크리스트:'))
    console.log(chalk.gray('    [ ] .env.local에 Supabase URL과 Key 입력됨'))
    console.log(chalk.gray('    [ ] .env.local에 NEXT_PUBLIC_ADMIN_PASSWORD 입력됨'))
    console.log(chalk.gray('    [ ] Supabase SQL Editor에서 test_results 테이블 생성됨'))
    console.log(chalk.gray('    [ ] Supabase RLS 정책 활성화됨'))
    console.log(chalk.gray('    [ ] Vercel 환경변수에도 동일하게 입력됨'))
    console.log(chalk.gray('    [ ] git status 로 .env.local이 커밋 목록에 없는지 확인\n'))
  } else if (harnessType === 'company') {
    console.log(chalk.bold('  추가 설정:'))
    console.log(chalk.gray('    [ ] contacts 테이블 생성 (CLAUDE.md 참고)'))
    console.log(chalk.gray('    [ ] Authentication > Users 에서 관리자 계정 생성\n'))
  }

  console.log(chalk.bold('  AI 도구로 커스터마이징:'))
  console.log(chalk.gray('    Claude Code:   CLAUDE.md 참고'))
  console.log(chalk.gray('    Cursor:        .cursorrules 자동 로드됨'))
  console.log(chalk.gray('    Antigravity:   .antigravity.md 참고\n'))
}

// ─── Help ─────────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
  create-harness — 하네스 프로젝트 생성 CLI

  사용법:
    node index.js [type] [project-name]

  타입:
    landing   랜딩/이벤트/캠페인 페이지
    company   회사소개/포트폴리오 + 관리자 페이지
    test      심리/성향 테스트

  예시:
    node index.js landing my-event-site
    node index.js test my-personality-test
    node index.js                          # 대화형 모드

  필요한 외부 도구 (선택):
    gh      GitHub CLI  — https://cli.github.com
    vercel  Vercel CLI  — npm i -g vercel
  `)
}

main().catch(console.error)
