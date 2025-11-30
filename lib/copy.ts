/**
 * Copy to clipboard utility
 */

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern Clipboard API
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
      } catch (err) {
        throw new Error('Failed to copy text')
      } finally {
        document.body.removeChild(textArea)
      }
    }
  } catch (error) {
    throw new Error(`Failed to copy: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Copy text to clipboard with toast notification
 * @param text - Text to copy
 * @param onSuccess - Callback when copy succeeds
 * @param onError - Callback when copy fails
 */
export async function copyWithFeedback(
  text: string,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<void> {
  try {
    await copyToClipboard(text)
    onSuccess?.()
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Copy failed')
    onError?.(err)
    throw err
  }
}
