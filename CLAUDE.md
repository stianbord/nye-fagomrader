# CLAUDE.md

Project context for AI coding assistants.

## Project

**bino-ai-pilot** — a small test bench where designers at BI Norwegian Business
School (bi.no) run AI experiments on code generation with the BI design system
(`@bi-digital/react`).

## Stack

- **Framework**: React 19
- **Language**: TypeScript 6
- **Bundler**: Vite 8
- **Package manager**: pnpm
- **Linter**: ESLint with typescript-eslint

## Commands

```bash
pnpm dev        # Start dev server (http://localhost:5174)
pnpm build      # Type-check + build for production (tsc -b && vite build)
pnpm lint       # Run ESLint
pnpm preview    # Preview production build
```

## Project Structure

```
src/
  main.tsx      # Entry point
  App.tsx       # The only page: toolbar + result canvas
  result.tsx    # GENERATED — the latest result, overwritten on every run
  index.css     # Global styles (deliberately neutral, not BI-branded)
public/         # Public assets served at root
```

## Conventions

- Use functional React components with hooks
- Prefer TypeScript strict types — avoid `any`
- Use ES modules (`"type": "module"` in package.json)
- Use the BI design system when you can (`@bi-digital/react`)