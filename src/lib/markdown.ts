/**
 * Markdown projections of the site.
 *
 * These power two things: the `/llms.txt` body, and the `Accept: text/markdown`
 * variant of each page (negotiated by the `beforeFiles` rewrites in
 * `next.config.ts`). Both are generated from `src/data/projects.ts` and
 * `src/lib/site-meta.ts` so the markdown can never disagree with what the HTML
 * pages render.
 */

import { projects, type Project } from "@/data/projects";
import {
  SITE_URL,
  absoluteUrl,
  machineEndpoints,
  pages,
  person,
  whenNotToUse,
  whenToUse,
} from "@/lib/site-meta";

/** Collapse the whitespace a template literal would otherwise leak into prose. */
function tidy(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function projectLine(project: Project): string {
  return `- [${project.title}](${absoluteUrl(`/projects/${project.id}`)}) — ${project.category}. ${tidy(project.description)}`;
}

/** Full case study for one project, as markdown. */
export function projectMarkdown(project: Project): string {
  const lines: string[] = [
    `# ${project.title}`,
    "",
    `**Category:** ${project.category}  `,
    `**Canonical URL:** ${absoluteUrl(`/projects/${project.id}`)}  `,
    `**JSON:** ${absoluteUrl(`/api/projects/${project.id}`)}`,
    "",
    tidy(project.description),
    "",
  ];

  if (project.caseStudy) {
    lines.push("## Overview", "", tidy(project.caseStudy.overview), "");

    for (const section of project.caseStudy.sections) {
      lines.push(`## ${section.title}`, "", tidy(section.description), "");
      for (const point of section.points) {
        lines.push(`### ${point.title}`, "", tidy(point.text), "");
      }
    }
  }

  // Deliberately not `/projects`: that path has a markdown representation but
  // no HTML page, so linking it would send a reader to a 404.
  lines.push(
    "---",
    "",
    `Part of the ${person.name} portfolio. Every project: ${absoluteUrl("/")} — as JSON: ${absoluteUrl("/api/projects")}`,
  );
  return lines.join("\n");
}

/** Index of every project, grouped by the categories the site itself uses. */
export function projectsIndexMarkdown(): string {
  const categories = [...new Set(projects.map((p) => p.category))];

  const lines: string[] = [
    "# Projects",
    "",
    `Every case study in the ${person.name} portfolio. JSON equivalent: ${absoluteUrl("/api/projects")}`,
    "",
    "This index exists as markdown only; the browsable listing is on the homepage.",
    "",
  ];

  for (const category of categories) {
    lines.push(`## ${category}`, "");
    for (const project of projects.filter((p) => p.category === category)) {
      lines.push(projectLine(project));
    }
    lines.push("");
  }

  return lines.join("\n");
}

function homeMarkdown(): string {
  return [
    `# ${person.name} — ${person.jobTitle}`,
    "",
    tidy(person.description),
    "",
    "## What I build",
    "",
    "- **AI agents and assistants** — conversational products, retrieval pipelines, and agent tooling.",
    "- **High-performance mobile apps** — React Native products built for smooth, native-feeling interaction.",
    "- **Enterprise SaaS design systems** — component libraries and design languages that scale across teams.",
    "",
    "## Selected projects",
    "",
    ...projects.map(projectLine),
    "",
    "## Contact",
    "",
    `- Email: ${person.email}`,
    `- Location: ${person.address.locality}, ${person.address.country}`,
    `- Book a 30-minute call: ${absoluteUrl("/contact")}`,
    "",
  ].join("\n");
}

function aboutMarkdown(): string {
  return [
    `# About ${person.name}`,
    "",
    tidy(person.description),
    "",
    "## Focus areas",
    "",
    ...person.knowsAbout.map((topic) => `- ${topic}`),
    "",
    "## Elsewhere",
    "",
    ...person.sameAs.map((url) => `- ${url}`),
    "",
    `Full timeline, capability matrix, and FAQ: ${absoluteUrl("/about")}`,
    "",
  ].join("\n");
}

function contactMarkdown(): string {
  return [
    `# Contact ${person.name}`,
    "",
    `- **Email:** ${person.email} — best for written briefs, scope, and timelines.`,
    `- **Location:** ${person.address.locality}, ${person.address.region}, ${person.address.country}.`,
    `- **Book a call:** a 30-minute slot can be booked directly at ${absoluteUrl("/contact")}.`,
    "",
    "Open to freelance and full-time work.",
    "",
  ].join("\n");
}

/** Markdown for a site path, or null when the path has no markdown projection. */
export function markdownForPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/":
      return homeMarkdown();
    case "/about":
      return aboutMarkdown();
    case "/contact":
      return contactMarkdown();
    case "/projects":
      return projectsIndexMarkdown();
    default:
      break;
  }

  const projectMatch = /^\/projects\/(\d+)$/.exec(path);
  if (projectMatch) {
    const project = projects.find((p) => p.id === Number(projectMatch[1]));
    return project ? projectMarkdown(project) : null;
  }

  return null;
}

/** Body of `/llms.txt`, following the llmstxt.org structure. */
export function llmsTxt(): string {
  return [
    `# ${person.name}`,
    "",
    `> ${tidy(person.description)} Personal portfolio at ${SITE_URL}, with a public read-only JSON API and markdown content negotiation so agents can read it without executing JavaScript.`,
    "",
    "## When to use this site",
    "",
    ...whenToUse.map((use) => `- ${use}`),
    "",
    "## When not to use this site",
    "",
    ...whenNotToUse.map((limit) => `- ${limit}`),
    "",
    "## How to call it",
    "",
    `1. Fetch ${absoluteUrl("/openapi.json")} for the full typed operation list.`,
    `2. GET ${absoluteUrl("/api/projects")} returns every project; filter with \`?category=AI%20Projects\`.`,
    `3. GET ${absoluteUrl("/api/projects/{id}")} returns one full case study.`,
    "4. No authentication is required. Errors are JSON with a `code`, `message`, and `hint`.",
    "5. Any page URL also answers to `Accept: text/markdown` or `?format=md`.",
    "",
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.summary}`),
    "",
    "## Projects",
    "",
    ...projects.map(projectLine),
    "",
    "## Machine-readable endpoints",
    "",
    ...machineEndpoints.map((e) => `- [${e.title}](${absoluteUrl(e.path)}): ${e.summary}`),
    "",
    "## Contact",
    "",
    `- Email: ${person.email}`,
    `- Location: ${person.address.locality}, ${person.address.region}, ${person.address.country}`,
    `- Book a 30-minute call: ${absoluteUrl("/contact")}`,
    "",
  ].join("\n");
}
