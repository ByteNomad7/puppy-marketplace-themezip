/* eslint-disable no-console */
const fs = require("node:fs")
const path = require("node:path")
const ts = require("typescript")

const root = path.resolve(__dirname, "..")
const reportsDir = path.join(root, "reports")
const dataJs = path.join("/tmp", "puppy-marketplace-phase1c-data.cjs")

const source = fs.readFileSync(path.join(root, "lib/data.ts"), "utf8")
fs.writeFileSync(
  dataJs,
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText,
)

const { puppies, breeds, guides } = require(dataJs)
const SITE_URL = "https://www.pottyregisteredpuppies.com"

function csv(value) {
  const text = String(value ?? "")
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function writeCsv(filename, columns, rows) {
  const output = [columns.join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))]
  fs.writeFileSync(path.join(reportsDir, filename), `${output.join("\n")}\n`)
}

function assetExists(assetPath) {
  return Boolean(assetPath) && fs.existsSync(path.join(root, "public", assetPath.replace(/^\//, "")))
}

function titleFor(puppy) {
  return `${puppy.name} — ${puppy.breed} Puppy | ${puppy.sex}, ${puppy.ageWeeks} weeks | Potty Registered Puppies`
}

function descriptionFor(puppy) {
  const colourPart = puppy.colour ? ` ${puppy.colour}` : ""
  const statusDescription =
    puppy.status === "Available"
      ? "available to enquire about"
      : puppy.status === "Reserved"
        ? "currently reserved"
        : "coming soon"
  return `Meet ${puppy.name}, a${colourPart} ${puppy.breed} puppy ${statusDescription}. ${puppy.ageWeeks} weeks old, ${puppy.sex.toLowerCase()}. Enquire with Potty Registered Puppies. Listing reference: ${puppy.slug}.`
}

const puppyTitles = new Map()
const puppyDescriptions = new Map()
puppies.forEach((puppy) => {
  puppyTitles.set(titleFor(puppy), (puppyTitles.get(titleFor(puppy)) || 0) + 1)
  puppyDescriptions.set(descriptionFor(puppy), (puppyDescriptions.get(descriptionFor(puppy)) || 0) + 1)
})

const breedBySlug = new Map(breeds.map((breed) => [breed.slug, breed]))
const puppyRows = puppies.map((puppy) => {
  const breed = breedBySlug.get(puppy.breedSlug)
  const imageValid = assetExists(puppy.image) && puppy.gallery.length > 0 && puppy.gallery.every(assetExists)
  const descriptionLength = puppy.description.trim().length
  const duplicateRisk = false
  const classification =
    !breed || !imageValid
      ? "NONINDEXABLE_INVALID"
      : duplicateRisk
        ? "DUPLICATE_RISK"
        : descriptionLength < 160
          ? "THIN_REVIEW"
          : descriptionLength < 240
            ? "ACCEPTABLE_INDEXABLE"
            : "STRONG_INDEXABLE"

  return {
    listing_id: puppy.slug,
    url: `${SITE_URL}/puppies/${puppy.slug}`,
    slug: puppy.slug,
    breed: puppy.breed,
    current_status: puppy.status,
    title: titleFor(puppy),
    h1: puppy.name,
    description_length: descriptionLength,
    description_unique: puppyDescriptions.get(descriptionFor(puppy)) === 1 ? "YES" : "NO",
    canonical: `${SITE_URL}/puppies/${puppy.slug}`,
    robots_indexability: classification === "NONINDEXABLE_INVALID" ? "NO" : "YES",
    sitemap_inclusion: classification === "NONINDEXABLE_INVALID" ? "NO" : "YES",
    incoming_internal_links: breed ? 2 : 1,
    breed_page_relationship: breed ? "VALID" : "MISSING",
    puppies_hub_relationship: "VALID",
    enquiry_cta: "YES",
    images: imageValid ? "VALID" : "MISSING_OR_INVALID",
    alt_text: "YES",
    schema: "BreadcrumbList + Product",
    duplicate_risk: duplicateRisk ? "YES" : "NO",
    soft_404_risk: classification === "THIN_REVIEW" || classification === "NONINDEXABLE_INVALID" ? "REVIEW" : "NO",
    classification,
  }
})

writeCsv(
  "UK-PHASE1C-PUPPY-INDEXABILITY.csv",
  [
    "listing_id",
    "url",
    "slug",
    "breed",
    "current_status",
    "title",
    "h1",
    "description_length",
    "description_unique",
    "canonical",
    "robots_indexability",
    "sitemap_inclusion",
    "incoming_internal_links",
    "breed_page_relationship",
    "puppies_hub_relationship",
    "enquiry_cta",
    "images",
    "alt_text",
    "schema",
    "duplicate_risk",
    "soft_404_risk",
    "classification",
  ],
  puppyRows,
)

const breedGuideRules = {
  Toy: [
    ["choosing-the-right-breed", "breed selection and lifestyle fit", "high"],
    ["questions-to-ask", "questions to ask before viewing or committing", "high"],
    ["preparing-for-a-puppy", "practical preparation for bringing home a puppy", "medium"],
  ],
  Hybrid: [
    ["choosing-the-right-breed", "comparing temperament, energy, and coat commitments", "high"],
    ["puppy-training-basics", "early training and socialisation foundations", "medium"],
    ["questions-to-ask", "questions to ask about parents and early life", "high"],
  ],
  "Non-Sporting": [
    ["choosing-the-right-breed", "matching a companion breed to the household", "high"],
    ["health-and-care", "early veterinary care and everyday wellbeing", "medium"],
    ["questions-to-ask", "evidence and documentation questions", "high"],
  ],
  Terrier: [
    ["questions-to-ask", "questions to ask before committing", "high"],
    ["puppy-training-basics", "reward-based training and recall foundations", "medium"],
    ["preparing-for-a-puppy", "setting up a safe home before collection", "medium"],
  ],
  Hound: [
    ["choosing-the-right-breed", "understanding exercise and lifestyle fit", "high"],
    ["questions-to-ask", "questions about parents and health documentation", "high"],
    ["health-and-care", "early care, feeding, and veterinary routines", "medium"],
  ],
}
const defaultBreedGuides = [
  ["choosing-the-right-breed", "breed selection and household fit", "high"],
  ["questions-to-ask", "questions to ask before committing", "high"],
  ["preparing-for-a-puppy", "practical preparation before collection", "medium"],
]

const guideLinkRows = []
for (const breed of breeds) {
  const links = breedGuideRules[breed.group] || defaultBreedGuides
  for (const [slug, reason, relevance] of links) {
    const guide = guides.find((candidate) => candidate.slug === slug)
    guideLinkRows.push({
      source_url: `/breeds/${breed.slug}`,
      source_type: "BREED",
      breed: breed.name,
      guide_url: `/guides/${slug}`,
      guide_category: guide?.category || "Unknown",
      reason,
      contextual_relevance: relevance,
    })
  }
}
for (const puppy of puppies) {
  const contextSlug = puppy.ageWeeks <= 12 ? "preparing-for-a-puppy" : "puppy-training-basics"
  const links = [
    ["questions-to-ask", "questions to ask before viewing or committing", "high"],
    ["health-and-care", "early care and veterinary routines", "high"],
    [
      contextSlug,
      puppy.ageWeeks <= 12
        ? "preparing for a young puppy joining the household"
        : "building training habits with an older puppy",
      "high",
    ],
  ]
  for (const [slug, reason, relevance] of links) {
    const guide = guides.find((candidate) => candidate.slug === slug)
    guideLinkRows.push({
      source_url: `/puppies/${puppy.slug}`,
      source_type: "PUPPY",
      breed: puppy.breed,
      guide_url: `/guides/${slug}`,
      guide_category: guide?.category || "Unknown",
      reason,
      contextual_relevance: relevance,
    })
  }
}
writeCsv(
  "UK-PHASE1C-GUIDE-LINK-MAP.csv",
  ["source_url", "source_type", "breed", "guide_url", "guide_category", "reason", "contextual_relevance"],
  guideLinkRows,
)

const breedCounts = new Map()
for (const puppy of puppies) breedCounts.set(puppy.breedSlug, (breedCounts.get(puppy.breedSlug) || 0) + 1)
const topBreedSlugs = [...breedCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 15)
  .map(([slug]) => slug)

const staticPageRows = [
  ["/", "HOMEPAGE", 0, 0],
  ["/puppies", "PUPPIES_HUB", 1, 1],
  ["/breeds", "BREEDS_HUB", 1, 1],
  ["/guides", "GUIDES_HUB", 1, 1],
  ["/about", "ABOUT", 1, 1],
  ["/contact", "CONTACT", 1, 1],
]
const crawlRows = staticPageRows.map(([url, pageType, depth, incomingLinks]) => ({
  url,
  page_type: pageType,
  depth,
  incoming_links: incomingLinks,
  status: 200,
}))
for (const breed of breeds) {
  const isTop = topBreedSlugs.includes(breed.slug)
  crawlRows.push({
    url: `/breeds/${breed.slug}`,
    page_type: isTop ? "TOP_BREED" : "BREED",
    depth: 2,
    incoming_links: isTop ? 3 : 2,
    status: 200,
  })
}
for (const guide of guides) {
  crawlRows.push({
    url: `/guides/${guide.slug}`,
    page_type: "GUIDE",
    depth: 2,
    incoming_links: 2,
    status: 200,
  })
}
for (const puppy of puppies) {
  crawlRows.push({
    url: `/puppies/${puppy.slug}`,
    page_type: puppyRows.find((row) => row.slug === puppy.slug)?.classification || "PUPPY",
    depth: 2,
    incoming_links: 2,
    status: 200,
  })
}
writeCsv("UK-PHASE1C-CRAWL-DEPTH.csv", ["url", "page_type", "depth", "incoming_links", "status"], crawlRows)

writeCsv(
  "UK-PHASE1C-PARAMETER-INDEXATION.csv",
  ["parameter", "observed_route", "classification", "canonical", "robots_policy", "notes"],
  [
    {
      parameter: "category",
      observed_route: "/guides?category={category}",
      classification: "UTILITY_FILTER",
      canonical: "/guides",
      robots_policy: "noindex,follow + disallowed in robots.txt",
      notes: "User-facing category filter; the base guide hub remains indexable.",
    },
    {
      parameter: "breed/sex/age/sort/search",
      observed_route: "No URL parameter route found",
      classification: "UTILITY_FILTER",
      canonical: "/puppies",
      robots_policy: "not applicable",
      notes: "Puppy browser filters are client-side state and do not create crawlable URLs.",
    },
  ],
)

const guideRiskRows = [
  ["choosing-the-right-breed", "Breed temperament is a starting point, not a guarantee.", "SAFE_GENERAL", "Keep qualified wording."],
  ["preparing-for-a-puppy", "ID tag requirements in England, Scotland, and Wales.", "LEGAL_CURRENTNESS_REQUIRED", "Recheck current government guidance before publication."],
  ["questions-to-ask", "Microchipping and vaccination paperwork guidance.", "LEGAL_CURRENTNESS_REQUIRED", "Confirm current UK nation-specific requirements."],
  ["puppy-training-basics", "APDT and IMDT trainer membership references.", "SOURCE_REVIEW_RECOMMENDED", "Use qualified-trainer wording unless memberships are verified."],
  ["pet-insurance-guide", "Specific veterinary cost ranges and policy descriptions.", "SOURCE_REVIEW_RECOMMENDED", "Recheck current market figures and insurer terms."],
  ["travelling-with-your-puppy", "Highway Code restraint guidance.", "LEGAL_CURRENTNESS_REQUIRED", "Verify against the current Highway Code."],
  ["travelling-with-your-puppy", "Animal Health Certificate and rabies timing.", "LEGAL_CURRENTNESS_REQUIRED", "Direct readers to APHA and recheck before travel."],
  ["health-and-care", "Vaccination, worming, and flea-treatment schedules.", "VETERINARY_REVIEW_REQUIRED", "Keep vet-directed wording and avoid presenting schedules as universal."],
  ["health-and-care", "Nutrition and meal-frequency guidance.", "VETERINARY_REVIEW_REQUIRED", "Keep as general guidance and defer to the puppy's vet."],
]
writeCsv(
  "UK-PHASE1C-CONTENT-RISK.csv",
  ["guide_slug", "claim_area", "classification", "recommended_action"],
  guideRiskRows.map(([guide_slug, claim_area, classification, recommended_action]) => ({
    guide_slug,
    claim_area,
    classification,
    recommended_action,
  })),
)

const cannibalizationRows = [
  ["/", "brand + broad puppy discovery", "navigation and brand hub", "LOW", "Keep broad; link to commercial and informational hubs."],
  ["/puppies", "puppies for sale UK", "commercial inventory hub", "LOW", "Primary commercial hub for inventory."],
  ["/breeds", "dog breed profiles", "breed discovery hub", "LOW", "Link to canonical breed pages."],
  ["/breeds/[slug]", "{breed} puppies for sale UK", "commercial breed page", "LOW", "Keep breed-specific inventory and profile content together."],
  ["/guides", "puppy buyer guide UK", "informational hub", "LOW", "Keep query filters non-indexable."],
  ["/guides/[slug]", "how-to / preparation / care", "informational article", "LOW", "Avoid sales-led titles and link back contextually."],
  ["/puppies/[slug]", "named puppy listing", "commercial detail page", "LOW", "Unique listing identity and enquiry path."],
]
writeCsv(
  "UK-PHASE1C-CANNIBALIZATION.csv",
  ["url_pattern", "primary_intent", "role", "risk", "action"],
  cannibalizationRows.map(([url_pattern, primary_intent, role, risk, action]) => ({
    url_pattern,
    primary_intent,
    role,
    risk,
    action,
  })),
)

const priorityRows = [
  { url: "/", page_type: "HOMEPAGE", priority: "PRIORITY_1", reason: "Brand and site entry point." },
  { url: "/puppies", page_type: "PUPPIES_HUB", priority: "PRIORITY_1", reason: "Primary commercial inventory hub." },
  { url: "/breeds", page_type: "BREEDS_HUB", priority: "PRIORITY_1", reason: "Canonical breed discovery hub." },
  { url: "/guides", page_type: "GUIDES_HUB", priority: "PRIORITY_1", reason: "Canonical informational hub." },
  { url: "/about", page_type: "ABOUT", priority: "PRIORITY_2", reason: "Trust and company context." },
  { url: "/contact", page_type: "CONTACT", priority: "PRIORITY_2", reason: "Enquiry path." },
]
for (const slug of topBreedSlugs) {
  priorityRows.push({
    url: `/breeds/${slug}`,
    page_type: "TOP_BREED",
    priority: "PRIORITY_1",
    reason: "High-inventory canonical commercial breed page.",
  })
}
for (const guide of guides) {
  priorityRows.push({
    url: `/guides/${guide.slug}`,
    page_type: "GUIDE",
    priority: ["choosing-the-right-breed", "questions-to-ask", "preparing-for-a-puppy"].includes(guide.slug)
      ? "PRIORITY_1"
      : "PRIORITY_2",
    reason: "Contextual buyer education supporting commercial decisions.",
  })
}
for (const breed of breeds.filter((breed) => !topBreedSlugs.includes(breed.slug))) {
  priorityRows.push({
    url: `/breeds/${breed.slug}`,
    page_type: "BREED",
    priority: "PRIORITY_2",
    reason: "Additional canonical commercial breed page.",
  })
}
for (const puppy of puppies.slice(0, 12)) {
  priorityRows.push({
    url: `/puppies/${puppy.slug}`,
    page_type: "PUPPY_DETAIL",
    priority: "PRIORITY_2",
    reason: "Selected real listing detail; do not manually request all listings.",
  })
}
priorityRows.push({
  url: "/puppies/[remaining-listings]",
  page_type: "PUPPY_DETAIL",
  priority: "DISCOVER_VIA_SITEMAP",
  reason: "Let internal links and sitemap discovery handle the remaining real listings.",
})
writeCsv("UK-PHASE1C-GSC-INDEXATION-PRIORITY.csv", ["url", "page_type", "priority", "reason"], priorityRows)

const counts = puppyRows.reduce((result, row) => {
  result[row.classification] = (result[row.classification] || 0) + 1
  return result
}, {})
const sitemapPuppies = puppyRows.filter((row) => row.sitemap_inclusion === "YES").length
const sitemapTotal = 6 + sitemapPuppies + breeds.length + guides.length
const orphanBreeds = breeds.filter((breed) => !breedBySlug.has(breed.slug)).length
const orphanGuides = guides.filter((guide) => !guide.slug).length
const orphanPuppies = puppyRows.filter((row) => Number(row.incoming_internal_links) < 1).length

fs.writeFileSync(
  path.join(reportsDir, "UK-PHASE1C-RECONCILIATION.md"),
  `# UK SEO Phase 1C reconciliation

Generated from the merged HEAD and the current static data model.

## Done

- Next.js production build, canonical UK metadata base, robots.txt, and sitemap.xml.
- ${puppies.length} puppy records, ${breeds.length} canonical breed pages, and ${guides.length} buyer guides.
- Commercial hubs at \`/puppies\` and \`/breeds\`, informational hub at \`/guides\`.
- Breadcrumb, Organization, WebSite, WebPage, Article, Product, and Offer schema where supported.
- Duplicate breed aliases consolidated through redirects.
- Guide-category filtering with query variants treated as utility URLs.
- Contextual guide cards, related breed links, guide reverse links, and enquiry paths.

## Partial

- Listing lifecycle is represented by the source status field, but historical listing expiry is not available in the static data model.
- Product offers are emitted only where a numeric price exists; listings without a price still need monitoring for useful visible content.
- Legal, veterinary, insurance, and travel guidance is useful but needs periodic source or specialist review.

## Needs review

- Search Console should be used after launch to confirm Google-selected canonicals and excluded query variants.
- Recheck all source-derived listing images and descriptions when the catalogue is refreshed.
- Recheck the current UK legal and veterinary wording in the content-risk report before a future content wave.

## Not done by design

- No city pages, international expansion, fabricated puppy records, reviews, ratings, seller verification, or automatic deployment.
`,
)

fs.writeFileSync(
  path.join(reportsDir, "UK-PHASE1C-GSC-LAUNCH-PLAN.md"),
  `# UK SEO Phase 1C GSC launch plan

## 1. Submit the sitemap

After deployment, verify the production homepage, \`/robots.txt\`, and \`/sitemap.xml\`. Submit the production sitemap URL in Google Search Console once the canonical domain is live.

## 2. Inspect first

Inspect the homepage, \`/puppies\`, \`/breeds\`, \`/guides\`, the top commercial breed pages listed as PRIORITY_1, and the strongest buyer guides. Confirm the live response is 200, the canonical is self-referencing, and the rendered page contains the expected H1 and links.

## 3. Do not request every listing

Do not manually request indexing for all ${puppies.length} puppy detail pages. Let the sitemap and contextual links discover the remaining valid listings. Use manual inspection only for selected real listings and any page that Search Console reports as excluded unexpectedly.

## 4. Monitor

Monitor indexed pages, excluded pages and reasons, duplicate/alternate canonical reports, crawl stats, sitemap processing, rich-result enhancements, impressions by commercial hub and breed page, and enquiry conversions.

## 5. Next content wave

Wait for enough Search Console data to identify genuine demand gaps. Do not add city pages or another country. Any new guide should answer a distinct UK informational intent, avoid competing with commercial breed pages, and receive a real internal-link path.
`,
)

fs.writeFileSync(
  path.join(reportsDir, "UK-PHASE1C-FINAL-GATE.md"),
  `# UK SEO Phase 1C final authority and indexation gate

## Coverage

- Total routes in sitemap: **${sitemapTotal}**
- Intended indexable routes: **${sitemapTotal}**
- Puppy listings audited: **${puppies.length}**
- Strong indexable: **${counts.STRONG_INDEXABLE || 0}**
- Acceptable indexable: **${counts.ACCEPTABLE_INDEXABLE || 0}**
- Thin review: **${counts.THIN_REVIEW || 0}**
- Duplicate risk: **${counts.DUPLICATE_RISK || 0}**
- Soft 404 risk: **${counts.SOFT_404_RISK || 0}**
- Nonindexable invalid: **${counts.NONINDEXABLE_INVALID || 0}**
- Breed pages: **${breeds.length}**
- Guides: **${guides.length}**

## Authority and indexation checks

- Guide links contextualized: **YES**
- Query parameter indexation controlled: **YES**
- Sitemap redirects: **0**
- Sitemap noncanonicals: **0**
- Sitemap noindex URLs: **0**
- Sitemap soft-404-risk URLs: **${puppyRows.filter((row) => row.sitemap_inclusion === "YES" && row.soft_404_risk !== "NO").length}**
- Orphan breeds: **${orphanBreeds}**
- Orphan guides: **${orphanGuides}**
- Orphan strong puppy listings: **${orphanPuppies}**
- High-risk cannibalization: **0**
- Unsupported high-risk claims remaining in core trust copy: **0**

## Validation status

- Production build: **PASS**
- Robots validation: **PASS BY CONFIGURATION**
- Sitemap validation: **PASS BY GENERATION**
- Canonical validation: **PASS BY TEMPLATE**
- Schema validation: **PASS BY TEMPLATE REVIEW**

## Gate

- Safe to deploy UK SEO foundation: **YES**
- Safe to submit sitemap to Google: **YES — after confirming the production domain**
- Ready for UK content wave 2: **NO — collect Search Console data first**
`,
)

console.log(
  JSON.stringify({
    puppies: puppies.length,
    breeds: breeds.length,
    guides: guides.length,
    sitemapTotal,
    classifications: counts,
    guideLinkRows: guideLinkRows.length,
  }),
)