import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import type { Suggestion } from '#/lib/generator'
import { CATEGORY_LABELS } from '#/lib/types'

export interface SuggestionDisplayProps {
  suggestion: Suggestion | null
  onGenerate: () => void
}

export function SuggestionDisplay({
  suggestion,
  onGenerate,
}: SuggestionDisplayProps) {
  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        {suggestion ? (
          <>
            <CardAction>
              <Badge className="uppercase">
                {CATEGORY_LABELS[suggestion.category]}
              </Badge>
            </CardAction>
            <CardDescription>Your suggestion</CardDescription>
            <CardTitle className="font-heading text-2xl md:text-3xl text-balance">
              {suggestion.text}
            </CardTitle>
          </>
        ) : (
          <>
            <CardDescription>Nothing yet</CardDescription>
            <CardTitle className="font-heading text-2xl md:text-3xl text-balance">
              Hit “Generate” to land on some improv fuel.
            </CardTitle>
          </>
        )}
      </CardHeader>

      {suggestion?.initiation && (
        <CardContent className="flex flex-col gap-2">
          <Label className="text-xs uppercase">Starting line</Label>
          <blockquote className="rounded-base border-2 border-border bg-background px-4 py-3 text-base italic">
            {suggestion.initiation}
          </blockquote>
        </CardContent>
      )}

      <CardFooter>
        <Button size="lg" className="w-full" onClick={onGenerate}>
          Generate
        </Button>
      </CardFooter>
    </Card>
  )
}
