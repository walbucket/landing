import { NextRequest, NextResponse } from 'next/server'
import { buildSearchIndex, searchDocs } from '@/lib/search-index'

// Cache the search index
let searchIndexCache: Awaited<ReturnType<typeof buildSearchIndex>> | null = null
let indexBuildTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * GET /api/docs/search
 * Search documentation
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    if (!query.trim()) {
      return NextResponse.json({ results: [] })
    }

    // Build or use cached index
    const now = Date.now()
    if (!searchIndexCache || now - indexBuildTime > CACHE_TTL) {
      searchIndexCache = await buildSearchIndex()
      indexBuildTime = now
      // Log index stats for debugging
      // Search index built successfully
    }

    // Perform search
    const results = searchDocs(query, searchIndexCache, 10)
    
    // Log search stats for debugging
    if (process.env.NODE_ENV === 'development') {
      // Search completed
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    )
  }
}
