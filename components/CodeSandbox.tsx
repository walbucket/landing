'use client'

import { useRef, useEffect, useState } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CodeSandboxProps {
  code: string
  language?: string
  onExecutionComplete?: (result: any) => void
  className?: string
  showConsole?: boolean
}

interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: number
}

/**
 * Enhanced Sandboxed Code Execution Environment
 * Uses iframe with strict CSP and sandbox attributes for secure code execution
 */
export function CodeSandbox({
  code,
  language = 'javascript',
  onExecutionComplete,
  className,
  showConsole = true,
}: CodeSandboxProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])

  useEffect(() => {
    if (!iframeRef.current || !code.trim()) return

    const iframe = iframeRef.current
    const iframeWindow = iframe.contentWindow
    if (!iframeWindow) return

    // Reset state
    setConsoleMessages([])
    setError(null)

    // Create sandboxed execution environment
    const executeCode = () => {
      setIsExecuting(true)

      try {
        // Create a sandboxed context with SDK mocks
        const sandboxedCode = `
          (function() {
            'use strict';
            
            // Mock Walbucket SDK for playground
            class MockWalbucket {
              constructor(config) {
                this.config = config;
                this.network = config?.network || 'testnet';
              }
              
              async upload(file, options = {}) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      assetId: '0x' + Math.random().toString(16).substr(2, 40),
                      url: 'https://walbucket.example.com/files/' + (options.name || 'file'),
                      metadata: {
                        name: options.name || 'file',
                        size: file?.size || 0,
                        contentType: file?.type || 'application/octet-stream',
                        createdAt: new Date().toISOString(),
                      },
                      policyId: options.encryption ? 'policy_' + Math.random().toString(16).substr(2, 8) : null,
                    });
                  }, 500);
                });
              }
              
              async retrieve(assetId) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      url: 'https://walbucket.example.com/files/' + assetId,
                      metadata: {
                        name: 'retrieved-file',
                        size: 1024,
                        contentType: 'application/octet-stream',
                        createdAt: new Date().toISOString(),
                      },
                      data: new Blob(['Mock file data'], { type: 'text/plain' }),
                    });
                  }, 300);
                });
              }
              
              async delete(assetId) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({ success: true, assetId });
                  }, 300);
                });
              }
            }
            
            // Make Walbucket available globally
            if (typeof window !== 'undefined') {
              window.Walbucket = MockWalbucket;
            }
            
            // Enhanced console with message passing
            const originalConsole = {
              log: console.log,
              error: console.error,
              warn: console.warn,
              info: console.info,
            };
            
            const sendMessage = (type, ...args) => {
              const message = args.map(arg => {
                if (typeof arg === 'object') {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch {
                    return String(arg);
                  }
                }
                return String(arg);
              }).join(' ');
              
              window.parent.postMessage({
                type: 'console-' + type,
                data: message,
                timestamp: Date.now(),
              }, '*');
            };
            
            const console = {
              log: (...args) => {
                originalConsole.log(...args);
                sendMessage('log', ...args);
              },
              error: (...args) => {
                originalConsole.error(...args);
                sendMessage('error', ...args);
              },
              warn: (...args) => {
                originalConsole.warn(...args);
                sendMessage('warn', ...args);
              },
              info: (...args) => {
                originalConsole.info(...args);
                sendMessage('info', ...args);
              },
            };
            
            // Transform TypeScript/ES6 imports to work in sandbox
            let transformedCode = ${JSON.stringify(code)};
            
            // Handle import statements - convert to require-like or mock
            transformedCode = transformedCode.replace(
              /import\\s+.*?from\\s+['"]@walbucket\\/sdk['"];?/g,
              '// Import handled by sandbox - Walbucket is available globally'
            );
            
            transformedCode = transformedCode.replace(
              /import\\s+.*?from\\s+['"]@mysten\\/dapp-kit['"];?/g,
              '// Import handled by sandbox - wallet integration mocked'
            );
            
            // Wrap in async function to handle top-level await
            const wrappedCode = \`
              (async function() {
                try {
                  \${transformedCode}
                } catch (err) {
                  window.parent.postMessage({
                    type: 'execution-error',
                    data: err.message + '\\n' + err.stack,
                    timestamp: Date.now(),
                  }, '*');
                }
              })();
            \`;
            
            // Execute the code
            try {
              eval(wrappedCode);
            } catch (err) {
              window.parent.postMessage({
                type: 'execution-error',
                data: err.message + '\\n' + err.stack,
                timestamp: Date.now(),
              }, '*');
            }
          })();
        `

        // Write to iframe with enhanced CSP
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (iframeDoc) {
          iframeDoc.open()
          iframeDoc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta http-equiv="Content-Security-Policy" content="
                  default-src 'self';
                  script-src 'unsafe-inline' 'unsafe-eval';
                  style-src 'unsafe-inline';
                  connect-src 'none';
                  frame-src 'none';
                  object-src 'none';
                  base-uri 'self';
                  form-action 'none';
                ">
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: system-ui, -apple-system, sans-serif;
                    background: transparent;
                    overflow: hidden;
                  }
                </style>
              </head>
              <body>
                <script>
                  ${sandboxedCode}
                </script>
              </body>
            </html>
          `)
          iframeDoc.close()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Execution failed')
        setIsExecuting(false)
        onExecutionComplete?.({ type: 'error', output: err instanceof Error ? err.message : 'Execution failed' })
      }
    }

    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      // Security: Only accept messages from our iframe
      if (event.source !== iframe.contentWindow) return

      const { type, data, timestamp } = event.data

      if (type === 'console-log') {
        setConsoleMessages(prev => [...prev, { type: 'log', message: data, timestamp: timestamp || Date.now() }])
        onExecutionComplete?.({ type: 'success', output: data })
      } else if (type === 'console-error') {
        setConsoleMessages(prev => [...prev, { type: 'error', message: data, timestamp: timestamp || Date.now() }])
        setError(data)
        onExecutionComplete?.({ type: 'error', output: data })
      } else if (type === 'console-warn') {
        setConsoleMessages(prev => [...prev, { type: 'warn', message: data, timestamp: timestamp || Date.now() }])
      } else if (type === 'console-info') {
        setConsoleMessages(prev => [...prev, { type: 'info', message: data, timestamp: timestamp || Date.now() }])
      } else if (type === 'execution-error') {
        setError(data)
        setConsoleMessages(prev => [...prev, { type: 'error', message: data, timestamp: timestamp || Date.now() }])
        onExecutionComplete?.({ type: 'error', output: data })
      }
      
      setIsExecuting(false)
    }

    window.addEventListener('message', handleMessage)
    executeCode()

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [code, onExecutionComplete])

  const clearConsole = () => {
    setConsoleMessages([])
    setError(null)
  }

  return (
    <div className={cn('relative w-full h-full flex flex-col', className)}>
      {/* Execution Status */}
      {isExecuting && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            // @ts-ignore - Mozilla vendor prefix
            MozBackdropFilter: 'blur(4px)',
          } as React.CSSProperties}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Executing code...</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && !isExecuting && (
        <Alert variant="destructive" className="mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Execution Error</AlertTitle>
          <AlertDescription className="font-mono text-xs whitespace-pre-wrap">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Sandbox Iframe */}
      <iframe
        ref={iframeRef}
        className="w-full flex-1 border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Code Sandbox"
        style={{ display: 'block', minHeight: '200px' }}
        aria-label="Code execution sandbox"
      />

      {/* Console Output */}
      {showConsole && consoleMessages.length > 0 && (
        <div className="mt-2 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground">Console Output</span>
            <button
              onClick={clearConsole}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear console"
            >
              Clear
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto p-2 space-y-1">
            {consoleMessages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'text-xs font-mono whitespace-pre-wrap break-words',
                  msg.type === 'error' && 'text-destructive',
                  msg.type === 'warn' && 'text-yellow-500',
                  msg.type === 'info' && 'text-blue-500',
                  msg.type === 'log' && 'text-foreground'
                )}
              >
                <span className="opacity-60">[{new Date(msg.timestamp).toLocaleTimeString()}]</span>{' '}
                <span className={cn(
                  'font-semibold',
                  msg.type === 'error' && 'text-destructive',
                  msg.type === 'warn' && 'text-yellow-500',
                  msg.type === 'info' && 'text-blue-500'
                )}>
                  {msg.type.toUpperCase()}:
                </span>{' '}
                {msg.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
