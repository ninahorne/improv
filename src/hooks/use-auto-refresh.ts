import { useEffect, useRef, useState } from 'react'

export interface UseAutoRefreshOptions {
  /** Called every time the countdown completes. */
  action: () => void
  /** Countdown length in seconds. `null` disables auto refresh. */
  intervalSeconds: number | null
  /** Changing this value resets the countdown (e.g. after a manual generate). */
  resetKey?: unknown
}

export function useAutoRefresh({
  action,
  intervalSeconds,
  resetKey,
}: UseAutoRefreshOptions): number | null {
  const actionRef = useRef(action)
  useEffect(() => {
    actionRef.current = action
  })

  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(
    intervalSeconds,
  )

  useEffect(() => {
    setSecondsRemaining(intervalSeconds)
  }, [intervalSeconds, resetKey])

  useEffect(() => {
    if (intervalSeconds === null) return

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) =>
        Math.max(0, (current ?? intervalSeconds) - 1),
      )
    }, 1000)

    return () => window.clearInterval(timer)
  }, [intervalSeconds])

  useEffect(() => {
    if (secondsRemaining !== 0) return

    setSecondsRemaining(intervalSeconds)
    actionRef.current()
  }, [secondsRemaining, intervalSeconds])

  return secondsRemaining
}
