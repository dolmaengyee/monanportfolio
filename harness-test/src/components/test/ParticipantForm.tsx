"use client"

/**
 * ParticipantForm — step 2 of the 2-step entry flow (participant info + consent).
 *
 * DESIGN NOTE: This file ships with minimal neutral styling on purpose.
 * The designer replaces the layout, colors, typography, and motion based
 * on the project's mood (see .harness/agents/designer.md).
 *
 * What MUST stay (legal / flow invariants — do NOT remove):
 *  - This is the SECOND step, shown only after the intro CTA.
 *  - name is REQUIRED, phone is OPTIONAL.
 *  - The privacy-consent checkbox is REQUIRED and must NEVER be pre-checked
 *    or removed. Submit stays disabled until name is filled AND consent is checked.
 *  - onSubmit(name, phone, consentedAt) passes an ISO consent timestamp.
 *  - onBack returns to the intro step.
 */

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ParticipantFormProps {
  onSubmit: (name: string, phone: string, consentedAt: string) => void
  onBack: () => void
}

export function ParticipantForm({ onSubmit, onBack }: ParticipantFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [consented, setConsented] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)
  const [error, setError] = useState("")

  const canSubmit = name.trim().length > 0 && consented

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("이름을 입력해주세요")
      return
    }
    if (!consented) {
      setError("개인정보 수집·이용에 동의해주세요")
      return
    }
    onSubmit(name.trim(), phone.trim(), new Date().toISOString())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <div>
          <input
            type="text"
            placeholder="이름 (필수)"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
            className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <input
          type="tel"
          placeholder="연락처 (선택)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
        />

        {/* Privacy consent — REQUIRED. Never pre-check this box. */}
        <div className="border border-neutral-300 rounded-md p-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => {
                setConsented(e.target.checked)
                setError("")
              }}
              className="mt-0.5 w-4 h-4 shrink-0 accent-neutral-900"
            />
            <span className="text-sm text-neutral-800">
              개인정보 수집·이용에 동의합니다 (필수)
            </span>
          </label>

          <button
            type="button"
            onClick={() => setShowPolicy((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            수집 내용 자세히 보기
            {showPolicy ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/*
            DESIGN NOTE / BUILDER: Customize this privacy notice for each project.
            Adjust the collected items, purpose, and especially the retention
            period to match the actual data policy before going live.
          */}
          {showPolicy && (
            <dl className="mt-3 space-y-2 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
              <div>
                <dt className="font-medium text-neutral-800">수집 항목</dt>
                <dd>이름, 연락처</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-800">수집 목적</dt>
                <dd>테스트 결과 저장 및 안내</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-800">보유 기간</dt>
                <dd>수집일로부터 1년 또는 삭제 요청 시까지</dd>
              </div>
            </dl>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm text-left">{error}</p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full px-5 py-3 rounded-md bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          테스트 시작하기
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full px-5 py-3 rounded-md border border-neutral-300 text-neutral-700 hover:border-neutral-900 transition-colors"
        >
          이전으로
        </button>
      </form>
    </div>
  )
}
