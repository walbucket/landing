import { highlightCode } from '@/lib/shiki'
import { CodeBlock } from './CodeBlock'

interface HighlightedCodeBlockProps {
  code: string
  language: string
}

/**
 * Server component that highlights code and passes it to CodeBlock
 */
export async function HighlightedCodeBlock({ code, language }: HighlightedCodeBlockProps) {
  const highlightedCode = await highlightCode(code, language)
  return <CodeBlock code={code} language={language} highlightedCode={highlightedCode} />
}
