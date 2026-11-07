function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speakLines(lines: readonly string[]): void {
  if (!isSpeechSupported()) return

  const { speechSynthesis } = window
  speechSynthesis.cancel()

  for (const line of lines) {
    const utterance = new SpeechSynthesisUtterance(line)
    speechSynthesis.speak(utterance)
  }
}

export function cancelSpeech(): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.cancel()
}
