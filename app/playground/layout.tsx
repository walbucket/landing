import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playground - Walbucket SDK',
  description: 'Try Walbucket SDK in your browser with our interactive playground',
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
