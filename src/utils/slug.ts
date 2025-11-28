// src/utils/slug.ts

export function makeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces or symbols with hyphens
    .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
}
