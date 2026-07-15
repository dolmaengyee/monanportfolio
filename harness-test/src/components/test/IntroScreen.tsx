"use client"

/**
 * IntroScreen — step 1 of the 2-step entry flow (pure intro, no inputs).
 *
 * DESIGN NOTE: This file ships with minimal neutral styling on purpose.
 * The designer replaces the layout, colors, typography, and motion based
 * on the project's mood (see .harness/agents/designer.md).
 *
 * What MUST stay:
 *  - This is the FIRST step. It shows intro copy only and a single CTA.
 *    Name/phone/consent inputs live in step 2 (ParticipantForm) — never
 *    merge them back into this screen.
 *  - onStart() advances to the participant-info step.
 *  - testConfig.title / subtitle / description / questionCount are read from data.
 */

import { testConfig } from "@/data/config"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
        {testConfig.title}
      </h1>

      <p className="text-lg text-neutral-700 mb-2">{testConfig.subtitle}</p>

      <p className="text-sm text-neutral-500 mb-8 max-w-sm">
        {testConfig.description}
      </p>

      <button
        type="button"
        onClick={onStart}
        className="w-full max-w-sm px-5 py-3 rounded-md bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
      >
        시작하기
      </button>

      <p className="text-xs text-neutral-400 mt-6">
        약 5분 소요 · 총 {testConfig.questionCount}문항
      </p>
    </div>
  )
}
