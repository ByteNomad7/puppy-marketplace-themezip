# UK SEO Technical Audit

## Positive findings

- Next.js App Router metadata API is used across layout, hubs, detail pages and guides.
- HTML language is `en-GB`.
- Explicit canonical URLs use `https://www.pottyregisteredpuppies.com`.
- Dynamic metadata uses current listing/breed/guide values.
- Invalid dynamic records call `notFound()`.
- Visible breadcrumbs exist.

## Issues

### High priority

1. No `/sitemap.xml` route or public sitemap file.
2. No `/robots.txt` route or public robots file.
3. No JSON-LD for Organization, WebSite, BreadcrumbList, Article, Product, Offer or ItemList.
4. `/contact` is linked but not implemented.
5. Homepage search options contain stale US locations and dollar price ranges.
6. `formatPrice` returns `$`; confirm UK currency before Product/Offer schema.
7. Listing data has no location, seller, verification or health-record fields.

### Medium priority

8. Filters are client-side only with no query/canonical/pagination policy.
9. Twitter-specific metadata is not explicit.
10. Duplicate Biewer and Cavalier route aliases exist.
11. Guide copy is generic across article routes.
12. No branded `app/not-found.tsx` was found.

## Schema strategy

- Add Organization/WebSite only when business/contact details are supportable.
- Use BreadcrumbList to mirror visible breadcrumbs.
- Use Article after editorial ownership/date/source fields are real.
- Use Product/Offer only when price, currency, availability, seller and offer semantics are reliable.
- Never fabricate reviews, ratings, health claims or breeder verification.

## Filter/query noindex & canonical policy

- Listing filters (breed, status, sex, sort) are client-side state only and never produce query-parameter URLs; `/puppies` keeps a single self-referencing canonical.
- `robots.txt` disallows `/*?*` so any future query-parameter URL is not crawled.
- If filter state ever moves into the URL, those pages must ship `noindex` metadata and a canonical pointing at the unfiltered route, and remain excluded from the sitemap.
- The sitemap covers only approved indexable routes: home, `/puppies` + listings, `/breeds` + profiles, `/guides` + articles, `/about`. `/contact` is excluded until implemented.

## Validation

TypeScript passed during this audit session. Build and crawler-style route/metadata/schema audits should run before Phase 1 sign-off. No automated audit scripts are currently present.
