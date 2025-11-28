// src/morph_map/get_class_path.ts

/**
 * Returns a string identifier for the given model class.
 * This is used as taggableType in the `taggables` pivot table.
 */
export function getTaggableClassPath(modelClass: Function): string {
  // If your model has a static "table" property, use that:
  if ((modelClass as any).table) {
    return (modelClass as any).table
  }

  // Otherwise fallback to class name
  return modelClass.name
}
