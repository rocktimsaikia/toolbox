import type { MetadataRoute } from "next";
import {SLUGS} from "./constants/tools";

const BASE_URL = "https://tools.rocktimsaikia.dev";

const tools = SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
})

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...tools
  ];
}
