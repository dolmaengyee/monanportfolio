"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Question } from "@/data/questions"
import type { TypeCode } from "@/data/questions"

interface QuestionCardProps {
  question: Question
  onAnswer: (type: TypeCode) => void
  questionIndex: number
}

export function QuestionCard({
  question,
  onAnswer,
  questionIndex,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-md mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl font-bold text-white text-center mb-8 leading-relaxed"
        >
          {question.question}
        </motion.h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => (
            <motion.button
              key={`${question.id}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(option.type)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/90 hover:border-brand-400/50 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
            >
              <span className="text-base leading-relaxed">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
