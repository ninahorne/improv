import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { CATEGORIES, CATEGORY_LABELS } from '#/lib/types'
import type { Category } from '#/lib/types'

export interface CategoryPickerProps {
  selected: readonly Category[]
  onChange: (selected: Category[]) => void
}

export function CategoryPicker({ selected, onChange }: CategoryPickerProps) {
  const allSelected = selected.length === CATEGORIES.length

  const handleToggle = (category: Category, checked: boolean) => {
    onChange(
      checked
        ? [...selected, category]
        : selected.filter((item) => item !== category),
    )
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label>{`Categories (${selected.length}/${CATEGORIES.length})`}</Label>
        <Button
          size="xs"
          variant="neutral"
          onClick={() => onChange(allSelected ? [] : [...CATEGORIES])}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selected.includes(category)
          return (
            <Label
              key={category}
              className={cn(
                'flex w-fit cursor-pointer items-center gap-2 rounded-base border-2 border-border px-2.5 py-1.5 text-xs font-heading uppercase transition-colors',
                isSelected
                  ? 'bg-main text-main-foreground'
                  : 'bg-secondary-background text-foreground',
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleToggle(category, checked === true)
                }
              />
              {CATEGORY_LABELS[category]}
            </Label>
          )
        })}
      </div>
    </section>
  )
}
