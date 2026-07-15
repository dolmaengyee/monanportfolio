"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IntroScreen } from "@/components/test/IntroScreen"
import { ParticipantForm } from "@/components/test/ParticipantForm"
import { Footer } from "@/components/layout/Footer"

/**
 * 2-step entry flow:
 *   step 1 "intro" — IntroScreen (copy + single CTA, no inputs)
 *   step 2 "info"  — ParticipantForm (name/phone + REQUIRED consent)
 * This order is a flow invariant — intro always comes before the info form.
 */
type Step = "intro" | "info"

export default function HomePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("intro")

  const handleSubmit = (name: string, phone: string, consentedAt: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("participant-name", name)
      sessionStorage.setItem("participant-phone", phone)
      sessionStorage.setItem("participant-consented-at", consentedAt)
    }
    router.push("/test")
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        {step === "intro" ? (
          <IntroScreen onStart={() => setStep("info")} />
        ) : (
          <ParticipantForm
            onSubmit={handleSubmit}
            onBack={() => setStep("intro")}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}
