import { type AiRequestContext,definePlugin } from '@cherrystudio/ai-core'
import type { Assistant } from '@renderer/types'

/**
 * Simplified search orchestration plugin.
 * With external web search and memory removed, this plugin now acts as a no-op
 * placeholder to keep the middleware pipeline structure intact.
 */
export const searchOrchestrationPlugin = (assistant: Assistant, topicId: string) => {
  void assistant
  void topicId
  return definePlugin({
    name: 'search-orchestration',
    enforce: 'pre',
    transformParams: async (params: any, context: AiRequestContext) => {
      void context
      return params
    },
    onRequestStart: async () => {},
    onRequestEnd: async () => {}
  })
}

export default searchOrchestrationPlugin
