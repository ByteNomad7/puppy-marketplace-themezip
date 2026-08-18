import type { MetadataRoute } from "next"
import { puppies, breeds, guides } from "@/lib/data"
import { SITE_URL } from "@/lib/seo"

// Only approved indexable routes are listed. Filtered/query-parameter views
// are never listed — see the noindex/canonical policy in the Phase 1C audit.
export default function sitemap(): MetadataRoute.Sitemap {
  const breedSlugs = new Set(breeds.map((breed) => breed.slug))
  const indexablePuppies = puppies.filter(
    (puppy) => breedSlugs.has(puppy.breedSlug) && puppy.image && puppy.gallery.length > 0,
  )
  const staticRoutes = ["", "/puppies", "/breeds", "/guides", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: (path === "/puppies" ? "daily" : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const puppyRoutes = indexablePuppies.map((p) => ({
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
