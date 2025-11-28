/*
|--------------------------------------------------------------------------
| Package entrypoint
|--------------------------------------------------------------------------
|
| Export values from the package entrypoint as you see fit.
|
*/
import tag from './src/models/tag.js'
import taggable from './src/models/taggable.js'

export const Tag = tag
export const Taggable = taggable

export { configure } from './configure.js'
export { stubsRoot } from './stubs/main.js'
export { TaggableMorphMap, getClassPath } from './src/decorators.js'
export { hasTags } from './src/mixins/has_tags.js'
export { Tcl, TclManager } from './src/tcl.js'
