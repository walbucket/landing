'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Code2, Zap, FileText, Shield } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { CodeEditor } from '@/components/CodeEditor'
import { CodeSandbox } from '@/components/CodeSandbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SceneCanvas } from '@/components/three/Canvas'
import { LazyNetworkDiagram } from '@/components/three/LazyNetworkDiagram'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, CheckCircle2, XCircle, Terminal } from 'lucide-react'
import { fadeInUp } from '@/lib/transitions'

// Example code templates - matching Examples section
const codeTemplates = {
  'basic-upload': `import { Walbucket } from '@walbucket/sdk';

// Initialize SDK
const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  sponsorPrivateKey: 'your-private-key',
});

// Upload a file
const file = document.getElementById('fileInput').files[0];
const result = await walbucket.upload(file, {
  name: 'my-image.jpg',
  folder: 'products',
});

console.log('Uploaded!', result.url);
console.log('Asset ID:', result.assetId);`,

  'with-encryption': `import { Walbucket } from '@walbucket/sdk';

const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  sponsorPrivateKey: 'your-private-key',
});

// Upload with encryption
const file = document.getElementById('fileInput').files[0];
const result = await walbucket.upload(file, {
  name: 'secret-document.pdf',
  encryption: true,
  policy: {
    allowedWallets: ['0x...'], // Only these wallets can decrypt
  },
});

console.log('Encrypted file uploaded:', result.url);`,

  'wallet-integration': `import { Walbucket } from '@walbucket/sdk';
import { WalletContextProvider, useWallet } from '@mysten/dapp-kit';

// Initialize SDK with user-pays gas strategy
const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  gasStrategy: 'user-pays',
  userSigner: walletSigner, // From wallet connection
});

// Upload with user paying gas
const result = await walbucket.upload(file, {
  name: 'my-file.jpg',
});

console.log('Uploaded! User paid gas fees.');`,

  'retrieve-delete': `import { Walbucket } from '@walbucket/sdk';

const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  sponsorPrivateKey: 'your-private-key',
});

// Retrieve a file by asset ID
const assetId = '0x1234567890abcdef...';
const result = await walbucket.retrieve(assetId);

console.log('File URL:', result.url);
console.log('Metadata:', result.metadata);
console.log('File data:', result.data);

// Delete the file
await walbucket.delete(assetId);
console.log('File deleted successfully');`,
}

const examples = [
  {
    id: 'basic-upload',
    title: 'Basic Upload',
    description: 'Upload files to decentralized storage',
    icon: FileText,
    code: codeTemplates['basic-upload'],
  },
  {
    id: 'with-encryption',
    title: 'With Encryption',
    description: 'Upload files with wallet-gated encryption',
    icon: Shield,
    code: codeTemplates['with-encryption'],
  },
  {
    id: 'wallet-integration',
    title: 'Wallet Integration',
    description: 'Integrate with Sui wallets for user-pays gas',
    icon: Code2,
    code: codeTemplates['wallet-integration'],
  },
  {
    id: 'retrieve-delete',
    title: 'Retrieve & Delete',
    description: 'Retrieve and delete files from storage',
    icon: Zap,
    code: codeTemplates['retrieve-delete'],
  },
]

/**
 * Interactive Demo Section
 * Split-screen layout with code editor and visualization
 */
