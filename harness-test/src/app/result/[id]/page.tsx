import { notFound } from "next/navigation"
import { getResultById } from "@/lib/supabase"
import { results } from "@/data/results"
import { ResultCard } from "@/components/test/ResultCard"
import { Footer } from "@/components/layout/Footer"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const row = await getResultById(id)
  if (!row) return { title: "결과를 찾을 수 없어요" }
  const result = results[row.final_type]
  return {
    title: `${row.name}님의 성향 결과 — ${result.name}`,
    description: result.tagline,
    openGraph: {
      title: `${result.name} — 성향 결과`,
      description: result.description.slice(0, 100),
    },
  }
}

export default async function SharedResultPage({ params }: Props) {
  const { id } = await params
  const row = await getResultById(id)
  if (!row) notFound()

  const result = results[row.final_type]

  return (
    <div className="flex-1 flex flex-col">
      <div className="pt-10 pb-4 text-center">
        <p className="text-neutral-500 text-sm">
          <span className="font-semibold text-neutral-900">{row.name}</span>님의 성향 결과
        </p>
      </div>

      <div className="flex-1 flex items-start justify-center py-6">
        <ResultCard result={result} resultId={id} isSharedView />
      </div>

      <Footer />
    </div>
  )
}
