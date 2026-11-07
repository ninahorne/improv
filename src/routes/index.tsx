import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

import { SettingsPanel } from '@/components/settings-panel'
import { SuggestionDisplay } from '@/components/suggestion-display'

import { generateSuggestion } from '#/lib/generator'
import type { Suggestion } from '#/lib/generator'
import { useAutoRefresh } from '#/hooks/use-auto-refresh'
import { useSpeechForSuggestion } from '#/hooks/use-speech'
import { CATEGORIES } from '#/lib/types'
import type { Settings } from '#/lib/types'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const [settings, setSettings] = useState<Settings>({
    selectedCategories: [...CATEGORIES],
    includeInitiation: false,
    autoRefreshInterval: null,
    speakAloud: false,
  })
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)

  const handleSettingsChange = useCallback((update: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...update }))
  }, [])

  const handleGenerate = useCallback(() => {
    setSuggestion(
      generateSuggestion({
        categories: settings.selectedCategories,
        includeInitiation: settings.includeInitiation,
      }),
    )
  }, [settings])

  const secondsRemaining = useAutoRefresh({
    action: handleGenerate,
    intervalSeconds: settings.autoRefreshInterval,
    resetKey: suggestion,
  })

  useSpeechForSuggestion(suggestion, settings.speakAloud)

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 md:p-8">
      <header>
        <h1 className="text-3xl md:text-4xl">Improv Prompt Generator</h1>
        <p className="mt-2 text-foreground/70">
          A random suggestion and starting line for your next scene.
        </p>
      </header>

      <SettingsPanel
        settings={settings}
        secondsRemaining={secondsRemaining}
        onSettingsChange={handleSettingsChange}
      />

      <SuggestionDisplay suggestion={suggestion} onGenerate={handleGenerate} />
    </main>
  )
}
