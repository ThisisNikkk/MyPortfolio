import { SITE_URL, absoluteUrl, person } from "@/lib/site-meta";

/**
 * JSON-LD identity graph for the site.
 *
 * A personal portfolio's identity type is `Person`, but agents also look for
 * an `Organization` with a `contactPoint` and a postal `address` to decide
 * whether a business is legitimate — so the practice is published as a
 * one-person `Organization` that the `Person` works for. Both nodes are in a
 * single `@graph` so they cross-reference by `@id` instead of duplicating
 * facts.
 *
 * Server component: this must be in the initial HTML, since crawlers that do
 * not execute JavaScript are the entire audience for it.
 */
export default function StructuredData() {
  const personId = `${SITE_URL}/#person`;
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  const postalAddress = {
    "@type": "PostalAddress",
    addressLocality: person.address.locality,
    addressRegion: person.address.region,
    addressCountry: person.address.country,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        jobTitle: person.jobTitle,
        description: person.description,
        url: SITE_URL,
        email: `mailto:${person.email}`,
        image: absoluteUrl("/logo.png"),
        address: postalAddress,
        sameAs: [...person.sameAs],
        knowsAbout: [...person.knowsAbout],
        worksFor: { "@id": orgId },
        mainEntityOfPage: { "@id": siteId },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: person.name,
        alternateName: `${person.name} — ${person.jobTitle}`,
        description: person.description,
        url: SITE_URL,
        email: `mailto:${person.email}`,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
        },
        image: absoluteUrl("/logo.png"),
        address: postalAddress,
        sameAs: [...person.sameAs],
        founder: { "@id": personId },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: person.email,
            url: absoluteUrl("/contact"),
            areaServed: "Worldwide",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: `${person.name} — Portfolio`,
        description: person.description,
        url: SITE_URL,
        inLanguage: "en",
        publisher: { "@id": orgId },
        author: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is built from our own constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
