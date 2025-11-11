import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@renderer/store'
import { useAppDispatch, useAppSelector } from '@renderer/store'
import { setUnifiedListOrder } from '@renderer/store/assistants'
import type { Assistant } from '@renderer/types'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { UnifiedItem } from './useUnifiedItems'

interface UseUnifiedGroupingOptions {
  unifiedItems: UnifiedItem[]
  assistants: Assistant[]
  updateAssistants: (assistants: Assistant[]) => void
}

export const useUnifiedGrouping = (options: UseUnifiedGroupingOptions) => {
  const { unifiedItems, assistants, updateAssistants } = options
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const selectTagsOrder = useMemo(
    () => createSelector([(state: RootState) => state.assistants], (assistants) => assistants.tagsOrder ?? []),
    []
  )
  const savedTagsOrder = useAppSelector(selectTagsOrder)

  const groupedUnifiedItems = useMemo(() => {
    const groups = new Map<string, UnifiedItem[]>()

    unifiedItems.forEach((item) => {
      const tags = item.data.tags?.length ? item.data.tags : [t('assistants.tags.untagged')]
      tags.forEach((tag) => {
        if (!groups.has(tag)) {
          groups.set(tag, [])
        }
        groups.get(tag)!.push(item)
      })
    })

    const untaggedKey = t('assistants.tags.untagged')
    const sortedGroups = Array.from(groups.entries()).sort(([tagA], [tagB]) => {
      if (tagA === untaggedKey) return -1
      if (tagB === untaggedKey) return 1

      if (savedTagsOrder.length > 0) {
        const indexA = savedTagsOrder.indexOf(tagA)
        const indexB = savedTagsOrder.indexOf(tagB)

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB
        }
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
      }

      return 0
    })

    return sortedGroups.map(([tag, items]) => ({ tag, items }))
  }, [unifiedItems, t, savedTagsOrder])

  const handleUnifiedGroupReorder = useCallback(
    (tag: string, newGroupList: UnifiedItem[]) => {
      const newAssistants = newGroupList.map((item) => item.data)

      let insertIndex = 0
      const updatedAssistants = assistants.map((assistant) => {
        const tags = assistant.tags?.length ? assistant.tags : [t('assistants.tags.untagged')]
        if (tags.includes(tag)) {
          const replacement = newAssistants[insertIndex]
          insertIndex += 1
          return replacement || assistant
        }
        return assistant
      })
      updateAssistants(updatedAssistants)

      const newUnifiedItems: UnifiedItem[] = []
      groupedUnifiedItems.forEach((group) => {
        if (group.tag === tag) {
          newGroupList.forEach((item) => newUnifiedItems.push(item))
        } else {
          group.items.forEach((item) => newUnifiedItems.push(item))
        }
      })

      const orderToSave = newUnifiedItems.map((item) => ({
        type: item.type,
        id: item.data.id
      }))
      dispatch(setUnifiedListOrder(orderToSave))
    },
    [assistants, t, updateAssistants, groupedUnifiedItems, dispatch]
  )

  return {
    groupedUnifiedItems,
    handleUnifiedGroupReorder
  }
}
