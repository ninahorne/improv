import { useEffect } from 'react'

import type { Suggestion } from '#/lib/generator'
import { cancelSpeech, speakLines } from '#/lib/speech'

/** Reads the current suggestion (and starting line) aloud whenever it changes. */
export function useSpeechForSuggestion(
  suggestion: Suggestion | null,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled || !suggestion) return

    speakLines(
      suggestion.initiation
        ? [suggestion.text, suggestion.initiation]
        : [suggestion.text],
    )

    return () => cancelSpeech()
  }, [suggestion, enabled])
}
