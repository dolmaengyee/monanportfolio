import Image from "next/image";
import { ChevronDown } from "lucide-react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-brand-300">
      <span className="h-px w-10 bg-brand-300/70" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#12091f] text-brand-50">
      <section className="relative min-h-[100svh] px-5 pb-12 pt-5 sm:px-8 lg:px-12">
        <Image
          src="/images/teum-village-2.png"
          alt="게임 틈의 두 번째 픽셀 마을 배경"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(18,9,31,0.18)_42%,rgba(18,9,31,0.72)_76%,#12091f_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent_0%,#12091f_100%)]" />

        <div
          id="top"
          className="relative z-10 mx-auto flex min-h-[calc(100svh-40px)] max-w-md flex-col justify-end pb-2 pt-12"
        >
          <h1 className="max-w-[11ch] font-display text-[clamp(3.6rem,18vw,6rem)] leading-[0.9] text-white drop-shadow-[0_6px_30px_rgba(18,9,31,0.9)]">
            모닥불
          </h1>
          <div className="mt-7 max-w-md space-y-5 text-[1.03rem] font-semibold leading-8 text-brand-50/90 sm:text-xl sm:leading-9">
            <p>
              귀여운 픽셀 마을 아래,
              <br />
              아무도 말하지 못한 틈이 숨어 있습니다.
            </p>
            <p className="text-brand-100/82">
              모닥불은 고장난 NPC들과
              <br />
              마을의 비밀을 따라가는
              <br />
              미스터리 스토리 게임{" "}
              <strong className="font-semibold text-brand-100/82">틈</strong>을 만들고
              있습니다.
            </p>
          </div>
          <a
            href="#club"
            className="mt-10 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-brand-200/55 bg-[#241332]/70 text-brand-100"
            aria-label="다음 섹션으로 이동"
          >
            <ChevronDown aria-hidden="true" size={22} />
          </a>
        </div>
      </section>

      <section id="club" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#12091f_0%,#241332_100%)]" />
        <div className="relative mx-auto max-w-md">
          <SectionLabel>Club</SectionLabel>
          <div className="grid gap-10">
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              게임 개발 동아리
            </h2>
            <div className="space-y-5 text-base font-medium leading-8 text-brand-50/82">
              <p>
                모닥불이라는 이름에는
                <br />
                “모여서 만드는 이야기”라는 뜻이 담겨 있습니다.
                <br />
                우리는 각자의 아이디어를 모아 하나의 세계관을 만들고,
                <br />
                그 안에서 살아가는 캐릭터와 사건,
                <br />
                선택의 흐름을 설계합니다.
              </p>
              <p>
                기획, 스토리, 아트, 개발은
                <br />
                따로 떨어진 역할이 아니라
                <br />
                하나의 마을을 완성하는 조각입니다.
                <br />
                모닥불은 그 조각들이 맞물릴 때 생기는
                <br />
                작은 어긋남까지 게임의 이야기로 가져갑니다.
              </p>
            </div>
          </div>
          <Image
            src="/images/team-intro-2.png"
            alt="모닥불 팀원 소개 두 번째 이미지"
            width={992}
            height={1586}
            sizes="(min-width: 1024px) 448px, 94vw"
            className="mx-auto mt-14 w-full max-w-md rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.34)]"
          />
        </div>
      </section>

      <section id="game" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute inset-0 bg-[#241332]" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand-200/45" />
        <div className="relative mx-auto max-w-md">
          <SectionLabel>Game</SectionLabel>
          <div className="grid gap-12">
            <div>
              <p className="font-display text-lg text-brand-300">미스터리 스토리 게임</p>
              <h2 className="mt-3 font-display text-6xl leading-none text-white sm:text-8xl">
                틈
              </h2>
              <div className="mt-8 space-y-5 text-base font-medium leading-8 text-brand-50/83">
                <p>
                  주인공은 어느 날 갑자기
                  <br />
                  낯선 마을에 도착합니다.
                  <br />
                  처음에는 귀엽고 평범한 픽셀 마을처럼 보이지만,
                  <br />
                  그곳의 NPC들은 어딘가 이상합니다.
                </p>
                <p>
                  마을 사람들은 모두 하나씩
                  <br />
                  “틈”을 가지고 있습니다.
                  <br />
                  그리고 누군가는 그 틈을 파고들어,
                  <br />
                  그들을 조금씩 고장나게 만들었습니다.
                </p>
              </div>
              <Image
                src="/images/storyboard.png"
                alt="게임 틈의 스토리보드 이미지"
                width={864}
                height={1821}
                sizes="(min-width: 1024px) 448px, 94vw"
                className="mx-auto mt-10 w-full max-w-md rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="characters"
        className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#241332_0%,#12091f_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand-200/45" />
        <div className="relative mx-auto max-w-md">
          <SectionLabel>Character</SectionLabel>
          <div className="grid gap-8">
            <Image
              src="/images/aria-character-sheet.jpg"
              alt="게임 틈의 아리아 캐릭터 소개 시트"
              width={1280}
              height={853}
              sizes="(min-width: 1024px) 448px, 94vw"
              className="mx-auto w-full rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            />
            <Image
              src="/images/character-sheet-2.png"
              alt="게임 틈의 캐릭터 시트 두 번째 이미지"
              width={1076}
              height={1462}
              sizes="(min-width: 1024px) 448px, 94vw"
              className="mx-auto w-full rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            />
            <Image
              src="/images/character-motion.png"
              alt="게임 틈의 캐릭터 모션 이미지"
              width={864}
              height={1821}
              sizes="(min-width: 1024px) 448px, 94vw"
              className="mx-auto w-full rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            />
          </div>
          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3 sm:gap-6">
            <video
              src="/images/character-run.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[4/5] w-full rounded-sm border border-brand-200/28 bg-[#12091f] object-contain shadow-[0_18px_54px_rgba(0,0,0,0.3)]"
              aria-label="게임 틈 캐릭터 뛰는 모션"
            />
            <video
              src="/images/character-walk.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[4/5] w-full rounded-sm border border-brand-200/28 bg-[#12091f] object-contain shadow-[0_18px_54px_rgba(0,0,0,0.3)]"
              aria-label="게임 틈 캐릭터 걷는 모션"
            />
          </div>
        </div>
      </section>

      <section id="goods" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute inset-0 bg-[#12091f]" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand-200/45" />
        <div className="relative mx-auto max-w-md">
          <SectionLabel>Goods</SectionLabel>
          <Image
            src="/images/goods.png"
            alt="모닥불 굿즈 이미지"
            width={1023}
            height={1112}
            sizes="(min-width: 1024px) 448px, 94vw"
            className="mx-auto w-full max-w-md rounded-sm border border-brand-200/28 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          />
        </div>
      </section>

      <footer className="border-t border-brand-200/35 bg-[#12091f] px-5 py-8 text-center">
        <p className="font-display text-sm tracking-[0.26em] text-brand-200">
          모닥불 | 모여서 만드는 이야기
        </p>
      </footer>
    </main>
  );
}
