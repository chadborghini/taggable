// src/morph_map/decorators.ts

import { morphMap, getClassPath as baseGetClassPath } from '@holoyan/morph-map-js'

/**
 * Register a model inside the global morph map used by polymorphic relations.
 *
 * Usage:
 *   @TaggableMorphMap('post')
 *   export default class Post extends BaseModel {}
 */
export function TaggableMorphMap(alias: string) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    // register alias -> model class
    morphMap.set(alias, target)

    // store alias on prototype (optional but helpful)
    target.prototype.__morphMapName = alias
  }
}

/**
 * A wrapper around the original morph-map-js getClassPath helper.
 * Returns the alias for a class or fallback class path.
 */
export function getClassPath<T extends { new (...args: any[]): {} }>(clazz: T): string {
  return baseGetClassPath(clazz)
}
