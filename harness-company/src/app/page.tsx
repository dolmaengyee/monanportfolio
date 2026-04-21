import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

/* ── Home Page ───────────────────────────────────────
 *  Assembles all marketing sections into a single scroll.
 *  Reorder or remove sections as needed.
 * ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  )
}
