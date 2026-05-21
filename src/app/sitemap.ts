export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import notes from "@/data/notes.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yangcunbang.icu";
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cyber-philosopher`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...noteRoutes];
}
