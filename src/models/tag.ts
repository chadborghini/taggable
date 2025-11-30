// src/models/tag.ts
import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { ModelIdType, TagInterface } from '../types.js'
import { MorphMap } from '@holoyan/morph-map-js'

@MorphMap('tags') // you can choose another alias
export default class Tag extends BaseModel implements TagInterface {
  @beforeSave()
  static generateSlug(tag: Tag) {
    if (tag.$dirty.name) {
      tag.slug = tag
        .name!.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
  }

  getModelId(): ModelIdType {
    return this.id
  }

  @column({ isPrimary: true })
  declare id: ModelIdType

  @column()
  declare protected slug: string

  @column()
  declare name: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
