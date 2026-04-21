"use client"

import { useRouter } from "next/navigation"
import { IntroScreen } from "@/components/test/IntroScreen"
import { Footer } from "@/components/layout/Footer"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <IntroScreen onStart={() => router.push("/test")} />
      </div>
      <Footer />
    </div>
  )
}
