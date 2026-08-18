# UK SEO Phase 0 Final Report

## Current routes

- Home: `/`
- Puppies hub: `/puppies`
- Puppy detail: `/puppies/[slug]` (390 current records)
- Breeds hub: `/breeds`
- Breed detail: `/breeds/[slug]` (24 current records)
- Guides hub: `/guides`
- Guide article: `/guides/[slug]` (4 current records)
- About: `/about`
- Contact: linked but not implemented
- Sitemap/robots: not implemented

## Indexable routes

Recommended index set: home, puppies hub, valid puppy listings, breeds hub, valid breed pages, guides hub, valid guide articles and about. Invalid dynamic paths, utility/filter combinations and the missing contact placeholder should not be indexed. See `UK-SEO-INDEXABILITY.csv`.

## Puppy routes

The static TypeScript model supports 390 listing records with slug, name, breed, sex, age in weeks, colour, nullable price, status, image, gallery and description. It does not support location, seller, weight, breeder verification or health-record claims.

## Breed routes

The model exposes 24 breed records with matching puppy relationships. Duplicate Biewer and Cavalier aliases should be consolidated before expansion.

## Guide routes

There are 4 guide articles. Their content is broad and should be rewritten with distinct UK informational intent before adding many more.

## Top UK breeds

Inventory-led candidates are in `UK-SEO-BREED-PRIORITY.csv`. Inventory is only a prioritisation signal; validate UK demand and commercial relevance before implementation.

## UK location opportunities

**City pages recommended now: NO.** Listings have no location field, so the audit records zero supported inventory for candidate cities.

## Content gaps

- UK puppy buying checklist
- Questions to ask before buying a puppy with evidence/process detail
- How to choose a puppy in the UK
- Preparing a home for a puppy
- Carefully sourced breed comparisons
- Trust, health-record and responsible sourcing explanation

## Cannibalization risks

- Current breed pages versus future `/puppies-for-sale/uk/{breed}` pages.
- Commercial breed pages versus future breed temperament/health guides.
- Duplicate Biewer and Cavalier slugs.
- Hub/article overlap if guides target generic sales queries.

## Technical SEO issues

Missing sitemap, robots, JSON-LD and contact route; stale US search values and dollar formatting; client-only filters without query/canonical policy; no explicit Twitter metadata; no branded not-found page.

## Trust issues

Healthy, well-raised, trusted, responsible-sourcing and care/process claims lack visible supporting evidence. Substantiate or soften them before using them as E-E-A-T signals.

## Phase 1 URLs recommended

1. Keep and upgrade `/puppies` as the UK market hub.
2. Upgrade the top 10–15 existing `/breeds/{breed}` routes.
3. Rewrite the four existing `/guides/{slug}` routes.
4. Add only a small number of researched guide gaps.
5. Define the contact/trust path once its business process is known.

## City pages recommended now

**NO.**

## Safe to start UK Phase 1

**YES, conditionally:** begin with technical fixes, trust evidence and upgrades to existing URLs; do not mass-create pages or invent locations.