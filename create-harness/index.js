#!/usr/bin/env node

/**
 * create-harness CLI
 * Usage: npx create-harness [landing|company|test] [project-name]
 *
 * Automates:
 *  1. Template copy
 *  2. GitHub repo creation (requires gh CLI)
 *  3. Vercel project link (requires vercel CLI)
 *  4. .env setup guide
 */

import { execSync, spawn } from 'child_process'
import { existsSync, cpSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// ─── Lazy imports (installed at runtime) ─────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: opts.silent ? 'pipe' : 'inherit', ...opts })
}

function cmdExists(cmd) {
  const isWindows = process.platform === 'win32'
  try { run(isWindows ? `where ${cmd}` : `which ${cmd}`, { silent: true }); return true } catch { return false }
}

function replaceInFile(filePath, from, to) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf8')
  writeFileSync(filePath, content.replaceAll(from, to))
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  await loadDeps()

  const args = process.argv.slice(2)

  // --help
  if (args.includes('--help') || args.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  console.log(chalk.bold.cyan('\n🏗️  create-harness\n'))

  // ── Step 1: Collect inputs ──────────────────────────────────────────────────
  let harnessType = args[0]
  let projectName = args[1]

  const validTypes = ['landing', 'company', 'test']

  if (!harnessType || !validTypes.includes(harnessType)) {
    const res = await prompts({
      type: 'select',
      name: 'type',
      message: '어떤 하네스를 사용할까요?',
      choices: [
        { title: '🚀 landing  — 랜딩/이벤트/캠페인 페이지', value: 'landing' },
        { title: '🏢 company  — 회사소개/포트폴리오 + 관리자', value: 'company' },
        { title: '🧪 test     — 심리/성향 테스트', value: 'test' },
      ],
    })
    harnessType = res.type
  }

  // test harness now available
  if (false && harnessType === 'test') {
    console.log(chalk.yellow('\n⚠️  harness-test는 아직 준비 중입니다. 곧 추가될 예정이에요!\n'))
    process.exit(0)
  }

  if (!projectName) {
    const res = await prompts({
      type: 'text',
      name: 'name',
      message: '프로젝트 이름을 입력하세요 (예: my-company-site)',
      validate: v => /^[a-z0-9-]+$/.test(v) ? true : '소문자, 숫자, 하이픈만 사용 가능합니다',
    })
    projectName = res.name
  }

  if (!projectName) {
    console.log(chalk.red('\n❌ 프로젝트 이름이 필요합니다.\n'))
    process.exit(1)
  }

  const targetDir = resolve(process.cwd(), projectName)
  const templateDir = resolve(__dirname, '..', `harness-${harnessType}`)

  // ── Step 2: Check template exists ──────────────────────────────────────────
  if (!existsSync(templateDir)) {
    console.log(chalk.red(`\n❌ 템플릿을 찾을 수 없습니다: ${templateDir}`))
    console.log(chalk.gray('  create-harness 폴더가 harness 루트에 있는지 확인하세요.\n'))
    process.exit(1)
  }

  if (existsSync(targetDir)) {
    console.log(chalk.red(`\n❌ 이미 존재하는 폴더입니다: ${targetDir}\n`))
    process.exit(1)
  }

  // ── Step 3: Copy template ──────────────────────────────────────────────────
  const spinnerCopy = ora('템플릿 복사 중...').start()
  try {
    cpSync(templateDir, targetDir, {
      recursive: true,
      filter: (src) => !src.includes('node_modules') && !src.includes('.next'),
    })
    // Rename project in package.json
    replaceInFile(join(targetDir, 'package.json'), `"harness-${harnessType}"`, `"${projectName}"`)
    // Update CLAUDE.md title
    replaceInFile(join(targetDir, 'CLAUDE.md'), `harness-${harnessType}`, projectName)
    spinnerCopy.succeed(chalk.green('템플릿 복사 완료'))
  } catch (e) {
    spinnerCopy.fail('템플릿 복사 실패')
    console.error(e.message)
    process.exit(1)
  }

  // ── Step 4: npm install ────────────────────────────────────────────────────
  const spinnerInstall = ora('패키지 설치 중... (잠시 기다려주세요)').start()
  try {
    run('npm install', { cwd: targetDir, stdio: 'pipe' })
    spinnerInstall.succeed(chalk.green('패키지 설치 완료'))
  } catch {
    spinnerInstall.warn(chalk.yellow('패키지 설치 실패 — 나중에 수동으로 npm install을 실행하세요'))
  }

  // ── Step 5: Git init ───────────────────────────────────────────────────────
  const spinnerGit = ora('Git 초기화 중...').start()
  try {
    run('git init', { cwd: targetDir, stdio: 'pipe' })
    run('git add .', { cwd: targetDir, stdio: 'pipe' })
    run('git commit -m "feat: initial harness setup"', { cwd: targetDir, stdio: 'pipe' })
    spinnerGit.succeed(chalk.green('Git 초기화 완료'))
  } catch {
    spinnerGit.warn(chalk.yellow('Git 초기화 실패 — git이 설치되어 있는지 확인하세요'))
  }

  // ── Step 6: GitHub repo (optional) ────────────────────────────────────────
  if (cmdExists('gh')) {
    const res = await prompts({
      type: 'confirm',
      name: 'createRepo',
      message: `GitHub에 '${projectName}' 레포를 생성할까요?`,
      initial: true,
    })

    if (res.createRepo) {
      const visRes = await prompts({
        type: 'select',
        name: 'visibility',
        message: '공개 설정',
        choices: [
          { title: 'Private (비공개)', value: '--private' },
          { title: 'Public (공개)', value: '--public' },
        ],
      })

      const spinnerGH = ora('GitHub 레포 생성 중...').start()
      try {
        run(`gh repo create ${projectName} ${visRes.visibility} --source=. --remote=origin --push`, {
          cwd: targetDir
        })
        spinnerGH.succeed(chalk.green(`GitHub 레포 생성 완료: github.com/$(gh api user --jq .login)/${projectName}`))
      } catch {
        spinnerGH.fail(chalk.yellow('GitHub 레포 생성 실패 — gh auth login을 먼저 실행했는지 확인하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  ℹ️  gh CLI가 없어서 GitHub 레포 자동 생성을 건너뜁니다.'))
    console.log(chalk.gray('     설치: https://cli.github.com\n'))
  }

  // ── Step 7: Vercel (optional) ─────────────────────────────────────────────
  if (cmdExists('vercel')) {
    const res = await prompts({
      type: 'confirm',
      name: 'deployVercel',
      message: 'Vercel에 배포 설정을 할까요?',
      initial: true,
    })

    if (res.deployVercel) {
      console.log(chalk.cyan('\n  Vercel 연결 중... (브라우저가 열릴 수 있습니다)'))
      try {
        const child = spawn('vercel', ['link', '--yes'], { cwd: targetDir, stdio: 'inherit' })
        await new Promise((res) => child.on('close', res))
        console.log(chalk.green('  ✓ Vercel 연결 완료'))
      } catch {
        console.log(chalk.yellow('  ⚠️  Vercel 연결 실패 — vercel login을 먼저 실행했는지 확인하세요'))
      }
    }
  } else {
    console.log(chalk.gray('\n  ℹ️  Vercel CLI가 없어서 배포 설정을 건너뜁니다.'))
    console.log(chalk.gray('     설치: npm i -g vercel\n'))
  }

  // ── Step 8: .env setup guide ──────────────────────────────────────────────
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
      console.log(chalk.green('  ✓ .env.local 생성 완료 — 환경 변수를 채워주세요'))
    }
  }

  // ── Step 9: Done! ──────────────────────────────────────────────────────────
  console.log(chalk.bold.green('\n✅ 완료!\n'))
  console.log(chalk.white('다음 단계:'))
  console.log(chalk.cyan(`  cd ${projectName}`))

  if (harnessType === 'company') {
    console.log(chalk.yellow('\n  Supabase 설정 (필수):'))
    console.log(chalk.gray('  1. https://supabase.com 에서 새 프로젝트 생성'))
    console.log(chalk.gray('  2. .env.local에 SUPABASE_URL, SUPABASE_ANON_KEY 입력'))
    console.log(chalk.gray('  3. SQL 에디터에서 contacts 테이블 생성 (CLAUDE.md 참고)'))
    console.log(chalk.gray('  4. Authentication > Users에서 관리자 계정 생성'))
  }

  console.log(chalk.cyan('\n  npm run dev\n'))

  console.log(chalk.bold('AI 도구로 커스터마이징:'))
  console.log(chalk.gray('  • Claude Code: CLAUDE.md 참고'))
  console.log(chalk.gray('  • Cursor:       .cursorrules 자동 로드됨'))
  console.log(chalk.gray('  • Antigravity:  .antigravity.md 참고'))
  console.log(chalk.gray('\n  콘텐츠 변경: src/lib/data.ts'))
  console.log(chalk.gray('  색상 변경:   tailwind.config.ts\n'))
}

function printHelp() {
  console.log(`
  create-harness — 하네스 프로젝트 생성 CLI

  사용법:
    npx create-harness [type] [project-name]

  타입:
    landing   랜딩/이벤트/캠페인 페이지
    company   회사소개/포트폴리오 + 관리자 페이지
    test      심리/성향 테스트 (준비중)

  예시:
    npx create-harness landing my-event-site
    npx create-harness company my-company
    npx create-harness            # 대화형 모드

  필요한 외부 도구 (선택):
    gh      GitHub CLI — https://cli.github.com
    vercel  Vercel CLI — npm i -g vercel
  `)
}

main().catch(console.error)
