// src/mixins/has_tags.ts

import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel } from '@adonisjs/lucid/orm'

import { Tcl } from '../tcl.js'
import { TaggableModelInterface, ModelIdType } from '../types.js'
import Tag from '../models/tag.js'

/**
 * hasTags() Mixin
 *
 * Adds tagging functionality to any Lucid model.
 *
 * IMPORTANT:
 * - The model MUST implement `getModelId()` and return its primary key.
 * - This requirement exists because Lucid models may use numbers, strings, or UUIDs.
 *
 * Example usage:
 *
 *   export default class Post extends compose(BaseModel, hasTags()) {
 *     getModelId() {
 *       return this.id
 *     }
 *   }
 */
export function hasTags() {
  return <Model extends NormalizeConstructor<typeof BaseModel>>(superclass: Model) => {
    class HasTagsMixin extends superclass implements TaggableModelInterface {
      /**
       * Must be implemented by the consumer model.
       * Should return the model’s primary key (number, string, or UUID).
       */
      getModelId(): ModelIdType {
        throw new Error('You must implement getModelId() in your model when using hasTags() mixin.')
      }

      /**
       * Get a query builder for the tags attached to this model.
       *
       * This behaves similarly to a Lucid relationship:
       *   - `await model.tags()`        → fetch all tags
       *   - `model.tags().where(...)`   → continue querying
       *   - `model.tags().first()`      → fetch a single tag
       *
       * NOTE:
       * This does NOT return Tag[] directly — it returns a QueryBuilder.
       */
      tags() {
        return Tcl.model(this).tags()
      }

      /**
       * Fetch all tags for this model and return them as an array of Tag instances.
       *
       * Unlike `tags()`, this method EXECUTES the query immediately.
       * Always resolves to Tag[].
       */
      async loadTags() {
        return Tcl.model(this).loadTags()
      }

      /**
       * Attach a tag to this model.
       *
       * If the tag does not exist, it will be created automatically.
       */
      async attachTag(input: string | string[] | number | number[] | Tag | Tag[]) {
        return Tcl.model(this).attach(input)
      }

      /**
       * Detach a tag from this model.
       * Accepts tag names, slugs, or IDs.
       */
      async detachTag(input?: string | string[] | number | number[] | Tag | Tag[]) {
        return Tcl.model(this).detach(input)
      }

      /**
       * Replace all existing tags with the provided list.
       */
      async syncTags(input: string | string[] | number | number[] | Tag | Tag[]) {
        return Tcl.model(this).sync(input)
      }

      /**
       * Check if tag exists
       */
      async hasTag(input: string | number | Tag) {
        return Tcl.model(this).hasTag(input)
      }
    }

    return HasTagsMixin
  }
}
