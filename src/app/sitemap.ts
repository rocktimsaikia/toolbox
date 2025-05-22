import { SLUGS } from "@/constants/tools";
import type { MetadataRoute } from "next";

const BASE_URL = "https://tools.rocktim.dev";

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Main sitemap configuration
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = getCurrentDate();

  // Generate entries for all tools
  const toolEntries = SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    // Homepage
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    // Tools pages
    ...toolEntries,
    // About page
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
