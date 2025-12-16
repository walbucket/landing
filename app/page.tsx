import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { QuickStart } from '@/components/sections/QuickStart'
import { ExamplesWrapper } from '@/components/sections/ExamplesWrapper'
import { Comparison } from '@/components/sections/Comparison'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <QuickStart />
      <ExamplesWrapper />
      <Comparison />
      <Stats />
      <CTA />
    </>
  )
}
