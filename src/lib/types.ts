export const CATEGORIES = ['adjectives', 'objects', 'activities', 'occupations', 'locations', 'words'] as const;

export type Category = typeof CATEGORIES[number];
