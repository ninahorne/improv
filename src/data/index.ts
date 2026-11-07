import type { Category } from '#/lib/types'

import activities from './activities.json'
import adjectives from './adjectives.json'
import locations from './locations.json'
import objects from './objects.json'
import occupations from './occupations.json'
import vagueStatements from './vague_statements_questions.json'
import words from './words.json'

export const INITIATIONS: readonly string[] = vagueStatements

export const SUGGESTION_DATA: Record<Category, readonly string[]> = {
  activities,
  adjectives,
  locations,
  objects,
  occupations,
  words,
}
