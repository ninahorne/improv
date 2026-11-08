import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

import { PromptDisplay } from '@/components/prompt-display'
import { SettingsPanel } from '@/components/settings-panel'

import { generatePrompt } from '#/lib/generator'
import type { Prompt } from '#/lib/generator'
import { useAutoRefresh } from '#/hooks/use-auto-refresh'
import { useSpeechForPrompt } from '#/hooks/use-speech'
import { CATEGORIES } from '#/lib/types'
import type { Settings } from '#/lib/types'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const [settings, setSettings] = useState<Settings>({
    selectedCategories: [...CATEGORIES],
    mode: 'suggestion',
    autoRefreshInterval: null,
    speakAloud: false,
  })
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  const handleSettingsChange = useCallback((update: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...update }))
  }, [])

  const handleGenerate = useCallback(() => {
    setPrompt(
      generatePrompt({
        categories: settings.selectedCategories,
        mode: settings.mode,
      }),
    )
  }, [settings])

  const secondsRemaining = useAutoRefresh({
    action: handleGenerate,
    intervalSeconds: settings.autoRefreshInterval,
    resetKey: prompt,
  })

  useSpeechForPrompt(prompt, settings.speakAloud)

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

      <PromptDisplay prompt={prompt} onGenerate={handleGenerate} />
    </main>
  )
}
