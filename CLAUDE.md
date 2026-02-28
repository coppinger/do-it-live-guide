# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 single-page guide website that helps users set up live streaming on Twitch. It auto-detects the visitor's OS and shows OS-specific setup instructions (macOS, Windows, Linux). Built by Buildstory.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

No test framework is configured.

## Architecture

- **Next.js App Router** with a single route (`/`)
- **`/doitlive-guide.jsx`** — Monolithic component (~1,200 lines) containing the entire UI: design tokens, reusable sub-components (FadeIn, OSCard, Step, Callout, etc.), and the main DoItLiveGuide export
- **`/app/page.tsx`** — Imports and renders DoItLiveGuide
- **`/app/layout.tsx`** — Root layout with OG/Twitter metadata
- **`/app/opengraph-image.tsx`** — Dynamic OG image generation
- **`/lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge)

## Styling Approach

The main component uses **inline CSS-in-JS** (not Tailwind classes), with a centralized design token object `T` at the top of `doitlive-guide.jsx` defining colors, fonts, and spacing. Tailwind and shadcn are installed but currently only used in layout/utility contexts.

Key design tokens: dark theme, gold accent (`#c4a35a`), Space Mono (monospace), Playfair Display (serif).

## Key Patterns

- OS detection on mount via `navigator.platform`/`navigator.userAgent`, with state-driven conditional rendering of guide steps
- Cascading fade-in animations with incremental delays (100ms steps)
- Path alias: `@/*` maps to project root
- shadcn configured with "new-york" style and lucide icons
