import { siteConfig } from "@/constants/site";
import type { WebSite, WithContext } from "schema-dts";

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
