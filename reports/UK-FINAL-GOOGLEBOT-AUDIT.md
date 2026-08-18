# Final Googlebot pre-deployment crawl audit

## Production crawl

- Production build: **PASS**
- Generated Next.js routes: **430** (including internal not-found/framework routes)
- URLs crawled from homepage: **432**
- URLs checked from sitemap: **426**
- Intended indexable URLs: **426**
- Runtime log error markers: **0**

## Crawl and HTTP checks

- HTTP errors: **0**
- Broken internal links: **0**
- Redirect chains: **0**
- Soft 404 risks: **0**
- Robots-blocked important URLs: **0**
- CSS/JS assets checked: **15**
- CSS/JS asset errors: **0**
- Rendered image sources checked: **1964**
- Image errors: **0**
- Indexability contradictions: **0**

## Canonical and domain checks

- Canonical errors: **0**
- Canonical-to-redirect errors: **0**
- Canonical-to-404 errors: **0**
- Non-production SEO domain references: **0**

## Sitemap checks

- Sitemap URLs: **426**
- Valid sitemap URLs: **426**
- Sitemap errors: **0**
- Important indexable URLs missing from sitemap: **0**
- Sitemap/crawl BOTH: **426**
- Sitemap-only: **0**
- Crawl-only indexable: **0**

## Orphans and depth

- Indexable orphans: **0**
- Important pages deeper than 4: **0**
- Depth distribution: depth 0: 1, depth 1: 41, depth 2: 390, depth 3: 0, depth 4: 0, depth 5+: 0

## Metadata, schema, and parameters

- Duplicate title groups: **0**
- Duplicate meta-description groups: **0**
- H1 errors: **0**
- Invalid JSON-LD blocks: **0**
- Unsupported schema claims: **0**
- Parameter patterns found: **6**
- Indexable parameter variants: **0**
- High-risk cannibalization: **0** (per Phase 1C report)

## Redirect alias checks

- /breeds/biwer-terrier: 308 → /breeds/biewer-terrier (final 200); sitemap=NO
- /breeds/cavalier: 308 → /breeds/king-charles (final 200); sitemap=NO

## Googlebot decision

- Googlebot can crawl site cleanly: **YES**
- Safe to deploy: **YES**
- Safe to submit sitemap: **YES**
- Safe to begin manual GSC requests: **YES**

The development preview may still report non-blocking HMR/cross-origin warnings; those are not production crawl responses and are recorded separately from SEO-blocking runtime errors.
