import type { WebPage, WithContext } from "schema-dts";

// This function creates the JSON-LD structured data
const createJsonLd = (): WithContext<WebPage> => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tool Box - Essential Developer Tools",
  description:
    "A collection of essential tools including HTML Escape, Base64 Converter, Password Generator, and more to make your development workflow more efficient.",
  url: "https://tools.rocktim.dev",
  publisher: {
    "@type": "Organization",
    name: "Rocktim Saikia",
    logo: {
      "@type": "ImageObject",
      url: "https://tools.rocktim.dev/logo.png",
    },
  },
  mainEntity: [
    {
      "@type": "SoftwareApplication",
      name: "JSON to TypeScript",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Password Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Base64 Converter",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
});

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
