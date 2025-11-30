/**
 * MDX processing utilities
 */

import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

/**
 * Process MDX content with plugins
 */
export async function processMDX(source: string) {
  const processed = await remark()
    .use(remarkGfm)
    .process(source)

  return String(processed)
}

/**
 * MDX components mapping for custom components
 * Use this when rendering MDX with MDXRemote
 */
export const mdxComponents = {
  // Custom components will be merged in the page component
  // This is a placeholder for future custom components
}

/**
 * MDX options for next-mdx-remote
 * Note: We handle code highlighting in CodeBlock component instead of rehype-highlight
 * to avoid issues with code extraction
 */
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [rehypeHighlight], // Disabled - using custom CodeBlock instead
  },
}
