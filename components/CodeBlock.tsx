'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/copy'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
  highlightedCode?: string // Pre-highlighted HTML from Shiki
  'aria-labelledby'?: string
  ariaLabelledBy?: string // Alias for aria-labelledby
}

/**
 * CodeBlock Component
 * Displays code with syntax highlighting and copy functionality
 */
export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  highlightedCode,
  'aria-labelledby': ariaLabelledByProp,
  ariaLabelledBy,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const ariaLabelledByValue = ariaLabelledBy || ariaLabelledByProp || undefined

  const handleCopy = async () => {
    try {
      await copyToClipboard(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className={cn('relative group', className)} role="region" aria-labelledby={ariaLabelledByValue} aria-label={ariaLabelledByValue ? undefined : `Code block in ${language}`}>
      {/* Filename */}
      {filename && (
        <div className="px-4 py-2 bg-muted border-b border-border text-sm text-muted-foreground font-mono" role="textbox" aria-label={`Filename: ${filename}`}>
          {filename}
        </div>
      )}

      {/* Code Container */}
      <div className="relative bg-[#1e1e1e] dark:bg-[#1e1e1e] rounded-lg overflow-hidden border border-border" role="code" aria-label={`${language} code`}>
        {/* Copy Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            // @ts-ignore - Mozilla vendor prefix
            MozBackdropFilter: 'blur(4px)',
          } as React.CSSProperties}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Code */}
        <div className="p-4 overflow-x-auto text-sm font-mono" role="textbox" aria-readonly="true">
          {highlightedCode ? (
            <div
              className="shiki-wrapper"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              aria-label={`${language} code`}
            />
          ) : (
            <pre className="text-[#d4d4d4]" aria-label={`${language} code`}>
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Language Badge */}
      <div 
        className="absolute bottom-2 right-2 px-2 py-1 bg-muted/80 rounded text-xs text-muted-foreground font-mono"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          // @ts-ignore - Mozilla vendor prefix
          MozBackdropFilter: 'blur(4px)',
        } as React.CSSProperties}
      >
        {language}
      </div>
    </div>
  )
}
