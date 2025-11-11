import Scrollbar from '@renderer/components/Scrollbar'
import { useAssistants } from '@renderer/hooks/useAssistant'
import { useAssistantsTabSortType } from '@renderer/hooks/useStore'
import { useTags } from '@renderer/hooks/useTags'
import type { Assistant, AssistantsSortType } from '@renderer/types'
import { Button } from 'antd'
import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import { UnifiedList } from './components/UnifiedList'
import { UnifiedTagGroups } from './components/UnifiedTagGroups'
import { useUnifiedGrouping } from './hooks/useUnifiedGrouping'
import { useUnifiedItems } from './hooks/useUnifiedItems'
import { useUnifiedSorting } from './hooks/useUnifiedSorting'

interface AssistantsTabProps {
  activeAssistant: Assistant
  setActiveAssistant: (assistant: Assistant) => void
  onCreateAssistant: () => void
  onCreateDefaultAssistant: () => void
}

const AssistantsTab: FC<AssistantsTabProps> = (props) => {
  const { activeAssistant, setActiveAssistant, onCreateAssistant, onCreateDefaultAssistant } = props
  const containerRef = useRef<HTMLDivElement>(null)

  const { assistants, removeAssistant, copyAssistant, updateAssistants } = useAssistants()
  const { collapsedTags, toggleTagCollapse } = useTags()
  const { assistantsTabSortType = 'list', setAssistantsTabSortType } = useAssistantsTabSortType()
  const [dragging, setDragging] = useState(false)

  // Unified items management
  const { unifiedItems, handleUnifiedListReorder } = useUnifiedItems({ assistants, updateAssistants })

  // Sorting
  const { sortByPinyinAsc, sortByPinyinDesc } = useUnifiedSorting({
    unifiedItems,
    updateAssistants
  })

  // Grouping
  const { groupedUnifiedItems, handleUnifiedGroupReorder } = useUnifiedGrouping({
    unifiedItems,
    assistants,
    updateAssistants
  })

  const onDeleteAssistant = useCallback(
    (assistant: Assistant) => {
      const remaining = assistants.filter((a) => a.id !== assistant.id)
      if (assistant.id === activeAssistant?.id) {
        const newActive = remaining[remaining.length - 1]
        newActive ? setActiveAssistant(newActive) : onCreateDefaultAssistant()
      }
      removeAssistant(assistant.id)
    },
    [activeAssistant, assistants, removeAssistant, setActiveAssistant, onCreateDefaultAssistant]
  )

  const handleSortByChange = useCallback(
    (sortType: AssistantsSortType) => {
      setAssistantsTabSortType(sortType)
    },
    [setAssistantsTabSortType]
  )

  return (
    <Container className="assistants-tab" ref={containerRef}>
      <AddAssistantRow>
        <Button icon={<Plus size={14} />} type="primary" onClick={onCreateAssistant}>
          {`Add Assistant`}
        </Button>
        <Button onClick={onCreateDefaultAssistant}>Add Blank Assistant</Button>
      </AddAssistantRow>

      {assistantsTabSortType === 'tags' ? (
        <UnifiedTagGroups
          groupedItems={groupedUnifiedItems}
          activeAssistantId={activeAssistant.id}
          sortBy={assistantsTabSortType}
          collapsedTags={collapsedTags}
          onGroupReorder={handleUnifiedGroupReorder}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          onToggleTagCollapse={toggleTagCollapse}
          onAssistantSwitch={setActiveAssistant}
          onAssistantDelete={onDeleteAssistant}
          addPreset={() => {}}
          copyAssistant={copyAssistant}
          onCreateDefaultAssistant={onCreateDefaultAssistant}
          handleSortByChange={handleSortByChange}
          sortByPinyinAsc={sortByPinyinAsc}
          sortByPinyinDesc={sortByPinyinDesc}
        />
      ) : (
        <UnifiedList
          items={unifiedItems}
          activeAssistantId={activeAssistant.id}
          sortBy={assistantsTabSortType}
          onReorder={handleUnifiedListReorder}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          onAssistantSwitch={setActiveAssistant}
          onAssistantDelete={onDeleteAssistant}
          addPreset={() => {}}
          copyAssistant={copyAssistant}
          onCreateDefaultAssistant={onCreateDefaultAssistant}
          handleSortByChange={handleSortByChange}
          sortByPinyinAsc={sortByPinyinAsc}
          sortByPinyinDesc={sortByPinyinDesc}
        />
      )}

      {!dragging && <div style={{ minHeight: 10 }}></div>}
    </Container>
  )
}

const Container = styled(Scrollbar)`
  display: flex;
  flex-direction: column;
  padding: 12px 10px;
`

const AddAssistantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

export default AssistantsTab
