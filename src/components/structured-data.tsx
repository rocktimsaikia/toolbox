import type { WebPage, WithContext } from "schema-dts";
import Head from "next/head";

// This component adds structured data in a way that's safe from XSS
// and works well with Next.js
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
  return (
    <Head>
      <script
        id="structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createJsonLd()),
        }}
      />
    </Head>
  );
}
