import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The documentation page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/docs">Go to Documentation</Link>
      </Button>
    </div>
  )
}