export function Demo() {
  const searchParams = useSearchParams()
  const exampleParam = searchParams.get('example')
  
  // Find initial example from URL or default to first
  const initialExample = examples.find(e => e.id === exampleParam) || examples[0]
  
  const [selectedExample, setSelectedExample] = useState(initialExample)
  const [code, setCode] = useState(initialExample.code)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  // Update when URL param changes
  useEffect(() => {
    if (exampleParam) {
      const example = examples.find(e => e.id === exampleParam)
      if (example) {
        setSelectedExample(example)
        setCode(example.code)
      }
    }
  }, [exampleParam])

  const handleExampleChange = (example: typeof examples[0]) => {
    setSelectedExample(example)
    setCode(example.code)
    // Update URL without page reload
    window.history.pushState({}, '', `/playground?example=${example.id}`)
  }

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  const [executionResult, setExecutionResult] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [showSandbox, setShowSandbox] = useState(false)
  const [sandboxCode, setSandboxCode] = useState('')

  const handleRun = async (codeToRun: string) => {
    setIsExecuting(true)
    setExecutionResult(null)
    setSandboxCode(codeToRun)
    setShowSandbox(true)
    
    // Animate network diagram based on code
    if (codeToRun.includes('upload') && !codeToRun.includes('encryption')) {
      setActiveNode('walbucket')
      setTimeout(() => setActiveNode('walrus'), 500)
      setTimeout(() => setActiveNode('sui'), 1000)
    } else if (codeToRun.includes('retrieve') || codeToRun.includes('delete')) {
      setActiveNode('sui')
      setTimeout(() => setActiveNode('walbucket'), 500)
    } else if (codeToRun.includes('encryption')) {
      setActiveNode('seal')
      setTimeout(() => setActiveNode('walbucket'), 500)
      setTimeout(() => setActiveNode('walrus'), 1000)
    } else if (codeToRun.includes('wallet') || codeToRun.includes('userSigner')) {
      setActiveNode('walbucket')
      setTimeout(() => setActiveNode('sui'), 500)
    } else {
      setActiveNode('walbucket')
    }
    
    // Reset animation after a delay
    setTimeout(() => {
      setActiveNode(null)
    }, 2000)
  }

  const handleExecutionComplete = (result: any) => {
    setIsExecuting(false)
    setExecutionResult({
      type: result.type === 'error' ? 'error' : 'success',
      message: result.type === 'error' 
        ? `Execution error: ${result.output}`
        : 'Code executed successfully. Check console output below.',
      note: 'Note: This playground uses a mocked SDK. Actual SDK calls require valid API keys and network configuration.',
    })
  }

  return (
    <Section
      id="playground"
      variant="fadeInUp"
      className="min-h-screen py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Try It Live
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experiment with Walbucket SDK in your browser. See how easy it is to integrate decentralized storage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Code Editor Side */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
                <CardDescription>
                  Select an example or write your own code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Example Selector */}
                <Tabs
                  value={selectedExample.id}
                  onValueChange={(value) => {
                    const example = examples.find(e => e.id === value)
                    if (example) handleExampleChange(example)
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                    {examples.map((example) => {
                      const Icon = example.icon
                      return (
                        <TabsTrigger
                          key={example.id}
                          value={example.id}
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{example.title}</span>
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                  
                  {/* Tab Content for each example */}
                  {examples.map((example) => (
                    <TabsContent key={example.id} value={example.id} className="mt-0">
                      <div className="text-sm text-muted-foreground mb-2">
                        {example.description}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Code Editor */}
                <CodeEditor
                  code={code}
                  language="typescript"
                  onChange={handleCodeChange}
                  onRun={handleRun}
                  height="400px"
                  showRunButton={true}
                />

                {/* Execution Result */}
                {executionResult && (
                  <Alert
                    variant={
                      executionResult.type === 'error'
                        ? 'destructive'
                        : executionResult.type === 'success'
                        ? 'default'
                        : 'default'
                    }
                    className="mt-4"
                  >
                    {executionResult.type === 'error' ? (
                      <XCircle className="h-4 w-4" />
                    ) : executionResult.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Info className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {executionResult.type === 'error'
                        ? 'Execution Error'
                        : executionResult.type === 'success'
                        ? 'Execution Successful'
                        : 'Execution Info'}
                    </AlertTitle>
                    <AlertDescription>
                      {executionResult.message}
                      {executionResult.note && (
                        <div className="mt-2 text-xs opacity-80">
                          {executionResult.note}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Code Sandbox */}
                {showSandbox && sandboxCode && (
                  <div className="mt-4">
                    <Card>
                      <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <Terminal className="h-4 w-4" />
                              <CardTitle className="text-sm">Code Execution</CardTitle>
                            </div>
                            <CardDescription className="text-xs">
                              Code runs in a secure sandboxed environment
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <CodeSandbox
                              code={sandboxCode}
                              language="typescript"
                              onExecutionComplete={handleExecutionComplete}
                              showConsole={true}
                              className="min-h-[300px]"
                            />
                          </CardContent>
                        </Card>
                      </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Visualization Side */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Network Visualization</CardTitle>
                <CardDescription>
                  See how your code interacts with the Sui blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] rounded-lg bg-muted/30 border border-border overflow-hidden">
                  <SceneCanvas className="w-full h-full">
                    <LazyNetworkDiagram
                      activeConnection={activeNode}
                      onNodeClick={(nodeId) => {
                        setActiveNode(nodeId)
                        setTimeout(() => setActiveNode(null), 2000)
                      }}
                      animated={true}
                    />
                  </SceneCanvas>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
