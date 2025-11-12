# Unified Data Access Layer

This module provides a unified interface for accessing message data using IndexedDB through Dexie.
The agent/remote data source has been removed as part of the chat-only simplification.

## Architecture

```
dbService (Facade)
    └── Routes to DexieMessageDataSource (local chats)
```

## Usage

```typescript
import { dbService } from '@renderer/services/db'

// Fetch messages
const { messages, blocks } = await dbService.fetchMessages(topicId)

// Save a message exchange
await dbService.persistExchange(topicId, {
  user: { message: userMsg, blocks: userBlocks },
  assistant: { message: assistantMsg, blocks: assistantBlocks }
})

// Append a single message
await dbService.appendMessage(topicId, message, blocks)

// Check if topic exists
const exists = await dbService.topicExists(topicId)
```

## Key Features

1. **Simple Facade**: Centralized access point for message persistence
2. **Consistent API**: Same methods across the renderer for message operations
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Error Handling**: Comprehensive error logging and propagation
5. **Extensibility**: Easy to add new data sources (e.g., cloud storage)

## Implementation Status

### DexieMessageDataSource ✅
- Full CRUD operations for messages and blocks
- Transaction support
- File cleanup on deletion
- Redux state updates

## Migration Guide

### Before (Direct DB access):
```typescript
// In thunks
const topic = await db.topics.get(topicId)
```

### After (Unified access):
```typescript
// In thunks
const { messages, blocks } = await dbService.fetchMessages(topicId)
```
