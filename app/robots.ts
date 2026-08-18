import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Filters are client-side state today; if query-parameter URLs are
        // ever introduced they must not be crawled or indexed.
        disallow: ["/*?*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
