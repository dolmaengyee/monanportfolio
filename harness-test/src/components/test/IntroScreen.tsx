"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { testConfig } from "@/data/config"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

interface IntroScreenProps {
  onStart: (name: string, phone: string) => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("이름을 입력해주세요")
      return
    }
    onStart(name.trim(), phone.trim())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
      <AnimatedSection delay={0}>
        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        >
          🌀
        </motion.div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          {testConfig.title}
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="text-lg text-white/70 mb-2">{testConfig.subtitle}</p>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <p className="text-sm text-white/50 mb-8 max-w-sm">{testConfig.description}</p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
          <div>
            <input
              type="text"
              placeholder="이름 (필수)"
              value={name}
              onChange={(e) => { setName(e.target.value); setError("") }}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-400/60 transition-colors"
            />
            {error && <p className="text-red-400 text-sm mt-1 text-left">{error}</p>}
          </div>

          <input
            type="tel"
            placeholder="연락처 (선택)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-400/60 transition-colors"
          />

          <Button type="submit" size="lg" className="w-full">
            테스트 시작하기
          </Button>
        </form>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <p className="text-xs text-white/30 mt-6">
          약 5분 소요 | 총 {testConfig.questionCount}문항
        </p>
      </AnimatedSection>
    </div>
  )
}
