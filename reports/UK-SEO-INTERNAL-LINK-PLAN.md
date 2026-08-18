# UK SEO Internal Link Plan

## Authority model

`/` → `/puppies` → `/breeds/{breed}` → `/puppies/{slug}`

Supporting layer: `/guides` ↔ breed pages ↔ puppies hub ↔ real listings. About and contact/trust content should reinforce commercial pages.

## Current strengths

- Header/footer link to hubs, breeds and guides.
- Home links to puppies, breeds and guides.
- Breed pages list matching puppies and link to all puppies.
- Puppy detail pages link back to the breed and related listings.
- Breadcrumb navigation is visible on hub/detail pages.

## Current weaknesses

- `/contact` is linked but missing.
- Search is not a working route/query mechanism.
- Guides are broad and generic.
- No sitemap means discovery relies on internal links alone.
- No BreadcrumbList JSON-LD exists.

## Link rules for Phase 1

1. Home → UK puppies hub, priority breeds, guides, about and a real contact/trust page.
2. Puppies hub → priority breeds with short descriptive copy; listings remain the primary conversion path.
3. Breed page → matching listings, hub and one or two relevant guides.
4. Listing → canonical breed page, hub and limited related listings.
5. Guide → hub and relevant breed pages using informational anchors; never compete with breed sales intent.
6. Footer → restrained priority breed/trust links, not hundreds of exact-match links.

## URL recommendation

Preserve `/puppies` and `/breeds/{breed}` during Phase 1. Do not migrate to `/puppies-for-sale/uk/` without redirect/canonical evidence.
