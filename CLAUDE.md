# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 16 App Router** project using TypeScript, Tailwind CSS v4, and React 19. It serves multiple distinct apps/pages under the `app/` directory.

### Routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `app/components/EstebanToroSite.tsx` | Personal portfolio/landing for Esteban Toro |
| `/agent-app` | `app/components/Landing.tsx` | Landing page for an AI agent product |
| `/(course-agent-app)/view` | `app/components/DailiAppLanding.tsx` + `PDFStudio` | PDF document builder for a course/agent product |
| `/script` | `app/script/page.tsx` | Internal sales script viewer (collapsible flow nodes, Spanish content) |

### Key modules

- **`lib/supabase.ts`** — singleton Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars.
- **`types/pdf.ts`** — shared types for the PDF block system (`Block`, `BlockType`, `BlockData` and all block-specific interfaces).
- **`app/(course-agent-app)/view/components/PDFStudio.tsx`** — the main PDF builder UI. Fetches a course content tree from Supabase, lets the user compose block-based documents, and renders them via `@react-pdf/renderer`. The `PDFDownloadLink` is dynamically imported with `ssr: false` to avoid server-side rendering issues.
- **`app/(course-agent-app)/view/components/PDFDocument.tsx`** — the `@react-pdf/renderer` document component consumed by `PDFStudio`.

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `app/globals.css`. No separate `tailwind.config` file — configuration is done through PostCSS.

### Analytics

`@vercel/analytics` and `@vercel/speed-insights` are injected globally in `app/layout.tsx`.

### Environment variables required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
