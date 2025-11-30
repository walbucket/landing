import { notFound, redirect } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { mdxOptions, mdxComponents } from '@/lib/mdx'
import { HighlightedCodeBlock } from '@/components/HighlightedCodeBlock'

interface DocsPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

/**
 * Get MDX file path from slug
 */
async function getMdxPath(slug: string[] = []): Promise<string | null> {
  const basePath = join(process.cwd(), 'content', 'docs')
  
  if (slug.length === 0) {
    // Default to index page
    const indexPath = join(basePath, 'index.mdx')
    try {
      await readFile(indexPath)
      return indexPath
    } catch {
      // Fallback to installation
      const defaultPath = join(basePath, 'installation.mdx')
      try {
        await readFile(defaultPath)
        return defaultPath
      } catch {
        return null
      }
    }
  }

  const filePath = join(basePath, ...slug) + '.mdx'
  try {
    await readFile(filePath)
    return filePath
  } catch {
    // Try as directory with index.mdx
    const indexPath = join(basePath, ...slug, 'index.mdx')
    try {
      await readFile(indexPath)
      return indexPath
    } catch {
      return null
    }
  }
}

/**
 * Documentation page with dynamic routing
 */
export default async function DocsPage({ params }: DocsPageProps) {
  const { slug = [] } = await params
  
  // Redirect empty slug to installation
  if (slug.length === 0) {
    redirect('/docs/installation')
  }
  
  const mdxPath = await getMdxPath(slug)

  if (!mdxPath) {
    notFound()
  }

  let mdxSource: string
  try {
    mdxSource = await readFile(mdxPath, 'utf-8')
  } catch (error) {
    notFound()
  }

  // Helper to extract text from React children recursively
  const extractText = (children: any): string => {
    if (typeof children === 'string') {
      return children
    }
    if (typeof children === 'number') {
      return String(children)
    }
    if (Array.isArray(children)) {
      return children.map(extractText).join('')
    }
    if (children?.props?.children !== undefined) {
      return extractText(children.props.children)
    }
    return ''
  }

  // Helper to extract text from React children for heading IDs
  const extractHeadingText = (children: any): string => {
    if (typeof children === 'string') return children
    if (typeof children === 'number') return String(children)
    if (Array.isArray(children)) {
      return children.map(extractHeadingText).join('')
    }
    if (children?.props?.children) {
      return extractHeadingText(children.props.children)
    }
    return String(children || '')
  }

  // Helper to generate heading ID from text
  const generateHeadingId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Heading component with anchor link
  const createHeading = (level: number, props: any) => {
    const text = extractHeadingText(props.children)
    const id = generateHeadingId(text)
    const baseClasses = 'scroll-mt-20 group'
    const levelClasses = {
      1: 'font-bold text-4xl mb-4 mt-0',
      2: 'font-bold text-3xl mb-3 mt-8 border-b border-border pb-2',
      3: 'font-semibold text-2xl mb-2 mt-6',
      4: 'font-semibold text-xl mb-2 mt-4',
      5: 'font-semibold text-lg mb-2 mt-3',
      6: 'font-semibold text-base mb-2 mt-3',
    }

    const className = `${baseClasses} ${levelClasses[level as keyof typeof levelClasses]}`

    switch (level) {
      case 1:
        return (
          <h1 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h1>
        )
      case 2:
        return (
          <h2 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h2>
        )
      case 3:
        return (
          <h3 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h3>
        )
      case 4:
        return (
          <h4 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h4>
        )
      case 5:
        return (
          <h5 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h5>
        )
      case 6:
        return (
          <h6 id={id} className={className}>
            <a
              href={`#${id}`}
              className="anchor no-underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Link to ${text}`}
            >
              #
            </a>
            {props.children}
          </h6>
        )
      default:
        return <h1 id={id} className={className}>{props.children}</h1>
    }
  }

  // Combine MDX components with CodeBlock
  const components = {
    ...mdxComponents,
    h1: (props: any) => createHeading(1, props),
    h2: (props: any) => createHeading(2, props),
    h3: (props: any) => createHeading(3, props),
    h4: (props: any) => createHeading(4, props),
    h5: (props: any) => createHeading(5, props),
    h6: (props: any) => createHeading(6, props),
    pre: (props: any) => {
      const { children } = props
      
      // Extract code string and language
      let codeString = ''
      let language = 'typescript'
      
      // Handle different structures
      if (typeof children === 'string') {
        codeString = children
      } else if (children?.type === 'code' || (children?.props && typeof children.props.children !== 'undefined')) {
        // Direct code element or element with props
        const codeProps = children.props || {}
        const className = codeProps.className || ''
        
        // Extract language
        const langMatch = className.match(/language-(\w+)/)
        if (langMatch) {
          language = langMatch[1]
        }
        
        // Extract code text
        codeString = extractText(codeProps.children || children)
      } else if (Array.isArray(children)) {
        // Find code element in array
        const codeElement = children.find((child: any) => 
          child?.type === 'code' || child?.props?.className?.includes('language-')
        )
        
        if (codeElement) {
          const codeProps = codeElement.props || {}
          const className = codeProps.className || ''
          const langMatch = className.match(/language-(\w+)/)
          if (langMatch) {
            language = langMatch[1]
          }
          codeString = extractText(codeProps.children || codeElement)
        } else {
          // Fallback: extract from all children
          codeString = extractText(children)
        }
      } else {
        codeString = extractText(children)
      }
      
      // Clean up the code string
      codeString = codeString.trim()
      
      // If still empty, it's likely a rendering issue
      if (!codeString) {
        return <pre className="p-4 bg-muted rounded"><code>Code block could not be rendered</code></pre>
      }
      
      // Use HighlightedCodeBlock server component
      return <HighlightedCodeBlock code={codeString} language={language} />
    },
    code: (props: any) => {
      // Inline code - render normally (not in pre)
      if (props.className?.includes('language-')) {
        // This is a code block code element - return as-is for pre to handle
        return <code {...props} />
      }
      // Inline code
      return <code className={props.className}>{props.children}</code>
    },
  }

  return (
    <DocsLayout slug={slug}>
      <MDXRemote
        source={mdxSource}
        options={mdxOptions}
        components={components}
      />
    </DocsLayout>
  )
}

/**
 * Generate static params for documentation pages
 */
export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['installation'] },
    { slug: ['quick-start'] },
    { slug: ['configuration'] },
    { slug: ['api', 'upload'] },
    { slug: ['api', 'retrieve'] },
    { slug: ['api', 'delete'] },
    { slug: ['api', 'get-asset'] },
    { slug: ['advanced', 'gas-strategies'] },
    { slug: ['advanced', 'encryption-policies'] },
    { slug: ['advanced', 'error-handling'] },
    { slug: ['advanced', 'wallet-integration'] },
    { slug: ['examples', 'basic-upload'] },
    { slug: ['examples', 'with-encryption'] },
    { slug: ['examples', 'wallet-integration'] },
  ]
}
