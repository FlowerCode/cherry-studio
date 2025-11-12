import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { AppLogo, UserAvatar } from '@renderer/config/env'
import type { Topic } from '@renderer/types'
import type { UpdateInfo } from 'builder-util-runtime'

export interface ChatState {
  isMultiSelectMode: boolean
  selectedMessageIds: string[]
  activeTopic: Topic | null
  /** topic ids that are currently being renamed */
  renamingTopics: string[]
  /** topic ids that are newly renamed */
  newlyRenamedTopics: string[]
}

export interface UpdateState {
  info: UpdateInfo | null
  checking: boolean
  downloading: boolean
  downloaded: boolean
  downloadProgress: number
  available: boolean
}

export interface RuntimeState {
  avatar: string
  generating: boolean
  translating: boolean
  translateAbortKey?: string
  searching: boolean
  filesPath: string
  resourcesPath: string
  update: UpdateState
  export: ExportState
  chat: ChatState
}

export interface ExportState {
  isExporting: boolean
}

const initialState: RuntimeState = {
  avatar: UserAvatar,
  generating: false,
  translating: false,
  searching: false,
  filesPath: '',
  resourcesPath: '',
  update: {
    info: null,
    checking: false,
    downloading: false,
    downloaded: false,
    downloadProgress: 0,
    available: false
  },
  export: {
    isExporting: false
  },
  chat: {
    isMultiSelectMode: false,
    selectedMessageIds: [],
    activeTopic: null,
    renamingTopics: [],
    newlyRenamedTopics: []
  }
}

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload || AppLogo
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.generating = action.payload
    },
    setTranslating: (state, action: PayloadAction<boolean>) => {
      state.translating = action.payload
    },
    setTranslateAbortKey: (state, action: PayloadAction<string>) => {
      state.translateAbortKey = action.payload
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.searching = action.payload
    },
    setFilesPath: (state, action: PayloadAction<string>) => {
      state.filesPath = action.payload
    },
    setResourcesPath: (state, action: PayloadAction<string>) => {
      state.resourcesPath = action.payload
    },
    setUpdateState: (state, action: PayloadAction<Partial<UpdateState>>) => {
      state.update = { ...state.update, ...action.payload }
    },
    setExportState: (state, action: PayloadAction<Partial<ExportState>>) => {
      state.export = { ...state.export, ...action.payload }
    },
    // Chat related actions
    toggleMultiSelectMode: (state, action: PayloadAction<boolean>) => {
      state.chat.isMultiSelectMode = action.payload
      if (!action.payload) {
        state.chat.selectedMessageIds = []
      }
    },
    setSelectedMessageIds: (state, action: PayloadAction<string[]>) => {
      state.chat.selectedMessageIds = action.payload
    },
    setActiveTopic: (state, action: PayloadAction<Topic>) => {
      // @ts-ignore ts2589 false positive
      state.chat.activeTopic = action.payload
    },
    setRenamingTopics: (state, action: PayloadAction<string[]>) => {
      state.chat.renamingTopics = action.payload
    },
    setNewlyRenamedTopics: (state, action: PayloadAction<string[]>) => {
      state.chat.newlyRenamedTopics = action.payload
    }
  }
})

export const {
  setAvatar,
  setGenerating,
  setTranslating,
  setTranslateAbortKey,
  setSearching,
  setFilesPath,
  setResourcesPath,
  setUpdateState,
  setExportState,
  // Chat related actions
  toggleMultiSelectMode,
  setSelectedMessageIds,
  setActiveTopic,
  setRenamingTopics,
  setNewlyRenamedTopics
} = runtimeSlice.actions

export default runtimeSlice.reducer
