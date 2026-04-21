"use client"

import { motion } from "framer-motion"
import { testConfig } from "@/data/config"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <AnimatedSection delay={0}>
        <motion.div
          className="text-6xl mb-6"
          animate={{
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          ⚡
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
        <p className="text-sm text-white/50 mb-10 max-w-sm">
          {testConfig.description}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <Button size="lg" onClick={onStart}>
          테스트 시작하기
        </Button>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <p className="text-xs text-white/30 mt-8">
          약 2분 소요 | 총 {testConfig.questionCount}문항
        </p>
      </AnimatedSection>
    </div>
  )
}
