import { Progress } from '@/components/ui/progress'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'

import { TIMER_INTERVALS } from '#/lib/types'
import type { TimerInterval } from '#/lib/types'

const OFF_VALUE = 'off'

const intervalLabel = (seconds: TimerInterval) =>
  seconds === 60 ? '1 min' : `${seconds}s`

const intervalOptions = [
  { value: OFF_VALUE, seconds: null, label: 'Off' },
  ...TIMER_INTERVALS.map((seconds) => ({
    value: String(seconds),
    seconds: seconds,
    label: intervalLabel(seconds),
  })),
]

export interface AutoRefreshTimerProps {
  intervalSeconds: number | null
  secondsRemaining: number | null
  onIntervalChange: (intervalSeconds: number | null) => void
}

function toInterval(values: readonly unknown[]): number | null {
  const value = String(values[values.length - 1] ?? OFF_VALUE)
  const option = intervalOptions.find((item) => item.value === value)
  return option ? option.seconds : null
}

export function AutoRefreshTimer({
  intervalSeconds,
  secondsRemaining,
  onIntervalChange,
}: AutoRefreshTimerProps) {
  const selectedValue =
    intervalSeconds === null ? OFF_VALUE : String(intervalSeconds)
  const progressPercent =
    intervalSeconds !== null && secondsRemaining !== null
      ? Math.round((secondsRemaining / intervalSeconds) * 100)
      : 0

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Label>Auto refresh</Label>
          <p className="text-sm text-foreground/70">
            Generate a new suggestion on a timer.
          </p>
        </div>
        <ToggleGroup
          size="sm"
          value={[selectedValue]}
          onValueChange={(groupValue) =>
            onIntervalChange(toInterval(groupValue))
          }
          aria-label="Auto refresh interval"
        >
          {intervalOptions.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {intervalSeconds !== null && secondsRemaining !== null && (
        <div className="flex items-center gap-4">
          <Progress value={progressPercent} className="min-w-0 flex-1" />
          <span className="whitespace-nowrap text-sm font-heading tabular-nums">
            {`Next in ${secondsRemaining}s`}
          </span>
        </div>
      )}
    </section>
  )
}
