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

import type { Prompt } from '#/lib/generator'
import { CATEGORY_LABELS } from '#/lib/types'

export interface PromptDisplayProps {
  prompt: Prompt | null
  onGenerate: () => void
}

export function PromptDisplay({ prompt, onGenerate }: PromptDisplayProps) {
  const hasWord = prompt?.text !== null && prompt !== null

  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        {prompt ? (
          <>
            {prompt.category !== null && (
              <CardAction>
                <Badge className="uppercase">
                  {CATEGORY_LABELS[prompt.category]}
                </Badge>
              </CardAction>
            )}
            <CardDescription>
              {hasWord ? 'Your suggestion' : 'Your starting line'}
            </CardDescription>
            <CardTitle className="font-heading text-2xl md:text-3xl text-balance">
              {prompt.text ?? prompt.initiation}
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

      {hasWord && prompt.initiation !== null && (
        <CardContent className="flex flex-col gap-2">
          <Label className="text-xs uppercase">Starting line</Label>
          <blockquote className="rounded-base border-2 border-border bg-background px-4 py-3 text-base italic">
            {prompt.initiation}
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
