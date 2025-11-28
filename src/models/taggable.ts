// src/models/taggable.ts
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ModelIdType, TaggableInterface } from '../types.js'

export default class Taggable extends BaseModel implements TaggableInterface {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'tag_id' })
  declare tagId: ModelIdType

  @column({ columnName: 'taggable_type' })
  declare taggableType: string

  @column({ columnName: 'taggable_id' })
  declare taggableId: ModelIdType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
