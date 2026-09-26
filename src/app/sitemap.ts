import { TOOLS } from "@/constants/tools";
import { siteConfig } from "@/constants/site";
import type { MetadataRoute } from "next";

const BASE_URL = siteConfig.url;

// No lastModified: the sitemap is built at deploy time, so it would stamp every page
// with the deploy date and Google learns to ignore it. Add real per-page dates if needed.
export default function sitemap(): MetadataRoute.Sitemap {
  // Generate entries for all tools
  const tools = Object.values(TOOLS).map((tool) => ({
    url: `${BASE_URL}/${tool.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    // Homepage
    {
      url: BASE_URL,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    // Tools pages
    ...tools,
  ];
}
