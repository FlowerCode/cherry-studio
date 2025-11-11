import { useAppDispatch, useAppSelector } from '@renderer/store'
import { setUnifiedListOrder } from '@renderer/store/assistants'
import type { Assistant } from '@renderer/types'
import { useCallback, useMemo } from 'react'

export type UnifiedItem = { type: 'assistant'; data: Assistant }

interface UseUnifiedItemsOptions {
  assistants: Assistant[]
  updateAssistants: (assistants: Assistant[]) => void
}

export const useUnifiedItems = (options: UseUnifiedItemsOptions) => {
  const { assistants, updateAssistants } = options
  const dispatch = useAppDispatch()
  const unifiedListOrder = useAppSelector((state) => state.assistants.unifiedListOrder || [])

  const unifiedItems = useMemo(() => {
    const items: UnifiedItem[] = []
    const availableAssistants = new Map<string, Assistant>()

    assistants.forEach((assistant) => availableAssistants.set(assistant.id, assistant))

    unifiedListOrder.forEach((item) => {
      if (item.type === 'assistant' && availableAssistants.has(item.id)) {
        items.push({ type: 'assistant', data: availableAssistants.get(item.id)! })
        availableAssistants.delete(item.id)
      }
    })

    const newItems: UnifiedItem[] = []
    availableAssistants.forEach((assistant) => newItems.push({ type: 'assistant', data: assistant }))
    items.unshift(...newItems)

    return items
  }, [assistants, unifiedListOrder])

  const handleUnifiedListReorder = useCallback(
    (newList: UnifiedItem[]) => {
      const orderToSave = newList.map((item) => ({
        type: item.type,
        id: item.data.id
      }))
      dispatch(setUnifiedListOrder(orderToSave))

      const newAssistants = newList.map((item) => item.data)
      updateAssistants(newAssistants)
    },
    [dispatch, updateAssistants]
  )

  return {
    unifiedItems,
    handleUnifiedListReorder
  }
}
