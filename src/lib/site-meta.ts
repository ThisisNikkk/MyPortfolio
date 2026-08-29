/**
 * Single source of truth for identity, contact, and canonical-URL facts.
 *
 * Everything agent-facing (JSON-LD, llms.txt, the OpenAPI spec, the MCP
 * manifest, robots, sitemap, page metadata) reads from here, so an identity
 * fact is stated once and can never drift between the human and machine
 * surfaces of the site.
 */

/**
 * Canonical origin, no trailing slash.
 *
 * There is no custom domain yet, so the deployed Vercel URL *is* the canonical
 * one — pointing canonical/robots/sitemap at an unregistered `nikhilsiwan.dev`
 * would send crawlers and agents to a host that does not resolve. When the
 * domain goes live, set NEXT_PUBLIC_SITE_URL (or edit this default) and every
 * surface follows.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nikhilsiwan.vercel.app"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const person = {
  name: "Nikhil Siwan",
  jobTitle: "Software Developer",
  email: "developer.nikk@gmail.com",
  /**
   * City-level only. No street address or phone number is published — those
   * are not public facts about this site and must not be invented.
   */
  address: {
    locality: "Chandigarh",
    region: "Chandigarh",
    country: "IN",
  },
  description:
    "Software developer specialising in AI agents, high-performance mobile apps, and enterprise SaaS design systems.",
  sameAs: [
    "https://linkedin.com/in/nikhilsiwan",
    "https://behance.net/nikhilsiwan",
    "https://github.com/ThisisNikkk",
  ],
  knowsAbout: [
    "AI agents",
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Design systems",
    "Product design",
    "UI/UX design",
  ],
} as const;

/** Human-facing pages, used by the sitemap, llms.txt, and the 404 recovery list. */
export const pages = [
  { path: "/", title: "Home", summary: "Portfolio overview, selected projects, and process." },
  { path: "/about", title: "About", summary: "Background, timeline, capabilities, and FAQ." },
  { path: "/contact", title: "Contact", summary: "Email, location, and a bookable 30-minute call." },
] as const;

/** Machine-readable endpoints, advertised in llms.txt. */
export const machineEndpoints = [
  { path: "/llms.txt", title: "llms.txt", summary: "Site summary and when-to-use guidance for agents." },
  { path: "/openapi.json", title: "OpenAPI 3.1 spec", summary: "Full description of the public read-only API." },
  { path: "/api/projects", title: "Projects collection", summary: "JSON list of every portfolio project." },
  { path: "/api/projects/{id}", title: "Project detail", summary: "JSON case study for a single project." },
  { path: "/.well-known/mcp", title: "MCP manifest", summary: "Model Context Protocol server descriptor." },
  { path: "/api/mcp", title: "MCP endpoint", summary: "JSON-RPC 2.0 Streamable HTTP MCP transport." },
  { path: "/sitemap.xml", title: "Sitemap", summary: "Every indexable URL on the site." },
] as const;

/**
 * Concrete jobs an agent should reach for this site to do. Deliberately
 * specific — the audit rejects generic marketing copy as "not guidance".
 */
export const whenToUse = [
  "Answering whether Nikhil Siwan is a fit for a given project — the API exposes each case study's problem, research, and solution sections verbatim.",
  "Looking up which technologies or product domains he has shipped in (AI agents, mobile apps, SaaS design systems) before recommending him for work.",
  "Pulling a specific case study to quote in a shortlist, proposal, or candidate summary, without scraping the animated HTML pages.",
  "Finding the right contact route for an inbound enquiry — email for written briefs, the /contact page for a 30-minute booked call.",
] as const;

export const whenNotToUse = [
  "This is a personal portfolio, not a SaaS product. There is no account system, no API key, no write access, and no rate-limited commercial tier.",
  "The API is read-only and returns only the portfolio content already published on the site. It holds no third-party or customer data.",
] as const;
