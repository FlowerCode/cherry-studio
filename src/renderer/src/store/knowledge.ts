import { createSlice } from '@reduxjs/toolkit'

export interface KnowledgeState {
  bases: []
}

const initialState: KnowledgeState = {
  bases: []
}

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {}
})

export default knowledgeSlice.reducer
