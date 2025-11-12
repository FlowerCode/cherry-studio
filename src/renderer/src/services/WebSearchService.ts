import type { WebSearchProvider, WebSearchProviderResponse } from '@renderer/types'
import type { ExtractResults } from '@renderer/utils/extract'

/**
 * Minimal stub for the legacy WebSearchService. External web search functionality
 * has been removed, so these methods now return neutral defaults.
 */
class WebSearchService {
  isWebSearchEnabled(): boolean {
    return false
  }

  getWebSearchProvider(id?: WebSearchProvider['id']): WebSearchProvider | undefined {
    void id
    return undefined
  }

  async processWebsearch(
    provider: WebSearchProvider,
    extractResults: ExtractResults,
    requestId: string
  ): Promise<WebSearchProviderResponse> {
    void provider
    void extractResults
    void requestId
    return {
      query: '',
      results: []
    }
  }

  async checkSearch(): Promise<{ valid: boolean; error?: string }> {
    return { valid: false, error: 'web_search_disabled' }
  }

  // No-op placeholders for previous behaviour
  async syncProviders(): Promise<void> {}
}

export default new WebSearchService()
