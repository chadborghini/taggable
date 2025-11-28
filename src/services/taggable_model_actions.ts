// src/services/taggable_model_actions.ts

import Tag from '../models/tag.js'
import ModelManager from '../model_manager.js'
import { ModelIdType, TaggableModelInterface } from '../types.js'
import { getClassPath } from '../decorators.js'

export class TaggableModelActions<T extends TaggableModelInterface> {
  constructor(
    private modelManager: ModelManager,
    private model: T
  ) {}

  // ---------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------

  private getModelId(): ModelIdType {
    return this.model.getModelId()
  }

  private getModelType(): string {
    const ctor = this.model.constructor as any

    if (ctor.prototype.__morphMapName) {
      return ctor.prototype.__morphMapName
    }

    return getClassPath(ctor)
  }

  private makeSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  private async findOrCreateTag(name: string): Promise<Tag> {
    const TagModel = this.modelManager.getModel('tag')
    const slug = this.makeSlug(name)

    let tag = await TagModel.query().where('slug', slug).first()

    if (!tag) {
      tag = await TagModel.create({
        slug,
        title: name,
      })
    }

    return tag
  }

  // ---------------------------------------------------------
  // Public API
  // ---------------------------------------------------------

  async attach(names: string | string[]) {
    const TaggableModel = this.modelManager.getModel('taggable')
    const arr = Array.isArray(names) ? names : [names]

    const modelId = this.getModelId()
    const modelType = this.getModelType()

    for (const name of arr) {
      const tag = await this.findOrCreateTag(name)

      const exists = await TaggableModel.query()
        .where('tag_id', tag.id)
        .where('taggable_type', modelType)
        .where('taggable_id', modelId)
        .first()

      if (!exists) {
        await TaggableModel.create({
          tagId: tag.id,
          taggableType: modelType,
          taggableId: modelId,
        })
      }
    }
  }

  async detach(names?: string | string[]) {
    const TagModel = this.modelManager.getModel('tag')
    const TaggableModel = this.modelManager.getModel('taggable')

    const modelId = this.getModelId()
    const modelType = this.getModelType()

    if (!names) {
      await TaggableModel.query()
        .where('taggable_type', modelType)
        .where('taggable_id', modelId)
        .delete()
      return
    }

    const arr = Array.isArray(names) ? names : [names]
    const slugs = arr.map((n) => this.makeSlug(n))

    const tags = await TagModel.query().whereIn('slug', slugs)
    if (tags.length === 0) return

    const tagIds = tags.map((t) => t.id)

    await TaggableModel.query()
      .whereIn('tag_id', tagIds)
      .where('taggable_type', modelType)
      .where('taggable_id', modelId)
      .delete()
  }

  async sync(names: string[]) {
    await this.detach()
    await this.attach(names)
  }

  async getTags(): Promise<Tag[]> {
    const TagModel = this.modelManager.getModel('tag')
    const TaggableModel = this.modelManager.getModel('taggable')

    const modelId = this.getModelId()
    const modelType = this.getModelType()

    const rows = await TaggableModel.query()
      .where('taggable_type', modelType)
      .where('taggable_id', modelId)

    if (rows.length === 0) return []

    const tagIds = rows.map((r) => r.tagId)

    return TagModel.query().whereIn('id', tagIds)
  }
}
