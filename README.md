# Improv Prompt Generator

A prompt generator for improv practice: a random suggestion (word, object, activity, occupation, location, or adjective) plus an optional vague starting line to open a scene. Optionally, the browser reads each new prompt aloud.

**Live site:** https://improv-prompt-generator.netlify.app

## Features

- Random suggestion from six categories: adjectives, objects, activities, occupations, locations, words
- Pick which categories to include
- Optional "vague initiation" — an ambiguous starting sentence for the scene
- Optional auto-refresh: generate a new suggestion every 30s or 1 min, with a countdown
- Optional text-to-speech so the browser reads new prompts aloud
- Neobrutalist UI ([neobrutalism.dev](https://neobrutalism.dev) components built on [Base UI](https://base-ui.com/react))

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Building For Production

```bash
pnpm build
pnpm preview
```

## Scripts

| Script        | What it does                    |
| ------------- | ------------------------------- |
| `pnpm dev`    | Run the dev server on port 3000 |
| `pnpm build`  | Production build to `dist/`     |
| `pnpm lint`   | Run eslint                      |
| `pnpm format` | Prettier + eslint autofix       |
| `pnpm check`  | Verify prettier formatting      |

## Project Structure

```
src/
├── components/       # Feature components + ui/ (neobrutalism primitives)
│   ├── ui/           # card, badge, toggle, switch, checkbox, progress, ...
│   ├── category-picker.tsx
│   ├── settings-panel.tsx
│   ├── auto-refresh-timer.tsx
│   └── suggestion-display.tsx
├── hooks/            # useAutoRefresh (timer), useSpeechForSuggestion (TTS)
├── lib/
│   ├── generator.ts  # pure suggestion generator
│   ├── speech.ts     # Web Speech API wrappers
│   ├── types.ts      # categories, settings shape
│   └── utils.ts      # cn(), pickRandom()
├── data/             # JSON datasets + index mapping categories → data
└── routes/           # TanStack Router file-based routes
```

## Editing The Data

All prompts live in `src/data/*.json` — one 1000-entry array per file. To add your own prompts, just edit the JSON files; the generator picks up changes automatically.

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Add a file in `src/routes` and the route tree is generated automatically by `pnpm generate-routes`.

## Linting & Formatting

Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint):

```bash
pnpm lint
pnpm format
pnpm check
```

## Deployment

The app is a static SPA deployed on [Netlify](https://netlify.com) at `improv-prompt-generator.netlify.app`. Build and publish settings live in `netlify.toml` (`pnpm build` → `dist/`, with an SPA fallback redirect).

Redeploy from this repo with:

```bash
netlify deploy --prod
```
