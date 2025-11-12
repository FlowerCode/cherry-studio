import type { Message, MessageBlock } from '@renderer/types/newMessage'

import { DexieMessageDataSource } from './DexieMessageDataSource'
import type { MessageDataSource } from './types'

/**
 * Thin facade around the Dexie-backed message data source.
 * Previously this routed between multiple backends (e.g. agent sessions);
 * now it delegates all operations to Dexie only.
 */
class DbService implements MessageDataSource {
  private static instance: DbService
  private readonly dexieSource: DexieMessageDataSource

  private constructor() {
    this.dexieSource = new DexieMessageDataSource()
  }

  static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService()
    }
    return DbService.instance
  }

  private getDataSource(): MessageDataSource {
    return this.dexieSource
  }

  async fetchMessages(
    topicId: string,
    forceReload?: boolean
  ): Promise<{
    messages: Message[]
    blocks: MessageBlock[]
  }> {
    return this.getDataSource().fetchMessages(topicId, forceReload)
  }

  async appendMessage(
    topicId: string,
    message: Message,
    blocks: MessageBlock[],
    insertIndex?: number
  ): Promise<void> {
    return this.getDataSource().appendMessage(topicId, message, blocks, insertIndex)
  }

  async updateMessage(topicId: string, messageId: string, updates: Partial<Message>): Promise<void> {
    return this.getDataSource().updateMessage(topicId, messageId, updates)
  }

  async updateMessageAndBlocks(
    topicId: string,
    messageUpdates: Partial<Message> & Pick<Message, 'id'>,
    blocksToUpdate: MessageBlock[]
  ): Promise<void> {
    return this.getDataSource().updateMessageAndBlocks(topicId, messageUpdates, blocksToUpdate)
  }

  async deleteMessage(topicId: string, messageId: string): Promise<void> {
    return this.getDataSource().deleteMessage(topicId, messageId)
  }

  async deleteMessages(topicId: string, messageIds: string[]): Promise<void> {
    return this.getDataSource().deleteMessages(topicId, messageIds)
  }

  async updateBlocks(blocks: MessageBlock[]): Promise<void> {
    return this.getDataSource().updateBlocks(blocks)
  }

  async deleteBlocks(blockIds: string[]): Promise<void> {
    return this.dexieSource.deleteBlocks(blockIds)
  }

  async clearMessages(topicId: string): Promise<void> {
    return this.getDataSource().clearMessages(topicId)
  }

  async topicExists(topicId: string): Promise<boolean> {
    return this.getDataSource().topicExists(topicId)
  }

  async ensureTopic(topicId: string): Promise<void> {
    return this.getDataSource().ensureTopic(topicId)
  }

  async getRawTopic(topicId: string): Promise<{ id: string; messages: Message[] } | undefined> {
    return this.getDataSource().getRawTopic(topicId)
  }

  async updateSingleBlock(blockId: string, updates: Partial<MessageBlock>): Promise<void> {
    if (this.dexieSource.updateSingleBlock) {
      return this.dexieSource.updateSingleBlock(blockId, updates)
    }
    return this.dexieSource.updateBlocks([{ ...updates, id: blockId } as MessageBlock])
  }

  async bulkAddBlocks(blocks: MessageBlock[]): Promise<void> {
    if (this.dexieSource.bulkAddBlocks) {
      return this.dexieSource.bulkAddBlocks(blocks)
    }
    return this.dexieSource.updateBlocks(blocks)
  }

  async updateFileCount(fileId: string, delta: number, deleteIfZero: boolean = false): Promise<void> {
    if (this.dexieSource.updateFileCount) {
      return this.dexieSource.updateFileCount(fileId, delta, deleteIfZero)
    }
  }

  async updateFileCounts(
    files: Array<{
      id: string
      delta: number
      deleteIfZero?: boolean
    }>
  ): Promise<void> {
    if (this.dexieSource.updateFileCounts) {
      return this.dexieSource.updateFileCounts(files)
    }
  }

  /**
   * Reset singleton instance - primarily used in tests.
   */
  static reset() {
    DbService.instance = undefined as unknown as DbService
  }
}

export { DbService }
export const dbService = DbService.getInstance()
