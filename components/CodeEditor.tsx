'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Play, Copy, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/lib/copy'
import { motion, AnimatePresence } from 'framer-motion'

// Dynamically import Monaco Editor with SSR disabled
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
})

export interface CodeEditorProps {
  code: string
  language?: string
  onChange?: (value: string) => void
  onRun?: (code: string) => void | Promise<void>
  readOnly?: boolean
  className?: string
  height?: string
  showRunButton?: boolean
}

/**
 * Code Editor Component using Monaco Editor
 * Provides syntax highlighting, editing, and execution capabilities
 */
export function CodeEditor({
  code,
  language = 'typescript',
  onChange,
  onRun,
  readOnly = false,
  className,
  height = '400px',
  showRunButton = true,
}: CodeEditorProps) {
  const [value, setValue] = useState(code)
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const editorRef = useRef<any>(null)

  const handleChange = (newValue: string | undefined) => {
    const codeValue = newValue || ''
    setValue(codeValue)
    onChange?.(codeValue)
  }

  const handleRun = async () => {
    if (!onRun) return
    
    setIsRunning(true)
    try {
      await onRun(value)
    } catch (error) {
      console.error('Execution error:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const handleCopy = async () => {
    await copyToClipboard(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
    })

    // Set theme
    monaco.editor.setTheme('vs-dark')
  }

  return (
    <div className={cn('relative flex flex-col border border-border rounded-lg overflow-hidden bg-[#1e1e1e]', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
            title="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          {showRunButton && onRun && (
            <Button
              variant="default"
              size="sm"
              onClick={handleRun}
              disabled={isRunning || readOnly}
              className="h-7 gap-1.5"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Run</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1" style={{ height }}>
        <Editor
          height={height}
          language={language}
          value={value}
          onChange={handleChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  )
}
