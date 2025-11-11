import { DraggableList } from '@renderer/components/DraggableList'
import type { Assistant, AssistantsSortType } from '@renderer/types'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { UnifiedItem } from '../hooks/useUnifiedItems'
import AssistantItem from './AssistantItem'
import { TagGroup } from './TagGroup'

interface GroupedItems {
  tag: string
  items: UnifiedItem[]
}

interface UnifiedTagGroupsProps {
  groupedItems: GroupedItems[]
  activeAssistantId: string
  sortBy: AssistantsSortType
  collapsedTags: Record<string, boolean>
  onGroupReorder: (tag: string, newList: UnifiedItem[]) => void
  onDragStart: () => void
  onDragEnd: () => void
  onToggleTagCollapse: (tag: string) => void
  onAssistantSwitch: (assistant: Assistant) => void
  onAssistantDelete: (assistant: Assistant) => void
  addPreset: (assistant: Assistant) => void
  copyAssistant: (assistant: Assistant) => void
  onCreateDefaultAssistant: () => void
  handleSortByChange: (sortType: AssistantsSortType) => void
  sortByPinyinAsc: () => void
  sortByPinyinDesc: () => void
}

export const UnifiedTagGroups: FC<UnifiedTagGroupsProps> = (props) => {
  const {
    groupedItems,
    activeAssistantId,
    sortBy,
    collapsedTags,
    onGroupReorder,
    onDragStart,
    onDragEnd,
    onToggleTagCollapse,
    onAssistantSwitch,
    onAssistantDelete,
    addPreset,
    copyAssistant,
    onCreateDefaultAssistant,
    handleSortByChange,
    sortByPinyinAsc,
    sortByPinyinDesc
  } = props

  const { t } = useTranslation()

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
    <div>
      {groupedItems.map((group) => (
        <TagGroup
          key={group.tag}
          tag={group.tag}
          isCollapsed={collapsedTags[group.tag]}
          onToggle={onToggleTagCollapse}
          showTitle={group.tag !== t('assistants.tags.untagged')}>
          <DraggableList
            list={group.items}
            itemKey={(item) => `${item.type}-${item.data.id}`}
            onUpdate={(newList) => onGroupReorder(group.tag, newList)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}>
            {renderUnifiedItem}
          </DraggableList>
        </TagGroup>
      ))}
    </div>
  )
}
