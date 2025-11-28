// src/types.ts

import Tag from './models/tag.js'
import Taggable from './models/taggable.js'

export type ModelIdType = string | number

export interface TaggableModelInterface {
  getModelId(): ModelIdType
}

export interface TclModelManagerBindings {
  tag: typeof Tag
  taggable: typeof Taggable
}

export type TclModelManagerInterface = {
  [K in keyof TclModelManagerBindings]?: TclModelManagerBindings[K]
}

/**
 * Base structure: the tag record itself
 */
export interface TagInterface {
  id: ModelIdType
  slug: string
  title: string | null
  createdAt: any
  updatedAt: any
}

/**
 * Base structure: the pivot (taggables) table row
 */
export interface TaggableInterface {
  id: number
  tagId: ModelIdType
  taggableType: string
  taggableId: ModelIdType
  createdAt: any
  updatedAt: any
}
