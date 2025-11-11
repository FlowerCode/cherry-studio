import { DraggableList } from '@renderer/components/DraggableList'
import type { Assistant, AssistantsSortType } from '@renderer/types'
import type { FC } from 'react'
import { useCallback } from 'react'

import type { UnifiedItem } from '../hooks/useUnifiedItems'
import AssistantItem from './AssistantItem'

interface UnifiedListProps {
  items: UnifiedItem[]
  activeAssistantId: string
  sortBy: AssistantsSortType
  onReorder: (newList: UnifiedItem[]) => void
  onDragStart: () => void
  onDragEnd: () => void
  onAssistantSwitch: (assistant: Assistant) => void
  onAssistantDelete: (assistant: Assistant) => void
  addPreset: (assistant: Assistant) => void
  copyAssistant: (assistant: Assistant) => void
  onCreateDefaultAssistant: () => void
  handleSortByChange: (sortType: AssistantsSortType) => void
  sortByPinyinAsc: () => void
  sortByPinyinDesc: () => void
}

export const UnifiedList: FC<UnifiedListProps> = (props) => {
  const {
    items,
    activeAssistantId,
    sortBy,
    onReorder,
    onDragStart,
    onDragEnd,
    onAssistantSwitch,
    onAssistantDelete,
    addPreset,
    copyAssistant,
    onCreateDefaultAssistant,
    handleSortByChange,
    sortByPinyinAsc,
    sortByPinyinDesc
  } = props

  const renderUnifiedItem = useCallback(
    (item: UnifiedItem) => {
      return (
        <AssistantItem
          key={`assistant-${item.data.id}`}
          assistant={item.data}
          isActive={item.data.id === activeAssistantId}
          sortBy={sortBy}
          onSwitch={onAssistantSwitch}
          onDelete={onAssistantDelete}
          addPreset={addPreset}
          copyAssistant={copyAssistant}
          onCreateDefaultAssistant={onCreateDefaultAssistant}
          handleSortByChange={handleSortByChange}
          sortByPinyinAsc={sortByPinyinAsc}
          sortByPinyinDesc={sortByPinyinDesc}
        />
      )
    },
    [
      activeAssistantId,
      sortBy,
      onAssistantSwitch,
      onAssistantDelete,
      addPreset,
      copyAssistant,
      onCreateDefaultAssistant,
      handleSortByChange,
      sortByPinyinAsc,
      sortByPinyinDesc
    ]
  )

  return (
    <DraggableList
      list={items}
      itemKey={(item) => `${item.type}-${item.data.id}`}
      onUpdate={onReorder}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}>
      {renderUnifiedItem}
    </DraggableList>
  )
}
