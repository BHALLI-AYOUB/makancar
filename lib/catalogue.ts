import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import type source from '@/content/catalogue.json'
import type { Catalogue } from '@/types/catalogue'
import { validateCatalogue } from '@/shared/catalogue.mjs'

// The catalogue is read from disk at request time (cached until the file changes),
// so saving from the admin space updates the site without a rebuild.
const catalogueFile = path.join(process.cwd(), 'content', 'catalogue.json')
let cache: { mtimeMs: number; size: number; data: typeof source } | null = null

function load() {
  const stat = fs.statSync(catalogueFile)
  if (cache && cache.mtimeMs === stat.mtimeMs && cache.size === stat.size) return cache.data
  const data = JSON.parse(fs.readFileSync(catalogueFile, 'utf8')) as typeof source
  const errors = validateCatalogue(data)
  if (errors.length) {
    if (cache) return cache.data
    throw new Error(`Invalid catalogue:\n${errors.join('\n')}`)
  }
  cache = { mtimeMs: stat.mtimeMs, size: stat.size, data }
  return data
}

export function getCatalogue() {
  return load() as unknown as Catalogue
}

export function getShowroomSettings() {
  const data = load()
  return { contact: data.contact, showroom: data.showroom }
}
