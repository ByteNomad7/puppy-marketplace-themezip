import type { MetadataRoute } from "next"
import { puppies, breeds, guides } from "@/lib/data"
import { SITE_URL } from "@/lib/seo"

// Only approved indexable routes are listed. /contact is excluded until it
// is implemented. Filtered/query-parameter views are never listed — see the
// noindex/canonical policy in reports/UK-SEO-TECHNICAL-AUDIT.md.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/puppies", "/breeds", "/guides", "/about"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: (path === "/puppies" ? "daily" : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const puppyRoutes = puppies.map((p) => ({
    url: `${SITE_URL}/puppies/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const breedRoutes = breeds.map((b) => ({
    url: `${SITE_URL}/breeds/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const guideRoutes = guides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...puppyRoutes, ...breedRoutes, ...guideRoutes]
}
