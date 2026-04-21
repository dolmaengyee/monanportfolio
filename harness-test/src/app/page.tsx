"use client"

import { useRouter } from "next/navigation"
import { IntroScreen } from "@/components/test/IntroScreen"
import { Footer } from "@/components/layout/Footer"

export default function HomePage() {
  const router = useRouter()

  const handleStart = (name: string, phone: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("participant-name", name)
      sessionStorage.setItem("participant-phone", phone)
    }
    router.push("/test")
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <IntroScreen onStart={handleStart} />
      </div>
      <Footer />
    </div>
  )
}
