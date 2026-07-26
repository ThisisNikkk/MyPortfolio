# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: this is not the Next.js you know

The project pins `next@16.2.6` — a build with breaking changes and conventions that differ from your training data. **Before writing any code that touches a Next.js API you aren't 100% certain about, read the relevant guide under `node_modules/next/dist/docs/` first** (organized into `01-app`, `02-guides`, `03-api-reference`). Heed deprecation notices found there. Don't assume familiar Next.js patterns (routing, metadata, config, data fetching) carry over unchanged.

## Commands

Package manager is **yarn** (`yarn.lock` is the committed lockfile; `package-lock.json` has been removed from the repo — don't regenerate it).

```bash
yarn dev      # start dev server (localhost:3000)
yarn build    # production build
yarn start    # run the production build
yarn lint     # eslint
```

There is no test suite configured in this repo (no test script, no test runner dependency) — don't assume one exists.

## Architecture

**Routing** — App Router under `src/app`:
- `/` (`page.tsx`) — composes `HeroComponent`, `WorkComponent`, `ProcessComponent`, `TestimonialsComponent`
- `/about` — thin server `page.tsx` that sets metadata and renders `AboutPageClient`
- `/contact`
- `/projects/[id]` — dynamic case-study route, statically generated via `generateStaticParams` over `src/data/projects.ts`; looks up the project by numeric `id` and 404s (`notFound()`) if not found
- `robots.ts` / `sitemap.ts` — metadata route handlers; the canonical production domain (`nikhilsiwan.dev`) is hardcoded in both of these and in `layout.tsx`'s metadata block

**Server/client split** — route `page.tsx` files stay server components (metadata, `generateStaticParams`, data lookup) and delegate interactive/animated UI to a sibling `*Client.tsx` component marked `"use client"` (e.g. `ProjectCaseStudyClient`, `AboutPageClient`). Follow this pattern for new routes rather than putting `"use client"` at the page level.

**Case-study data** — `src/data/projects.ts` is the single source of truth for portfolio content: a `projects: Project[]` array where each `Project` optionally has a `caseStudy` made of `CaseStudySection`s (`Problem` / `Research` / `Solution`-style blocks with `points`). Adding a project means adding an entry here; the `[id]` route and homepage `WorkComponent` both read from it.

**Layout shell** (`src/app/layout.tsx`) — nesting order: `ThemeProvider` (next-themes, class-based, `defaultTheme="light"`, `enableSystem={false}`) → `SmoothScrolling` (Lenis-based smooth-scroll wrapper, `src/components/layout/SmoothScrolling.tsx`) → `Navbar` + page `children` + `FooterComponent`. The Urbanist Google Font is loaded via `next/font/google` and exposed as the `--font-urbanist` CSS variable.

**Styling** — Tailwind v4, CSS-first config (no `tailwind.config.*` file). Theme tokens and the `dark` variant are declared directly in `src/app/globals.css` via `@theme inline` and `@custom-variant dark (&:where(.dark, .dark *))`; light/dark values live in `:root` / `.dark` CSS custom properties. Use the `cn()` helper (`src/lib/utils.ts`, `clsx` + `tailwind-merge`) for conditional/merged class names rather than manual string concatenation.

**Animation** — `framer-motion` is used throughout for entrance and scroll-driven animation; `lucide-react` supplies icons.

**Path alias** — `@/*` maps to `./src/*` (see `tsconfig.json`).
