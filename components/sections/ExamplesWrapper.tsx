import { highlightCode } from '@/lib/shiki'
import { Examples } from './Examples'

interface ExampleData {
  id: string
  title: string
  description: string
  icon: string
  category: string
  code: string
  highlightedCode?: string
  href: string
  color: string
}

const exampleDefinitions: Omit<ExampleData, 'highlightedCode'>[] = [
  {
    id: 'basic-upload',
    title: 'Basic Upload',
    description: 'Upload files to decentralized storage with a simple API call',
    icon: 'FileText',
    category: 'Getting Started',
    code: `const result = await walbucket.upload(file, {
  name: 'my-image.jpg',
  folder: 'products',
});`,
    href: '/docs/examples/basic-upload',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'with-encryption',
    title: 'With Encryption',
    description: 'Upload files with wallet-gated encryption for secure access',
    icon: 'Shield',
    category: 'Security',
    code: `const result = await walbucket.upload(file, {
  encryption: true,
  policy: {
    allowedWallets: ['0x...'],
  },
});`,
    href: '/docs/examples/with-encryption',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'wallet-integration',
    title: 'Wallet Integration',
    description: 'Integrate with Sui wallets for user-pays gas strategy',
    icon: 'Code2',
    category: 'Advanced',
    code: `const walbucket = new Walbucket({
  gasStrategy: 'user-pays',
  userSigner: walletSigner,
});`,
    href: '/docs/examples/wallet-integration',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'retrieve-delete',
    title: 'Retrieve & Delete',
    description: 'Retrieve and delete files from decentralized storage',
    icon: 'Zap',
    category: 'Operations',
    code: `const file = await walbucket.retrieve(assetId);
await walbucket.delete(assetId);`,
    href: '/docs/api/retrieve',
    color: 'from-orange-500 to-red-500',
  },
]

/**
 * Server component wrapper that pre-highlights code examples
 */
export async function ExamplesWrapper() {
  // Pre-highlight all code examples
  const examplesWithHighlighting = await Promise.all(
    exampleDefinitions.map(async (example) => ({
      ...example,
      highlightedCode: await highlightCode(example.code, 'typescript'),
    }))
  )

  return <Examples examples={examplesWithHighlighting} />
}