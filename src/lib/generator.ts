import { SUGGESTION_DATA, INITIATIONS } from '#/data'
import { CATEGORIES } from '#/lib/types'
import type { Category } from '#/lib/types'
import { pickRandom } from '#/lib/utils'

export interface Suggestion {
  readonly category: Category
  readonly text: string
  readonly initiation: string | null
}

export interface GenerateOptions {
  readonly categories: readonly Category[]
  readonly includeInitiation: boolean
}

export function generateSuggestion({
  categories,
  includeInitiation,
}: GenerateOptions): Suggestion {
  const pool = categories.length > 0 ? categories : CATEGORIES
  const category = pickRandom(pool)

  return {
    category,
    text: pickRandom(SUGGESTION_DATA[category]),
    initiation: includeInitiation ? pickRandom(INITIATIONS) : null,
  }
}
