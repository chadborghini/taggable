// src/model_manager.ts
import { TclModelManagerBindings, TclModelManagerInterface } from './types.js'

export default class ModelManager {
  private models: TclModelManagerInterface = {}

  setModel<Binding extends keyof TclModelManagerBindings>(
    key: Binding,
    className: TclModelManagerBindings[Binding]
  ) {
    this.models[key] = className
  }

  has(key: string) {
    return key in this.models
  }

  getModel<Binding extends keyof TclModelManagerBindings>(
    key: Binding
  ): TclModelManagerBindings[Binding] {
    if (key in this.models) {
      return this.models[key]!
    }

    throw new Error('Model not defined for key: ' + key)
  }
}
