export type PluginKind = 'agent' | 'command' | 'skill'

export interface PluginMetadata {
  sourcePath: string
  filename: string
  name: string
  description?: string
  allowed_tools?: string[]
  tools?: string[]
  category: string
  type: PluginKind
  tags?: string[]
  version?: string
  author?: string
  size?: number
  contentHash?: string
}

export interface PluginError {
  type: string
  path?: string
  reason?: string
  message?: string
  operation?: string
}
