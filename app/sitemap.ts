import type { MetadataRoute } from "next";
import { SITE } from "@/lib/copy";

// Une seule URL indexable : la home (mentions-legales est en noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
