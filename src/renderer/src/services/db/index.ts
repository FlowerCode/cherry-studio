/**
 * Unified data access layer for messages
 * Provides a consistent API for accessing messages from different sources
 * Using Dexie/IndexedDB for on-device chat history persistence.
 */

// Export main service
export { DbService, dbService } from './DbService'

// Export types
export type { MessageDataSource, MessageExchange } from './types'

// Export implementations (for testing or direct access if needed)
export { DexieMessageDataSource } from './DexieMessageDataSource'
