import type { WebPage, WithContext } from "schema-dts";
import { TOOLS } from "@/constants/tools";
import { siteConfig } from "@/constants/site";

// This function creates the JSON-LD structured data
const createJsonLd = (): WithContext<WebPage> => {
  // Generate software applications from TOOLS
  const softwareApplications = Object.values(TOOLS).map((tool) => ({
    "@type": "SoftwareApplication" as const,
    name: tool.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    url: `${siteConfig.url}/${tool.slug}`,
    description: tool.description,
    offers: {
      "@type": "Offer" as const,
      price: "0",
      priceCurrency: "USD",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tool Box - Essential Developer Tools",
    description:
      "A collection of essential tools including HTML Escape, Base64 Converter, Password Generator, and more to make your development workflow more efficient.",
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: "Rocktim Saikia",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/toolbox.png`,
        width: "60px",
        height: "60px",
      },
    },
    mainEntity: softwareApplications,
  };
};

export function StructuredData() {
  const jsonLd = createJsonLd();
  const jsonLdString = JSON.stringify(jsonLd);

  return (
    <script
      type="application/ld+json"
      key="structured-data"
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
