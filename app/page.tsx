import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { QuickStart } from '@/components/sections/QuickStart'
import { Examples } from '@/components/sections/Examples'
import { Comparison } from '@/components/sections/Comparison'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <QuickStart />
      <Examples />
      <Comparison />
      <Stats />
      <CTA />
    </>
  )
}
