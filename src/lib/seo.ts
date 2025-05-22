import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function generateSeo({
  title,
  description = "A collection of essential tools including HTML Escape, Base64 Converter, Password Generator, and more to make your development workflow more efficient.",
  path = "/",
  noIndex = false,
}: SeoProps = {}): Metadata {
  const baseUrl = siteConfig.url;
  const url = `${baseUrl}${path}`;
  const siteName = "Tool Box - Essential Developer Tools";

  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title || siteName,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteName,
      description,
      creator: "@rocktimthedev",
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
  };
}
