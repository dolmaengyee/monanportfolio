"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Question, LikertScore } from "@/data/questions"
import { likertLabels } from "@/data/questions"

interface QuestionCardProps {
  question: Question
  questionIndex: number
  onAnswer: (score: LikertScore) => void
}

const scores: LikertScore[] = [1, 2, 3, 4]

export function QuestionCard({ question, questionIndex, onAnswer }: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full max-w-md mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs text-white/40 text-center mb-4 uppercase tracking-wider"
        >
          Q{questionIndex + 1}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl md:text-2xl font-bold text-white text-center mb-10 leading-relaxed"
        >
          {question.text}
        </motion.h2>

        {/* Likert scale */}
        <div className="flex gap-2">
          {scores.map((score, idx) => (
            <motion.button
              key={score}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.06 }}
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onAnswer(score)}
              className="flex-1 flex flex-col items-center gap-2 px-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:border-brand-400/50 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
            >
              <span className="text-2xl font-bold">{score}</span>
              <span className="text-xs text-white/50 leading-tight text-center">
                {likertLabels[score]}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between mt-4 px-1"
        >
          <span className="text-xs text-white/30">전혀 아니다</span>
          <span className="text-xs text-white/30">매우 그렇다</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
