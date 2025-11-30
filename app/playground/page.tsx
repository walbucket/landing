import { Suspense } from 'react'
import { Demo } from '@/components/sections/Demo'

function PlaygroundContent() {
  return <Demo />
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading playground...</div>
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  )
}
