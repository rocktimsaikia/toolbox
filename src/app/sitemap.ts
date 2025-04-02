import { SLUGS } from "@/constants/tools";
import type { MetadataRoute } from "next";

const BASE_URL = "https://tools.rocktimsaikia.dev";

const tools = SLUGS.map((slug) => ({
  url: `${BASE_URL}/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
  ];
}
