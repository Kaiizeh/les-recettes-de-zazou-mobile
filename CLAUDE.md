# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Les Recettes de Zazou** is a French recipe mobile app built with React Native (Expo). The app allows users to browse, filter, and follow recipes step-by-step with offline support.

## Commands

```bash
pnpm dev          # Start Expo dev server (clears cache)
pnpm ios          # Run on iOS simulator
pnpm android      # Run on Android emulator
pnpm web          # Run in browser
pnpm clean        # Remove .expo and node_modules
```

Add UI components via React Native Reusables CLI:
```bash
npx @react-native-reusables/cli@latest add <component-name>
```

## Tech Stack

- **Framework**: Expo SDK 54 with Expo Router (file-based routing)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **UI Components**: React Native Reusables (shadcn/ui-style components)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm

## Architecture

```
app/              # Expo Router pages (file-based routing)
  _layout.tsx     # Root layout with ThemeProvider
  index.tsx       # Homepage (recipe list)
components/
  ui/             # Reusable UI primitives (button, card, badge, input, skeleton, text)
  recipes/        # Recipe-specific components (RecipeCard, SearchBar, FilterTags, etc.)
hooks/            # Custom React hooks (useDebounce, useRecipeFilters)
lib/              # Utilities (cn helper, theme config)
types/            # TypeScript type definitions
data/             # Mock data
```

## Styling

- Use `cn()` from `@/lib/utils` to merge Tailwind classes
- CSS variables defined in `global.css` for theming (light/dark)
- Brand colors in `tailwind.config.js`: `forest` (green primary), `cream` (background), `charcoal` (text)
- Path alias: `@/*` maps to project root

## Key Files

- `BRAND_GUIDELINES.md` - Color palette, typography (Playfair Display + Source Sans 3), spacing, component specs
- `SPECIFICATION_FONCTIONNEL.md` - Full functional specs in French (screens, behaviors, API endpoints, tech stack)
- `theme.ts` - Navigation theme configuration
- `global.css` - CSS variables for light/dark mode theming

## Conventions

- App language is French
- Use Lucide icons via `lucide-react-native`
- Components follow the React Native Reusables pattern (shadcn/ui-inspired)
- Semantic colors: `success`, `warning`, `error`, `info` with light/dark variants
