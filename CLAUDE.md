# CLAUDE.md

Project context for AI coding assistants.

## Project

**bino-ai-pilot** — a small test bench where designers at BI Norwegian Business
School (bi.no) run AI experiments on code generation with the BI design system
(`@bi-digital/react`).

The whole app is one page: it renders the latest generated result on a blank
white canvas, so a designer can look at it, screenshot it and copy the code.

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

## Kjøre en prompt fra chatten

Designeren har `pnpm dev` kjørende og nettleseren åpen på
http://localhost:5174 ved siden av Claude Code. Når designeren skriver en
prompt i chatten — f.eks. «Lag en stor knapp med teksten Home» — er det en
kjøring, ikke en utviklingsoppgave:

1. **Skriv om `src/result.tsx`** slik at den rendrer det designeren ba om.
2. **Ikke spør om lov** til å overskrive fila — forrige kjøring skal erstattes.
   Det finnes bare én resultat-slot, og historikken ligger i git.
3. **Svar kort** i chatten: hva som ble generert, og at resultatet er klart i
   nettleseren. Vite laster siden på nytt av seg selv.

Designeren tar skjermbildet selv (cmd+shift+4) og kopierer koden med
«Kopier kode»-knappen. Du skal **ikke** score eller vurdere resultatet.

### Formatet på `src/result.tsx`

`prompt` er promptteksten på **én linje** (bytt linjeskift med mellomrom) — den
vises i verktøylinja. Alt under markørlinja er det designeren kopierer, så det
skal være komplett, kjørbar kode: nødvendige `import`-linjer og én
default-eksportert `Result`-komponent.

```tsx
// Denne fila skrives av Claude Code hver gang en prompt kjøres, og forrige
// kjøring blir overskrevet. Alt over markørlinja er metadata; alt under er
// selve den genererte koden (det er den designeren kopierer).

export const prompt = "Lag en stor knapp med teksten Home";

// --- generert kode ---
export default function Result() {
  return (
    // something
  );
}
```

Blank slate er `prompt = ""` og en `Result` som returnerer `null` — da viser
appen tom-tilstanden.
