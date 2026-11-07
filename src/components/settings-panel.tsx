import { AutoRefreshTimer } from '@/components/auto-refresh-timer'
import { CategoryPicker } from '@/components/category-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import type { Settings } from '#/lib/types'

export interface SettingsPanelProps {
  settings: Settings
  secondsRemaining: number | null
  onSettingsChange: (update: Partial<Settings>) => void
}

export function SettingsPanel({
  settings,
  secondsRemaining,
  onSettingsChange,
}: SettingsPanelProps) {
  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Choose the categories and how the suggestions are served.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <CategoryPicker
          selected={settings.selectedCategories}
          onChange={(selectedCategories) =>
            onSettingsChange({ selectedCategories })
          }
        />

        <section className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="vague-initiation">Vague initiation</Label>
            <p className="text-sm text-foreground/70">
              Add a random starting line to the suggestion.
            </p>
          </div>
          <Switch
            id="vague-initiation"
            checked={settings.includeInitiation}
            onCheckedChange={(includeInitiation) =>
              onSettingsChange({ includeInitiation })
            }
          />
        </section>

        <AutoRefreshTimer
          intervalSeconds={settings.autoRefreshInterval}
          secondsRemaining={secondsRemaining}
          onIntervalChange={(autoRefreshInterval) =>
            onSettingsChange({ autoRefreshInterval })
          }
        />
      </CardContent>
    </Card>
  )
}
