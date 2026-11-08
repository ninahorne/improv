import { useEffect } from 'react'

import type { Prompt } from '#/lib/generator'
import { cancelSpeech, speakLines } from '#/lib/speech'

/** Reads the current prompt (and starting line) aloud whenever it changes. */
export function useSpeechForPrompt(prompt: Prompt | null, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !prompt) return

    speakLines([prompt.text, prompt.initiation].filter((line) => line !== null))

    return () => cancelSpeech()
  }, [prompt, enabled])
}
