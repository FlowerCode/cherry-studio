import { useRuntime } from '@renderer/hooks/useRuntime'
import type { Assistant } from '@renderer/types'
import type { FC } from 'react'

import SelectModelButton from './SelectModelButton'

interface Props {
  assistant: Assistant
}

const ChatNavbarContent: FC<Props> = ({ assistant }) => {
  const { chat } = useRuntime()
  const { activeTopic } = chat

  if (!activeTopic) {
    return null
  }

  return <SelectModelButton assistant={assistant} />
}

export default ChatNavbarContent
