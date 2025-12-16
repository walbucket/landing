'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { ReactNode } from 'react'
import { highlightCode } from '@/lib/shiki'

interface MacOSWindowProps {
  children: ReactNode
  title: string
}

interface CodeBlockProps {
  code: string
  language: string
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

const installationCode = {
  pnpm: 'pnpm add @walbucket/sdk',
  npm: 'npm install @walbucket/sdk',
  yarn: 'yarn add @walbucket/sdk',
} as const

const quickStartCode = `import { Walbucket } from '@walbucket/sdk';

// Initialize SDK
const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  sponsorPrivateKey: 'your-private-key',
});
// Upload a file
const result = await walbucket.upload(file, {
  name: 'my-image.jpg',
  folder: 'products',
});
console.log(result.assetId); // Sui object ID
console.log(result.url); // Automatically generated file URL
// Retrieve a file
const retrieveResult = await walbucket.retrieve(result.assetId);
console.log('File data:', retrieveResult.data);
console.log('File URL:', retrieveResult.url);`

// macOS Window Component
function MacOSWindow({ children, title }: MacOSWindowProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(typeof children === 'string' ? children : '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
      {/* macOS Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          {/* Traffic Light Buttons */}
          <div className="flex gap-2">
            <button 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-lg"
              aria-label="Close"
            />
            <button 
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-lg"
              aria-label="Minimize"
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg"
              aria-label="Maximize"
            />
          </div>
        </div>
        
        {/* Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-400 font-medium">
          {title}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-700/50"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

// Code Block Component with Syntax Highlighting
function CodeBlock({ code, language }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('')

  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await highlightCode(code, language)
        setHighlightedCode(html)
      } catch (error) {
        console.error('Failed to highlight code:', error)
        // Fallback to plain text
        setHighlightedCode(`<pre><code>${code}</code></pre>`)
      }
    }
    
    highlight()
  }, [code, language])

  if (!highlightedCode) {
    // Loading state - show plain text
    return (
      <pre className="text-sm leading-relaxed">
        <code className="text-gray-100 font-mono">
          {code}
        </code>
      </pre>
    )
  }

  return (
    <div 
      className="text-sm leading-relaxed shiki-wrapper"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  )
}

// Tab Component
function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        active
          ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      {children}
    </button>
  )
}

export function QuickStart() {
  const [activeTab, setActiveTab] = useState<keyof typeof installationCode>('pnpm')

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Get Started in Minutes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Install the SDK and start uploading files in just a few lines of code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Installation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
              Installation
            </h3>
            
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-4 bg-gray-900/50 p-1 rounded-lg backdrop-blur-sm border border-gray-800">
              {(Object.keys(installationCode) as Array<keyof typeof installationCode>).map((key) => (
                <TabButton
                  key={key}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  {key}
                </TabButton>
              ))}
            </div>

            {/* Code Window */}
            <MacOSWindow title={`${activeTab}.sh`}>
              <CodeBlock code={installationCode[activeTab]} language="bash" />
            </MacOSWindow>
          </motion.div>

          {/* Quick Start Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
              Quick Start
            </h3>
            <MacOSWindow title="example.ts">
              <CodeBlock code={quickStartCode} language="typescript" />
            </MacOSWindow>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              View Full Documentation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}