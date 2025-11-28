// src/mixins/has_tags.ts

import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel } from '@adonisjs/lucid/orm'

import { Tcl } from '../tcl.js'
import { TaggableModelInterface, ModelIdType } from '../types.js'

/**
 * Usage:
 *  export default class Post extends compose(BaseModel, hasTags()) {
 *    getModelId() {
 *      return this.id
 *    }
 *  }
 */
export function hasTags() {
  return <Model extends NormalizeConstructor<typeof BaseModel>>(superclass: Model) => {
    class HasTagsMixin extends superclass implements TaggableModelInterface {
      /**
       * The user MUST implement this in the model.
       */
      getModelId(): ModelIdType {
        throw new Error('You must implement getModelId() in your model when using hasTags() mixin.')
      }

      /**
       * Get all tags for this model
       */
      async tags() {
        return Tcl.model(this).getTags()
      }

      /**
       * Attach a tag
       */
      async attachTag(name: string) {
        return Tcl.model(this).attach(name)
      }

      /**
       * Detach a tag
       */
      async detachTag(name: string) {
        return Tcl.model(this).detach(name)
      }

      /**
       * Sync tags (replace all)
       */
      async syncTags(names: string[]) {
        return Tcl.model(this).sync(names)
      }

      /**
       * Check if model has a tag
       */
      async hasTag(name: string) {
        const tags = await this.tags()
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return tags.some((t) => t.slug === slug)
      }
    }

    return HasTagsMixin
  }
}
