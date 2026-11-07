import { Button } from "#/components/ui/button"
import { Checkbox } from "#/components/ui/checkbox"
import { Label } from "#/components/ui/label"
import { Switch } from "#/components/ui/switch"
import { CATEGORIES, type Category } from "#/lib/types"
import { randomNumber } from "#/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import initiations from '../data/vague_statements_questions.json'
import activities from '../data/activities.json'
import objects from '../data/objects.json'
import occupations from '../data/occupations.json'
import words from '../data/words.json'
import adjectives from '../data/adjectives.json'
import locations from '../data/locations.json'

export const Route = createFileRoute('/')({ component: Home })

function Home() {

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([...CATEGORIES])
  const [includeInitiation, setIncludeInitiation] = useState(false)
  const [generatedInitiation, setGeneratedInitiation] = useState('')
  const [generatedSuggestion, setGeneratedSuggestion] = useState('')


  const handleCategoryClick = (category: Category) => {
    setSelectedCategories(selectedCategories.includes(category) ? selectedCategories.filter(cat => cat  != category) : [...selectedCategories, category])

  }

  const handleGenerateClick = () => {
    const resolvedCategories = selectedCategories.length ? selectedCategories : [...CATEGORIES]

    const randomCategory = resolvedCategories[randomNumber(resolvedCategories.length)]
    const randomInitiation = includeInitiation ? initiations[randomNumber(1000)] : '';
    const randomCategoryIndex = randomNumber(1000)

    console.log({resolvedCategories, randomCategory, randomInitiation, randomCategoryIndex})
    let randomSuggestion = ''
    switch (randomCategory) {
      case 'activities':
        randomSuggestion = activities[randomCategoryIndex]
        break;
      case 'adjectives':
        randomSuggestion = adjectives[randomCategoryIndex]
        break;
      case 'objects':
        randomSuggestion = objects[randomCategoryIndex]
        break;
      case 'locations':

        randomSuggestion = locations[randomCategoryIndex]
        break;
      case 'words':
        randomSuggestion = words[randomCategoryIndex]
        break;
      case 'occupations':
          randomSuggestion = occupations[randomCategoryIndex]
          break;
    }
    console.log({randomSuggestion, randomInitiation})

    setGeneratedSuggestion(randomSuggestion)
    setGeneratedInitiation(randomInitiation)

  }

  return (
    <div className="p-8 flex flex-col gap-10">
      <Accordion className="w-full max-w-xl">
        <AccordionItem value="item-1">
          <AccordionTrigger>Suggestions
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-4">
            {CATEGORIES.map(category => <Label className="flex gap-4 uppercase"  onClick={() => handleCategoryClick(category)} key={category}><Checkbox checked={selectedCategories.includes(category)} />{category}</Label>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center space-x-2">
        <Switch checked={includeInitiation} onCheckedChange={setIncludeInitiation} id="initiation" />
        <Label htmlFor="">Vague Initiation</Label>
      </div>

      <Button onClick={handleGenerateClick}>Generate</Button>
        {generatedInitiation}
       {generatedSuggestion}

    </div>
  )
}
