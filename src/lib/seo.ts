import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

type SeoProps = {
  title?: string;
  description?: string;
  // Omit only for the root layout default, so unmatched routes do not claim a canonical
  path?: string;
  noIndex?: boolean;
};

export function generateSeo({
  title,
  description = "Free developer tools that run in your browser: JSON to TypeScript, URL parser, Base64, case converter, cron generator, and more. No sign-up.",
  path,
  noIndex = false,
}: SeoProps = {}): Metadata {
  const baseUrl = siteConfig.url;
  const url = path ? `${baseUrl}${path}` : baseUrl;
  const siteName = "Toolbelt";
  const image = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "Toolbelt: free developer tools that run in your browser",
  };

  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    metadataBase: new URL(baseUrl),
    alternates: path ? { canonical: url } : undefined,
    openGraph: {
      title: title || siteName,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteName,
      description,
      creator: "@rocktimthedev",
      images: [image],
    },
    robots: noIndex ? "noindex, nofollow" : undefined,
  };
}
