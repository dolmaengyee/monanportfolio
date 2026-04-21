#!/usr/bin/env node

/**
 * create-harness — Stage 1 (Quick start)
 *
 * Usage: node index.js
 *
 * Only asks 2 questions:
 *   1. What do you want to build?
 *   2. What name?
 *
 * Then does everything automatically:
 *   - Copy template
 *   - npm install
 *   - git init
 *   - Install setup.mjs (Stage 2 menu)
 *   - Launch dev server (optional)
 *
 * For deploy/database/domain/admin → run `npm run setup` inside the project.
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

function replaceInFile(filePath, from, to) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf8')
  writeFileSync(filePath, content.replaceAll(from, to))
}

function openBrowser(url) {
  try {
    const cmd = process.platform === 'win32' ? `start "" "${url}"`
              : process.platform === 'darwin' ? `open "${url}"`
              : `xdg-open "${url}"`
    execSync(cmd, { stdio: 'ignore' })
  } catch {}
}

function sanitizeName(input) {
  return input.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
}

async function main() {
  await loadDeps()

  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  console.log(chalk.bold.cyan('\n  Harness 하네스'))
  console.log(chalk.gray('  AI와 함께 웹사이트 만들기\n'))

  // ── Question 1: What to build ───────────────────────────────────────────────
  const { type } = await prompts({
    type: 'select',
    name: 'type',
    message: '어떤 걸 만들고 싶으세요?',
    choices: [
      {
        title: '랜딩 페이지',
        description: '이벤트 초대장, 포트폴리오 — 한 페이지짜리 웹사이트',
        value: 'landing',
      },
      {
        title: '회사 홈페이지',
        description: '회사 소개 + 문의 받기 + 관리자 페이지 (여러 페이지)',
        value: 'company',
      },
      {
        title: '성향 테스트',
        description: 'MBTI 같은 심리 테스트 — 결과 공유 + 참가자 통계',
        value: 'test',
      },
    ],
  })
  if (!type) process.exit(0)

  // ── Question 2: Project name ────────────────────────────────────────────────
  console.log(chalk.gray('\n  프로젝트 이름은 폴더 이름이 돼요.'))
  console.log(chalk.gray('  영어 소문자, 숫자, 하이픈(-)만 사용할 수 있어요.'))

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: '프로젝트 이름',
    initial: `my-${type}`,
    validate: (v) => {
      if (!v) return '이름을 입력해주세요'
      if (!/^[a-z0-9-]+$/.test(v)) {
        const suggest = sanitizeName(v) || `my-${type}`
        return `"${v}"는 쓸 수 없어요. 예: ${suggest}`
      }
      return true
    },
  })
  if (!name) process.exit(0)

  const projectName = name
  const targetDir = resolve(process.cwd(), projectName)
  const templateDir = resolve(__dirname, '..', `harness-${type}`)

  if (!existsSync(templateDir)) {
    console.log(chalk.red(`\n  템플릿을 찾을 수 없어요: harness-${type}`))
    console.log(chalk.gray('  y-harness 레포의 create-harness 폴더에서 실행하세요.\n'))
    process.exit(1)
  }
  if (existsSync(targetDir)) {
    console.log(chalk.red(`\n  "${projectName}" 폴더가 이미 있어요.`))
    console.log(chalk.gray('  다른 이름을 사용하거나, 기존 폴더를 지우고 다시 시도하세요.\n'))
    process.exit(1)
  }

  // ── Automatic steps ─────────────────────────────────────────────────────────
  console.log('')

  // 1. Copy template + install Stage 2 setup
  const s1 = ora('  템플릿 준비 중...').start()
  try {
    cpSync(templateDir, targetDir, {
      recursive: true,
      filter: (src) => !src.includes('node_modules') && !src.includes('.next'),
    })
    replaceInFile(join(targetDir, 'package.json'), `"harness-${type}"`, `"${projectName}"`)
    replaceInFile(join(targetDir, 'CLAUDE.md'), `harness-${type}`, projectName)

    // Copy Stage 2 setup script
    const setupSrc = join(__dirname, 'setup-template.mjs')
    if (existsSync(setupSrc)) {
      cpSync(setupSrc, join(targetDir, 'setup.mjs'))
    }

    // Update package.json: add "setup" script + harness marker
    const pkgPath = join(targetDir, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    pkg.scripts = { ...pkg.scripts, setup: 'node setup.mjs' }
    pkg.harness = { type, version: '2.0.0' }
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

    s1.succeed(chalk.green('  템플릿 준비 완료'))
  } catch (e) {
    s1.fail('  템플릿 복사 실패')
    console.error(chalk.red('  ' + e.message))
    process.exit(1)
  }

  // 2. npm install
  const s2 = ora('  패키지 설치 중... (30초~1분 걸릴 수 있어요)').start()
  try {
    run('npm install', { cwd: targetDir, stdio: 'pipe' })
    s2.succeed(chalk.green('  패키지 설치 완료'))
  } catch {
    s2.warn(chalk.yellow('  패키지 설치 실패'))
    console.log(chalk.gray(`  나중에 직접 실행: cd ${projectName} && npm install\n`))
  }

  // 3. Git init
  const s3 = ora('  Git 초기화 중...').start()
  try {
    run('git init', { cwd: targetDir, stdio: 'pipe' })
    run('git add .', { cwd: targetDir, stdio: 'pipe' })
    run('git commit -m "feat: initial harness setup"', { cwd: targetDir, stdio: 'pipe' })
    s3.succeed(chalk.green('  Git 초기화 완료'))
  } catch {
    s3.warn(chalk.yellow('  Git 초기화 실패 (git이 설치되어 있는지 확인하세요)'))
  }

  // ── Success message ─────────────────────────────────────────────────────────
  const typeLabel = { landing: '랜딩 페이지', company: '회사 홈페이지', test: '성향 테스트' }[type]

  console.log(chalk.bold.green('\n\n  내 ' + typeLabel + '가 준비됐어요!\n'))
  console.log(chalk.gray(`  위치: ${targetDir}\n`))

  console.log(chalk.bold('  지금 할 수 있는 것:\n'))
  console.log('    ' + chalk.cyan(`cd ${projectName}`))
  console.log('    ' + chalk.cyan('npm run dev') + chalk.gray('    (브라우저에서 바로 확인)\n'))

  console.log(chalk.bold('  나중에 더 필요하면 (필요할 때만):\n'))
  console.log('    ' + chalk.cyan('npm run setup') + chalk.gray('   (메뉴에서 선택)'))
  console.log(chalk.gray('      · 인터넷에 올리기 (GitHub + Vercel)'))
  if (type !== 'landing') {
    console.log(chalk.gray('      · 데이터 저장소 설정 (Supabase)'))
  }
  if (type === 'test') {
    console.log(chalk.gray('      · 관리자 비밀번호 설정'))
  }
  console.log(chalk.gray('      · 내 도메인 연결 안내\n'))

  // ── Offer to start dev server now ───────────────────────────────────────────
  const { startNow } = await prompts({
    type: 'confirm',
    name: 'startNow',
    message: '지금 바로 브라우저에서 사이트를 열어볼까요?',
    initial: true,
  })

  if (startNow) {
    console.log(chalk.cyan('\n  사이트 시작 중...') + chalk.gray(' (끄려면 Ctrl+C)\n'))

    // Use spawn (async) so setTimeout below can fire while dev server runs
    const dev = spawn('npm', ['run', 'dev'], {
      cwd: targetDir,
      stdio: 'inherit',
      shell: true,
    })

    setTimeout(() => openBrowser('http://localhost:3000'), 4000)

    await new Promise((resolve) => dev.on('close', resolve))
  } else {
    console.log(chalk.gray('\n  나중에 보려면 위 명령어를 실행하세요.\n'))
  }
}

function printHelp() {
  console.log(`
  create-harness — 하네스 프로젝트 생성

  사용법:
    node index.js                         # 대화형 (추천)

  만들 수 있는 것:
    랜딩 페이지      landing
    회사 홈페이지    company
    성향 테스트      test

  프로젝트 만든 후:
    cd 프로젝트이름
    npm run dev       # 바로 확인
    npm run setup     # 배포/DB/도메인 설정
  `)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
