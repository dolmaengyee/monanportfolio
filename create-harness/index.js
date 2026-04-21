#!/usr/bin/env node

/**
 * create-harness CLI
 * Usage: node index.js [landing|company|test] [project-name]
 */

import { execSync, spawn } from 'child_process'
import { existsSync, cpSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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

function openBrowser(url) {
  try {
    const cmd = process.platform === 'win32' ? `start "${url}"`
              : process.platform === 'darwin' ? `open "${url}"`
              : `xdg-open "${url}"`
    execSync(cmd, { stdio: 'ignore' })
  } catch {}
}

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
  const div = chalk.gray('  ' + '─'.repeat(60))

  console.log(chalk.bold.yellow('\n  ━━━ Supabase 데이터베이스 설정 ━━━\n'))
  console.log(chalk.white('  결과 저장 및 관리자 페이지를 위해 Supabase가 필요합니다.'))
  console.log(chalk.white('  무료 플랜으로 충분합니다. 지금 브라우저가 열립니다.\n'))

  // Auto-open Supabase
  openBrowser('https://supabase.com/dashboard')

  console.log(chalk.bold('  1단계 — 프로젝트 생성'))
  console.log(chalk.gray('     브라우저에서 supabase.com → "New project" 클릭'))
  console.log(chalk.gray('     이름 입력 후 Region은 Northeast Asia (Seoul) 선택\n'))

  console.log(chalk.bold('  2단계 — API 키 복사'))
  console.log(chalk.gray('     프로젝트 생성 완료 후:'))
  console.log(chalk.gray('     왼쪽 메뉴 아이콘들 맨 아래 → Project Settings → API\n'))
  console.log(chalk.cyan('       Project URL      → 잠시 후 입력할 SUPABASE_URL'))
  console.log(chalk.cyan('       anon public key  → 잠시 후 입력할 SUPABASE_ANON_KEY\n'))

  console.log(chalk.bold('  3단계 — 테이블 생성'))
  console.log(chalk.gray('     왼쪽 메뉴 → SQL Editor → "New query" 클릭'))
  console.log(chalk.gray('     아래 SQL을 전체 복사해서 붙여넣고 → "Run" 버튼 클릭\n'))

  console.log(div)

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
      'ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;',
      'CREATE POLICY "public_insert" ON test_results FOR INSERT WITH CHECK (true);',
      'CREATE POLICY "public_select" ON test_results FOR SELECT USING (true);',
    ]
    sql.forEach(line => console.log(chalk.cyan('  ' + line)))
  } else if (harnessType === 'company') {
    console.log(chalk.cyan('  -- .env.example 파일의 SQL 주석을 참고하세요'))
  }

  console.log(div)
  console.log(chalk.yellow('\n  Run 클릭 후 "Success" 메시지가 나오면 완료예요.\n'))

  await prompts({
    type: 'confirm',
    name: 'ok',
    message: 'SQL 실행 완료 후 Enter를 누르세요',
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
    console.log(chalk.yellow('\n  나중에 vercel.com → 프로젝트 → Settings → Environment Variables 에서 입력하세요.'))
    console.log(chalk.yellow('  설정하지 않으면 사이트의 데이터 저장 기능이 작동하지 않습니다.\n'))
    return {}
  }

  const collected = {}

  if (harnessType === 'test' || harnessType === 'company') {
    console.log(chalk.cyan('\n  Supabase API 탭에서 복사한 값을 입력하세요'))

    const { supabaseUrl } = await prompts({
      type: 'text',
      name: 'supabaseUrl',
      message: 'Project URL (https://...supabase.co)',
      validate: (v) => v.startsWith('https://') ? true : 'https://로 시작해야 합니다',
    })

    const { supabaseKey } = await prompts({
      type: 'password',
      name: 'supabaseKey',
      message: 'anon public key (eyJ...로 시작하는 긴 문자열)',
      validate: (v) => v.length > 20 ? true : '올바른 anon key를 입력하세요',
    })

    collected['NEXT_PUBLIC_SUPABASE_URL'] = supabaseUrl
    collected['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = supabaseKey
  }

  if (harnessType === 'test') {
    console.log(chalk.cyan('\n  관리자 페이지(/admin) 접속 비밀번호'))

    const { adminPw } = await prompts({
      type: 'password',
      name: 'adminPw',
      message: '관리자 비밀번호 (영문+숫자 8자 이상 권장)',
      validate: (v) => v.length >= 6 ? true : '6자 이상 입력하세요',
    })

    collected['NEXT_PUBLIC_ADMIN_PASSWORD'] = adminPw
  }

  const { siteUrl } = await prompts({
    type: 'text',
    name: 'siteUrl',
    message: '사이트 주소 (도메인 없으면 Enter로 건너뛰어도 됩니다)',
    initial: 'https://your-domain.com',
  })
  if (siteUrl && siteUrl !== 'https://your-domain.com') {
    collected['NEXT_PUBLIC_SITE_URL'] = siteUrl
  }

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

// ─── Deploy to Vercel ─────────────────────────────────────────────────────────
async function deployToVercel(targetDir) {
  const spinner = ora('  Vercel에 배포 중...').start()
  try {
    const output = run('vercel --prod --yes', { cwd: targetDir, stdio: 'pipe' }).toString()
    const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/)
    const url = urlMatch ? urlMatch[0] : null
    spinner.succeed(chalk.green('  배포 완료'))
    return url
  } catch {
    spinner.warn(chalk.yellow('  배포 실패 — Vercel 대시보드에서 수동 배포하세요'))
    return null
  }
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

  // ── 타입 선택 ────────────────────────────────────────────────────────────────
  let harnessType = args[0]
  let projectName = args[1]

  if (!harnessType || !['landing', 'company', 'test'].includes(harnessType)) {
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

  // ── 프로젝트 이름 ────────────────────────────────────────────────────────────
  if (!projectName) {
    const res = await prompts({
      type: 'text',
      name: 'name',
      message: '프로젝트 이름을 입력하세요',
      hint: '소문자와 하이픈만 사용 (예: my-test-site)',
      validate: (v) =>
        /^[a-z0-9-]+$/.test(v)
          ? true
          : `"${v}" 는 사용할 수 없어요. 소문자, 숫자, 하이픈(-)만 가능합니다. 예: ${v.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`,
    })
    projectName = res.name
  }

  if (!projectName) {
    console.log(chalk.red('\n  프로젝트 이름이 필요합니다.\n'))
    process.exit(1)
  }

  const targetDir = resolve(process.cwd(), projectName)
  const templateDir = resolve(__dirname, '..', `harness-${harnessType}`)

  // ── 템플릿 확인 ──────────────────────────────────────────────────────────────
  if (!existsSync(templateDir)) {
    console.log(chalk.red(`\n  템플릿을 찾을 수 없습니다: harness-${harnessType}`))
    console.log(chalk.gray('  y-harness 레포의 create-harness 폴더에서 실행하세요.\n'))
    process.exit(1)
  }

  if (existsSync(targetDir)) {
    console.log(chalk.red(`\n  "${projectName}" 폴더가 이미 존재합니다. 다른 이름을 사용하세요.\n`))
    process.exit(1)
  }

  // ── 템플릿 복사 ──────────────────────────────────────────────────────────────
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

  // ── npm install ──────────────────────────────────────────────────────────────
  const spinnerInstall = ora('  패키지 설치 중... (1~2분 걸릴 수 있어요)').start()
  try {
    run('npm install', { cwd: targetDir, stdio: 'pipe' })
    spinnerInstall.succeed(chalk.green('  패키지 설치 완료'))
  } catch {
    spinnerInstall.warn(chalk.yellow(`  패키지 설치 실패 — 터미널에서 "cd ${projectName} && npm install" 을 실행하세요`))
  }

  // ── Git 초기화 ───────────────────────────────────────────────────────────────
  const spinnerGit = ora('  Git 초기화 중...').start()
  try {
    run('git init', { cwd: targetDir, stdio: 'pipe' })
    run('git add .', { cwd: targetDir, stdio: 'pipe' })
    run('git commit -m "feat: initial harness setup"', { cwd: targetDir, stdio: 'pipe' })
    spinnerGit.succeed(chalk.green('  Git 초기화 완료'))
  } catch {
    spinnerGit.warn(chalk.yellow('  Git 초기화 실패 — git이 설치되어 있는지 확인하세요'))
  }

  // ── GitHub 레포 생성 (선택) ──────────────────────────────────────────────────
  if (cmdExists('gh')) {
    const { createRepo } = await prompts({
      type: 'confirm',
      name: 'createRepo',
      message: `GitHub에 "${projectName}" 레포를 생성할까요?`,
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
        run(`gh repo create ${projectName} ${visibility} --source=. --remote=origin --push`, { cwd: targetDir })
        spinnerGH.succeed(chalk.green('  GitHub 레포 생성 완료'))
      } catch {
        spinnerGH.fail(chalk.yellow('  GitHub 레포 생성 실패 — "gh auth login" 을 먼저 실행했는지 확인하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  gh CLI가 없어서 GitHub 레포 자동 생성을 건너뜁니다.'))
    console.log(chalk.gray('  나중에 설치: https://cli.github.com\n'))
  }

  // ── Vercel 연결 (선택) ───────────────────────────────────────────────────────
  let vercelLinked = false
  if (cmdExists('vercel')) {
    const { deployVercel } = await prompts({
      type: 'confirm',
      name: 'deployVercel',
      message: 'Vercel 배포 설정을 할까요?',
      initial: true,
    })

    if (deployVercel) {
      console.log(chalk.cyan('\n  Vercel 연결 중... (브라우저가 열릴 수 있습니다)\n'))
      try {
        const child = spawn('vercel', ['link', '--yes'], { cwd: targetDir, stdio: 'inherit' })
        await new Promise((resolve) => child.on('close', resolve))
        vercelLinked = existsSync(join(targetDir, '.vercel', 'project.json'))
        if (vercelLinked) {
          console.log(chalk.green('\n  Vercel 연결 완료'))
        } else {
          console.log(chalk.yellow('\n  Vercel 연결 결과를 확인할 수 없습니다. 계속 진행합니다.'))
        }
      } catch {
        console.log(chalk.yellow('  Vercel 연결 실패 — "vercel login" 을 먼저 실행하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  Vercel CLI가 없어서 배포 설정을 건너뜁니다.'))
    console.log(chalk.gray('  설치하려면: npm i -g vercel\n'))
  }

  // ── .env.local 생성 ──────────────────────────────────────────────────────────
  const envExample = join(targetDir, '.env.example')
  const envLocal = join(targetDir, '.env.local')

  if (existsSync(envExample) && !existsSync(envLocal)) {
    const { copyEnv } = await prompts({
      type: 'confirm',
      name: 'copyEnv',
      message: '환경변수 파일(.env.local)을 생성할까요?',
      initial: true,
    })
    if (copyEnv) {
      cpSync(envExample, envLocal)
      console.log(chalk.green('  .env.local 생성 완료'))
    }
  }

  // ── Supabase 안내 (test / company) ───────────────────────────────────────────
  if (harnessType === 'test' || harnessType === 'company') {
    await showSupabaseGuide(harnessType)
  }

  // ── Vercel 환경변수 설정 ─────────────────────────────────────────────────────
  let deployUrl = null

  if (vercelLinked && (harnessType === 'test' || harnessType === 'company')) {
    await setupVercelEnvVars(harnessType, targetDir)

    // Deploy after env vars are set
    console.log('')
    deployUrl = await deployToVercel(targetDir)
  } else if (!vercelLinked && (harnessType === 'test' || harnessType === 'company')) {
    console.log(chalk.yellow('\n  .env.local 파일에 직접 값을 입력하세요:'))
    console.log(chalk.gray(`    ${targetDir}/.env.local\n`))
  }

  // ── 완료 ─────────────────────────────────────────────────────────────────────
  console.log(chalk.bold.green('\n\n  완료!\n'))

  if (deployUrl) {
    console.log(chalk.bold.cyan(`  내 사이트 주소: ${deployUrl}\n`))
  }

  console.log(chalk.bold('  로컬에서 미리보기:'))
  console.log(chalk.cyan(`    cd ${projectName}`))
  console.log(chalk.cyan('    npm run dev'))
  console.log(chalk.gray('    → 브라우저에서 http://localhost:3000 열기\n'))

  if (!deployUrl && vercelLinked) {
    console.log(chalk.bold('  배포:'))
    console.log(chalk.cyan('    vercel --prod'))
    console.log(chalk.gray('    → 또는 Vercel 대시보드에서 확인\n'))
  }

  if (harnessType === 'test') {
    console.log(chalk.bold('  관리자 페이지:'))
    console.log(chalk.gray(`    ${deployUrl || 'https://your-domain.com'}/admin\n`))
  }

  console.log(chalk.bold('  AI 도구로 커스터마이징:'))
  console.log(chalk.gray('    Claude Code / Cursor / Antigravity 에서 CLAUDE.md 참고\n'))
}

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
    node index.js test my-personality-test
    node index.js landing my-event
    node index.js                          # 대화형 모드

  필요한 외부 도구 (선택):
    gh      GitHub CLI  — https://cli.github.com
    vercel  Vercel CLI  — npm i -g vercel
  `)
}

main().catch(console.error)
