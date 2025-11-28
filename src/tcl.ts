// src/tcl.ts

import { TaggableModelInterface } from './types.js'
import ModelManager from './model_manager.js'
import { MorphMapManager } from '@holoyan/morph-map-js'
import { TaggableModelActions } from './services/taggable_model_actions.js'

export class TclManager {
  /**
   * Global services (set by provider)
   */
  private static modelManager: ModelManager
  private static morphMap: MorphMapManager

  constructor() {}

  // ---------------------------------------------------------
  // Static service injection (ACL-style)
  // ---------------------------------------------------------

  static setModelManager(manager: ModelManager) {
    this.modelManager = manager
  }

  static getModelManager() {
    return this.modelManager
  }

  static setMorphMap(map: MorphMapManager) {
    this.morphMap = map
  }

  static getMorphMap() {
    return this.morphMap
  }

  // ---------------------------------------------------------
  // Core API: Tcl.model(model)
  // ---------------------------------------------------------

  model(model: TaggableModelInterface) {
    return new TaggableModelActions(TclManager.modelManager, model)
  }
}

/**
 * Export the singleton instance
 */
export const Tcl = new TclManager()
