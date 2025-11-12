import type { Model } from '@renderer/types'

type VoidFn = () => void

interface UseCodeToolsResult {
  selectedCliTool: string | null
  selectedModel: Model | null
  selectedTerminal: string
  environmentVariables: string
  directories: string[]
  currentDirectory: string | null
  canLaunch: boolean
  setCliTool: (tool: string) => void
  setModel: (model: Model | null) => void
  setTerminal: (terminal: string) => void
  setEnvVars: (vars: string) => void
  addDir: (directory: string) => void
  removeDir: (directory: string) => void
  setCurrentDir: (directory: string) => void
  clearDirs: VoidFn
  resetSettings: VoidFn
  selectFolder: () => Promise<string | null>
}

export const useCodeTools = (): UseCodeToolsResult => {
  const noop = () => {}

  return {
    selectedCliTool: null,
    selectedModel: null,
    selectedTerminal: '',
    environmentVariables: '',
    directories: [],
    currentDirectory: null,
    canLaunch: false,
    setCliTool: noop,
    setModel: noop,
    setTerminal: noop,
    setEnvVars: noop,
    addDir: noop,
    removeDir: noop,
    setCurrentDir: noop,
    clearDirs: noop,
    resetSettings: noop,
    selectFolder: async () => null
  }
}
