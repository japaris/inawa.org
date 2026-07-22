import type { MetadataRoute } from "next";
import { SITE } from "@/lib/copy";

// Robots servi par l'origine. Cloudflare peut préfixer son bloc
// « Managed Content Signals » (anti-crawlers IA) au edge : sans incidence
// sur Googlebot search. La référence sitemap reste utile ici et le sitemap
// est de toute façon soumis directement dans Google Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
  };
}
