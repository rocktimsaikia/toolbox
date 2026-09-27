import { siteConfig } from "@/constants/site";
import { type Slug, TOOLS } from "@/constants/tools";
import type { BreadcrumbList, WebSite, WithContext } from "schema-dts";

// ponytail: WebSite only. SoftwareApplication needs real ratings for rich results;
// add it per tool page once there are genuine reviews to cite.
const jsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Free developer tools that run in your browser: JSON to TypeScript, URL parser, Base64, case converter, cron generator, and more.",
  publisher: {
    "@type": "Person",
    name: "Rocktim Saikia",
    url: "https://rocktim.dev",
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Home > Tool, so results can show the breadcrumb trail instead of the raw URL
export function ToolStructuredData({ slug }: { slug: Slug }) {
  const breadcrumbs: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: TOOLS[slug].name,
        item: `${siteConfig.url}/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
    />
  );
}
