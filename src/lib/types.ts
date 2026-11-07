export const CATEGORIES = [
  'adjectives',
  'objects',
  'activities',
  'occupations',
  'locations',
  'words',
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABELS: Record<Category, string> = {
  adjectives: 'Adjectives',
  objects: 'Objects',
  activities: 'Activities',
  occupations: 'Occupations',
  locations: 'Locations',
  words: 'Words',
}

export const TIMER_INTERVALS = [30, 60] as const

export type TimerInterval = (typeof TIMER_INTERVALS)[number]

export interface Settings {
  readonly selectedCategories: readonly Category[]
  readonly includeInitiation: boolean
  readonly autoRefreshInterval: number | null
}
