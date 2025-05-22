import { TOOLS } from "@/constants/tools";
import { siteConfig } from "@/constants/site";
import type { MetadataRoute } from "next";

const BASE_URL = siteConfig.url;

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Main sitemap configuration
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = getCurrentDate();

  // Generate entries for all tools
  const tools = Object.values(TOOLS).map((tool) => ({
    url: `${BASE_URL}/${tool.slug}`,
    lastModified: getCurrentDate(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    // Homepage
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    // Tools pages
    ...tools,
    // About page
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
