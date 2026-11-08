import { SUGGESTION_DATA, INITIATIONS } from '#/data'
import { CATEGORIES } from '#/lib/types'
import type { Category, PromptMode } from '#/lib/types'
import { pickRandom } from '#/lib/utils'

export interface Prompt {
  readonly mode: PromptMode
  readonly category: Category | null
  readonly text: string | null
  readonly initiation: string | null
}

export interface GenerateOptions {
  readonly categories: readonly Category[]
  readonly mode: PromptMode
}

function pickWord(categories: readonly Category[]): {
  category: Category
  text: string
} {
  const pool = categories.length > 0 ? categories : CATEGORIES
  const category = pickRandom(pool)

  return { category, text: pickRandom(SUGGESTION_DATA[category]) }
}

export function generatePrompt({ categories, mode }: GenerateOptions): Prompt {
  switch (mode) {
    case 'suggestion':
      return { mode, ...pickWord(categories), initiation: null }
    case 'both':
      return {
        mode,
        ...pickWord(categories),
        initiation: pickRandom(INITIATIONS),
      }
    case 'initiation':
      return {
        mode,
        category: null,
        text: null,
        initiation: pickRandom(INITIATIONS),
      }
  }
}
