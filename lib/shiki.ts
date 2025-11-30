/**
 * Shiki syntax highlighting utilities
 */

import { codeToHtml } from 'shiki'
import type { BundledLanguage, BundledTheme } from 'shiki'

/**
 * Highlight code using Shiki
 * Uses github-dark theme (works well in dark mode)
 */
export async function highlightCode(
  code: string,
  language: string = 'typescript',
  theme: BundledTheme = 'github-dark'
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language as BundledLanguage,
      theme,
    })
    return html
  } catch (error) {
    console.error('Shiki highlighting error:', error)
    // Fallback to plain code if highlighting fails
    return `<code>${escapeHtml(code)}</code>`
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
