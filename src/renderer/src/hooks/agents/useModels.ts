import type { ApiModel, ApiModelsFilter } from '@renderer/types'

type UseApiModelsResult = {
  models: ApiModel[]
  isLoading: boolean
}

export function useApiModels(_filter?: ApiModelsFilter): UseApiModelsResult {
  return {
    models: [],
    isLoading: false
  }
}
