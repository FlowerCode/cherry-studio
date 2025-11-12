import type { Provider } from '@renderer/types'

export const getClaudeSupportedProviders = (providers: Provider[]) => {
  return providers.filter((p) => p.type === 'anthropic')
}
