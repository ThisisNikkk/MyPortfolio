# Nikhil Siwan — Portfolio

The personal portfolio of **Nikhil Siwan**, a Software Developer based in Chandigarh, India. Specializing in **React Native** mobile apps, **Next.js** web applications, and **AI Agents & Automation**.

Built with an **agent-first architecture**: the site presents a polished, animated interactive UI for human visitors, alongside native, content-negotiated markdown, an OpenAPI 3.1 specification, and a Model Context Protocol (MCP) server for AI agents and LLMs.

---

## 🛠 Tech Stack

- **Framework:** Next.js `16.2.6` (App Router)
- **Library:** React `19.2.4` / React DOM `19.2.4`
- **Styling:** Tailwind CSS `v4` (CSS-first `@theme inline`, `@custom-variant dark`, no legacy `tailwind.config.*`)
- **Animation & Motion:** Framer Motion `^12.40.0`
- **Smooth Scrolling:** Lenis `^1.3.23` (`@studio-freight/lenis`)
- **Theming:** `next-themes` with native View Transitions API support
- **Icons:** `lucide-react`
- **Language & Runtime:** TypeScript `^5`, Node.js (tested on Node `v20+` / `v26`)
- **Package Manager:** strictly `yarn` (`yarn.lock` is committed; do not generate `package-lock.json`)

---

## ⚠️ Critical Next.js 16 Rules

> **Important:** This repository pins `next@16.2.6`. APIs, conventions, and file conventions differ from older Next.js versions.

1. **Asynchronous Route Context:** `params` and `searchParams` on pages and route handlers are **Promises** and must be awaited:
   ```ts
   export default async function Page({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }
   ```
2. **Server/Client Separation:** Route `page.tsx` files remain Server Components (handling metadata, data lookups, and `generateStaticParams`) and delegate interactive/animated UI to client components marked `"use client"` (e.g. `*Client.tsx`).
3. **Reference Docs:** Always check the documentation bundled in `node_modules/next/dist/docs/` (`01-app`, `02-guides`, `03-api-reference`) for exact API contracts.

---

## 🤖 Agent-Ready & Dual-Surface Architecture

The site implements a dual-surface web architecture serving humans and machines without drift:

### 1. Model Context Protocol (MCP)
- **Manifest:** `/.well-known/mcp` and `/.well-known/mcp.json` rewrite to `/api/mcp-manifest`.
- **Server:** `/api/mcp` implements a stateless JSON-RPC 2.0 Streamable HTTP server supporting:
  - `initialize`
  - `tools/list`
  - `tools/call` with tools:
    - `list_projects`: Filter portfolio projects by category (`Web Design`, `Mobile Applications`, `AI Projects`).
    - `get_project`: Retrieve full case studies (Problem, Research, Solution) by numeric ID.

### 2. Markdown Content Negotiation (`acceptmarkdown.com`)
- Defined via `beforeFiles` rewrites in `next.config.ts`.
- Any regular route (`/`, `/about`, `/contact`, `/work`, `/projects/:id`) requested with `Accept: text/markdown` or `?format=md` is transparently served clean markdown from `/api/markdown/[[...slug]]`.
- Preserves URLs and emits `Vary: Accept, Accept-Encoding`.

### 3. Public REST API & OpenAPI 3.1
- `GET /api/projects` — Filterable by `?category=...` (case-insensitive) with CORS headers.
- `GET /api/projects/:id` — Single case study response.
- **Strict Error Shapes:** JSON errors guarantee `{ error: { code, message, hint } }` with machine-matchable codes like `project_not_found`, `invalid_project_id`, and `invalid_category`.
- `GET /openapi.json` — Complete OpenAPI 3.1 schema.
- `GET /llms.txt` — Structured LLM guide covering when to use and when not to use this site.

### 4. Machine Identity & Discovery
- **JSON-LD Schema.org:** Embedded via `StructuredData.tsx` with unified `@graph` linking `Person`, `Organization` (with `PostalAddress` and `ContactPoint`), and `WebSite` nodes.
- `robots.ts` & `sitemap.ts`: Dynamic metadata route handlers referencing canonical URLs.

---

## 📂 Project Structure

