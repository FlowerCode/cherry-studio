import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { SettingTitle } from '..'

const McpMarketList: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <SettingTitle style={{ marginBottom: 10 }}>{t('settings.mcp.findMore')}</SettingTitle>
      <Placeholder>
        {t('settings.mcp.more.none', 'No curated marketplaces are bundled. Add MCP servers manually.')}
      </Placeholder>
    </>
  )
}

const Placeholder = styled.div`
  font-size: 13px;
  color: var(--color-text-2);
  padding: 16px;
  border: 0.5px solid var(--color-border);
  border-radius: var(--list-item-border-radius);
  background-color: var(--color-background-soft);
`

export default McpMarketList
