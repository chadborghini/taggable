# @chadborghini/adonisjs-taggable

> Polymorphic tagging system for AdonisJS v6+  
> Add powerful, reusable tag functionality to any model with minimal setup.

## Features

- Full polymorphic many-to-many tagging
- Works with any model out of the box
- Two ways to interact: via **mixin methods** or **Tcl helper**
- Clean API: `attachTag()`, `syncTags()`, `hasTag()`, etc.
- TypeScript ready with full type support


## Installation

  ```sh
  npm install @chadborghini/adonisjs-taggable
  ```
  Next publish config files
  ```sh
  node ace configure @chadborghini/adonisjs-taggable
  ```
  this will create migration file in the ```database/migrations``` directory
  Next run migration
  ```sh
  node ace migration:run
  ```
## Configuration / Mixins

```ts
//import morphmap, mixin and interface
import { hasTags, TaggableMorphMap } from '@chadborghini/adonisjs-taggable'
import { TaggableModelInterface } from '@chadborghini/adonisjs-taggable/types'

@TaggableMorphMap('posts')
export default class Post extends compose(BaseModel, hasTags()) implements TaggableModelInterface {
  getModelId(): string | number {
    return this.id
  }

  // other code goes here
}
```

## Basic Usage
```ts
import Post from '#models/post'
import { Tcl } from '@chadborghini/adonisjs-taggable'

// 2 ways to attach either via mixin or Tcl
const post = await Post.find(1)     

// via Tcl
// parameters can be string, id, or Tag model
const attach = await Tcl.model(post).attach('tag')
const detach = await Tcl.model(post).detach('tag')
const sync = await Tcl.model(post).sync(['tag1', 'tag2'])
const getTags = await Tcl.model(post).getTags()

// via mixin
// parameters can be string, id, or Tag model
const attach = await post.attachTag('tag')
const detach = await post.detachTag('tag')
const sync = await post.syncTags(['tag1', 'tag2'])
const getTags = await post.tags()
const boolean = await post.hasTag('tag')
```