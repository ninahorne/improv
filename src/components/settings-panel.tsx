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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { PROMPT_MODES, PROMPT_MODE_LABELS } from '#/lib/types'
import type { PromptMode, Settings } from '#/lib/types'

export interface SettingsPanelProps {
  settings: Settings
  secondsRemaining: number | null
  onSettingsChange: (update: Partial<Settings>) => void
}

function isPromptMode(value: unknown): value is PromptMode {
  return (
    typeof value === 'string' &&
    (PROMPT_MODES as readonly string[]).includes(value)
  )
}

export function SettingsPanel({
  settings,
  secondsRemaining,
  onSettingsChange,
}: SettingsPanelProps) {
  const handleModeChange = (values: readonly unknown[]) => {
    const next = values[values.length - 1]
    if (!isPromptMode(next)) return

    onSettingsChange({ mode: next })
  }

  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Choose the categories and how the prompts are served.
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
            <Label>Content</Label>
            <p className="text-sm text-foreground/70">
              A word, a word with a starting line, or just a line.
            </p>
          </div>
          <ToggleGroup
            size="sm"
            value={[settings.mode]}
            onValueChange={handleModeChange}
            aria-label="What to generate"
          >
            {PROMPT_MODES.map((mode) => (
              <ToggleGroupItem key={mode} value={mode}>
                {PROMPT_MODE_LABELS[mode]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </section>

        <AutoRefreshTimer
          intervalSeconds={settings.autoRefreshInterval}
          secondsRemaining={secondsRemaining}
          onIntervalChange={(autoRefreshInterval) =>
            onSettingsChange({ autoRefreshInterval })
          }
        />

        <section className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="read-aloud">Read aloud</Label>
            <p className="text-sm text-foreground/70">
              Have the browser read new prompts out loud.
            </p>
          </div>
          <Switch
            id="read-aloud"
            checked={settings.speakAloud}
            onCheckedChange={(speakAloud) => onSettingsChange({ speakAloud })}
          />
        </section>
      </CardContent>
    </Card>
  )
}
