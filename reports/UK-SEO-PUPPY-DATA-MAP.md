# UK SEO Puppy Data Map

## Storage and source

- **Storage:** static TypeScript records in `lib/data.ts`.
- **Runtime:** imported directly by App Router pages; no API, database, CMS, server route, or live fetch is present.
- **Current records:** 390.
- **Seller/source fields:** not exposed in the current model.

## Fields

| Field | Present | Notes |
|---|---:|---|
| id | No | Slug is the stable route key; no separate ID. |
| slug | Yes | Used by `/puppies/[slug]`. |
| name | Yes | Display and metadata input. |
| breed | Yes | Display breed label. |
| breedSlug | Yes | Joins listings to breed records and filters. |
| sex | Yes | Current values: Male / Female. |
| age | Yes | Normalised as `ageWeeks`; no raw age string. |
| location | No | Country, region, county and city are absent. |
| price | Yes, nullable | 374 of 390 are null; formatter currently uses `$`. |
| images | Yes | Local primary image plus gallery paths. |
| description | Yes | Generated/static copy based on listing attributes. |
| availability | Yes | Current counts: Available 390. |
| colour | Yes | Stored as `colour`. |
| weight | No | Not present. |
| seller/breeder data | No | No seller, breeder, verification, health-record or contact fields. |

## Relationship model

- Puppy detail: `/puppies/[slug]`.
- Breed join: `puppy.breedSlug === breed.slug`.
- Breed pages list matching puppies.
- Home shows six records; the puppies hub filters client-side.

## SEO implications

1. The model supports real listing URLs and breed-to-listing relationships.
2. It does not support UK city/county pages, seller pages, breeder verification claims, or location filters.
3. Nullable prices and absent seller/health fields limit safe Product/Offer and trust schema.
4. Phase 1 should improve provenance and evidence before expanding page count.
5. No data was altered for this Phase 0 audit.