```
MyPortfolio/
├── scripts/
│   └── verify-agents.mjs       # Comprehensive HTTP test harness for agent endpoints
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── markdown/[[...slug]]/route.ts  # Markdown content negotiation endpoint
│   │   │   ├── mcp/route.ts                   # Streamable HTTP MCP server
│   │   │   ├── mcp-manifest/route.ts          # MCP well-known manifest
│   │   │   └── projects/                      # Public REST JSON API
│   │   ├── about/                             # About page route
│   │   ├── blog/                              # Blog catalog and [slug] reader routes
│   │   ├── contact/                           # Contact page with Cal.com integration
│   │   ├── projects/[id]/                     # Dynamic case-study route
│   │   ├── work/                              # Full project catalog route
│   │   ├── llms.txt/route.ts                  # llms.txt specification endpoint
│   │   ├── openapi.json/route.ts              # OpenAPI 3.1 specification endpoint
│   │   ├── globals.css                        # Tailwind v4 theme, keyframes, styling
│   │   ├── layout.tsx                         # Root layout, fonts, providers, metadata
│   │   ├── not-found.tsx                      # Synchronous 404 handler
│   │   ├── page.tsx                           # Homepage composition
│   │   ├── robots.ts                          # Crawler robots configuration
│   │   └── sitemap.ts                         # Dynamic XML sitemap
│   ├── components/
│   │   ├── about/                             # About timeline, SVG art, stack marquee
│   │   ├── blog/                              # BlogCatalogClient and BlogPostClient
│   │   ├── layout/                            # SmoothScrolling (Lenis) wrapper
│   │   ├── ui/                                # DragMarquee, ZoomableImage, FadeImage, etc.
│   │   ├── ClosingCTA.tsx                     # 3D tilt card, Chandigarh time, copy email
│   │   ├── FooterComponent.tsx                # Interactive breathing pixel art canvas
│   │   ├── HeroComponent.tsx                  # Dynamic pill headline & spring physics
│   │   ├── Navbar.tsx                         # Directional auto-hiding navbar
│   │   ├── NotFoundClient.tsx                 # Interactive 404 compass needle
│   │   ├── ProcessComponent.tsx               # 5-step interactive process visualizer
│   │   ├── ProjectCaseStudyClient.tsx         # Sticky-rail case study layout
│   │   ├── ProjectMockup.tsx                  # Single/multi phone frame mockups
│   │   ├── TestimonialsComponent.tsx          # Swipeable testimonials with inertia
│   │   ├── ThemeToggle.tsx                    # View Transitions API theme switch
│   │   └── WorkComponent.tsx                  # Filterable project showcase
│   ├── data/
│   │   ├── blog.ts                            # Single source of truth for blog posts & articles
│   │   └── projects.ts                        # Single source of truth for portfolio projects
│   └── lib/
│       ├── api.ts                             # API shapes, serialization & error helpers
│       ├── markdown.ts                        # Markdown projections generator
│       ├── preload-images.ts                  # Idle image preloading & cache warmers
│       ├── site-meta.ts                       # Single source of truth for identity & URLs
│       └── utils.ts                           # cn() clsx + twMerge utility
├── next.config.ts                             # Rewrites, headers, image caching, inline CSS
├── package.json                               # Dependencies & scripts
└── tsconfig.json                              # TypeScript configuration (@/* alias)
```

---

## 🎨 Design & Performance Details

- **LCP-Safe Keyframes:** The hero headline entrance is rendered via CSS keyframes (`.hero-rise`) rather than runtime JS so the LCP element is visible on first paint.
- **Dynamic ResizeObserver:** The rotating phrase pill in the hero measures text dimensions with `ResizeObserver` and interpolates width using spring physics without squashing the text.
- **Fluid Lightbox (`ZoomableImage`):** Opens out of the thumbnail bounding box, tracks 1:1 vertical drag gestures, and dismisses using Apple's fluid momentum projection (`0.998/ms` decay).
- **Physics Drag Marquee:** Momentum scrolling with pointer capture, velocity decay, and pause on hover.
- **Interactive 404 Compass:** The zero in `404` is an interactive compass needle calculating angles with `Math.atan2` to track user focus, cursor position, or default to home.
- **Breathing Pixel Art Footer:** Generates a custom 7-row SVG pixel-art grid rendering `"Nikhil Siwan"` with staggered keyframe breathing animations.
- **Cal.com Theme Synchronizer:** Uses double-buffered iframes on `/contact` to cross-fade between dark and light themes without white flashes.
- **Editorial Bento Blog Catalog:** 5-card Bento grid composition strictly using the site's `#c6f023` (neon lime) and zinc palette with zero raster image covers (pure code telemetry HUD, audio frequency spectrum, and vector schematics). Features real-time category filtering, instant keyword search, Lenis-synchronized pagination (5 articles per page), and dual-surface markdown content negotiation.

---

## 🚀 Development & Commands

```bash
# Install dependencies
yarn install

# Start local development server (localhost:3000)
yarn dev

# Production build
yarn build

# Run production build locally
yarn start

# Run ESLint checks
yarn lint

# Run agent verification test suite (against running server)
yarn verify:agents
# Or against a remote deployment:
yarn verify:agents https://nikhilsiwan.vercel.app
```

---

## 📄 License & Attribution

Personal portfolio source code created by [Nikhil Siwan](https://github.com/ThisisNikkk).
