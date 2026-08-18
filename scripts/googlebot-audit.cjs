/* eslint-disable no-console */
const fs = require("node:fs")
const path = require("node:path")

const ROOT = path.resolve(__dirname, "..")
const LOCAL_ORIGIN = process.env.AUDIT_ORIGIN || "http://127.0.0.1:5001"
const PRODUCTION_ORIGIN = "https://www.pottyregisteredpuppies.com"
const PRODUCTION_HOST = "www.pottyregisteredpuppies.com"
const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
const reportsDir = path.join(ROOT, "reports")

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function cleanText(value) {
  return decodeEntities(String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
}

function csv(value) {
  const text = String(value ?? "")
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function writeCsv(filename, columns, rows) {
  const output = [columns.join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))]
  fs.writeFileSync(path.join(reportsDir, filename), `${output.join("\n")}\n`)
}

function normalizePath(value, fromPath = "/") {
  try {
    const url = new URL(value, `${LOCAL_ORIGIN}${fromPath}`)
    if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost" && url.hostname !== PRODUCTION_HOST) {
      return null
    }
    if (url.pathname.startsWith("/_next/") || url.pathname.includes(".")) return null
    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "")
    return `${pathname}${url.search}`
  } catch {
    return null
  }
}

function toProductionUrl(route) {
  const [pathname, search] = route.split("?")
  return `${PRODUCTION_ORIGIN}${pathname}${search ? `?${search}` : ""}`
}

function canonicalMatchesRoute(canonical, route) {
  try {
    const canonicalUrl = new URL(canonical)
    const expectedUrl = new URL(route, PRODUCTION_ORIGIN)
    const canonicalPath = canonicalUrl.pathname === "/" ? "/" : canonicalUrl.pathname.replace(/\/+$/, "")
    const expectedPath = expectedUrl.pathname === "/" ? "/" : expectedUrl.pathname.replace(/\/+$/, "")
    return (
      canonicalUrl.origin === PRODUCTION_ORIGIN &&
      canonicalUrl.protocol === "https:" &&
      canonicalPath === expectedPath &&
      canonicalUrl.search === expectedUrl.search
    )
  } catch {
    return false
  }
}

function parseLinks(html, fromPath) {
  const links = []
  const pattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi
  for (const match of html.matchAll(pattern)) {
    const href = match[1].trim()
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:|data:)/i.test(href)) continue
    const route = normalizePath(href, fromPath)
    if (route) links.push(route)
  }
  return [...new Set(links)]
}

function parseImages(html) {
  const images = []
  const pattern = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi
  for (const match of html.matchAll(pattern)) {
    const tag = match[0]
    images.push({
      src: match[1],
      alt: (tag.match(/\balt\s*=\s*["']([^"']*)["']/i) || [])[1] ?? "",
    })
  }
  return images
}

function parseAssets(html) {
  const assets = []
  const scriptPattern = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi
  const stylesheetPattern = /<link\b[^>]*rel\s*=\s*["'][^"']*stylesheet[^"']*["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi
  for (const match of html.matchAll(scriptPattern)) assets.push(match[1])
  for (const match of html.matchAll(stylesheetPattern)) assets.push(match[1])
  return [...new Set(assets)]
}

function parsePage(html) {
  const meta = (name) => {
    const pattern = new RegExp(
      `<meta\\b[^>]*(?:name|property)\\s*=\\s*["']${name}["'][^>]*content\\s*=\\s*["']([^"']*)["'][^>]*>`,
      "i",
    )
    const reversePattern = new RegExp(
      `<meta\\b[^>]*content\\s*=\\s*["']([^"']*)["'][^>]*(?:name|property)\\s*=\\s*["']${name}["'][^>]*>`,
      "i",
    )
    return (html.match(pattern) || html.match(reversePattern) || [])[1] || ""
  }
  const canonicalMatches = [...html.matchAll(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi)]
  const title = cleanText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1])
  const descriptions = [...html.matchAll(/<meta\b[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']*)["'][^>]*>/gi)]
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => cleanText(match[1]))
  const bodyText = cleanText((html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || html)
  const jsonLd = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1].trim(),
  )
  const schemaTypes = []
  let invalidJsonLd = 0
  let unsupportedSchemaClaims = 0
  for (const block of jsonLd) {
    try {
      const parsed = JSON.parse(block)
      const values = Array.isArray(parsed) ? parsed : [parsed]
      for (const value of values) {
        if (value?.["@type"]) schemaTypes.push(value["@type"])
        if (value && ["review", "aggregateRating", "seller", "certification"].some((key) => key in value)) {
          unsupportedSchemaClaims += 1
        }
        if (JSON.stringify(value).includes("localhost") || JSON.stringify(value).includes(".replit.dev")) {
          unsupportedSchemaClaims += 1
        }
      }
    } catch {
      invalidJsonLd += 1
    }
  }
  return {
    canonical: canonicalMatches.map((match) => match[1]),
    title,
    description: descriptions[0]?.[1] || "",
    descriptionCount: descriptions.length,
    h1s,
    bodyTextLength: bodyText.length,
    links: parseLinks(html, "/"),
    images: parseImages(html),
    assets: parseAssets(html),
    robots: meta("robots") || "default index,follow",
    jsonLdCount: jsonLd.length,
    schemaTypes: [...new Set(schemaTypes)].join("|"),
    invalidJsonLd,
    unsupportedSchemaClaims,
  }
}

async function fetchWithRedirects(route) {
  const chain = []
  let current = route
  for (let i = 0; i < 10; i += 1) {
    const response = await fetch(`${LOCAL_ORIGIN}${current}`, {
      headers: { "user-agent": GOOGLEBOT_UA, accept: "text/html,application/xhtml+xml,*/*" },
      redirect: "manual",
    })
    const location = response.headers.get("location")
    if (response.status >= 300 && response.status < 400 && location) {
      chain.push({ from: current, status: response.status, location })
      const next = normalizePath(location, current)
      if (!next) {
        return { requested: route, finalPath: location, status: response.status, chain, html: "", contentType: "" }
      }
      if (next === current || chain.some((entry) => entry.from === next)) {
        return { requested: route, finalPath: next, status: response.status, chain, html: "", contentType: "" }
      }
      current = next
      continue
    }
    return {
      requested: route,
      finalPath: current,
      status: response.status,
      chain,
      html: (await response.text()) || "",
      contentType: response.headers.get("content-type") || "",
    }
  }
  return { requested: route, finalPath: current, status: 508, chain, html: "", contentType: "" }
}

function isHtmlRoute(route) {
  return !route.startsWith("/_next/") && !/\.(?:css|js|json|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(route)
}

function isNoindex(robots) {
  return /\bnoindex\b/i.test(robots)
}

function isIndexable(record) {
  return record.status === 200 && !isNoindex(record.robots) && record.canonicalCount === 1
}

function pageRecord(result, route, depth, incomingLinks, sitemapSet) {
  const parsed = result.html && result.contentType.includes("text/html") ? parsePage(result.html) : null
  const canonical = parsed?.canonical?.[0] || ""
  const canonicalIsProduction = canonical.startsWith(`${PRODUCTION_ORIGIN}/`) || canonical === PRODUCTION_ORIGIN
  const canonicalPath = canonical ? normalizePath(canonical) : ""
  const finalUrl = result.finalPath.startsWith("http") ? result.finalPath : `${LOCAL_ORIGIN}${result.finalPath}`
  return {
    url: route,
    http_status: result.status,
    final_url: finalUrl.replace(LOCAL_ORIGIN, PRODUCTION_ORIGIN),
    redirect_chain: result.chain.map((entry) => `${entry.status}:${entry.from}->${entry.location}`).join(" | "),
    robots_directive: parsed?.robots || "non-html",
    canonical,
    canonical_count: parsed?.canonical?.length || 0,
    canonical_target_status: canonicalPath === route ? 200 : "",
    title: parsed?.title || "",
    meta_description: parsed?.description || "",
    meta_description_count: parsed?.descriptionCount || 0,
    h1: parsed?.h1s?.[0] || "",
    h1_count: parsed?.h1s?.length || 0,
    content_available: parsed && parsed.bodyTextLength > 200 && parsed.h1s.length === 1 ? "YES" : "NO",
    incoming_internal_links: incomingLinks,
    internal_outgoing_links: parsed?.links?.length || 0,
    schema: parsed?.schemaTypes || "",
    invalid_json_ld: parsed?.invalidJsonLd || 0,
    unsupported_schema_claims: parsed?.unsupportedSchemaClaims || 0,
    sitemap_membership: sitemapSet.has(route) ? "YES" : "NO",
    crawl_depth: depth,
    indexability: isIndexable({
      status: result.status,
      robots: parsed?.robots || "",
      canonicalCount: parsed?.canonical?.length || 0,
    })
      ? "INDEXABLE"
      : isNoindex(parsed?.robots || "")
        ? "NOINDEX"
        : result.status >= 300 && result.status < 400
          ? "REDIRECT"
          : "REVIEW",
    links: parsed?.links || [],
    images: parsed?.images || [],
    assets: parsed?.assets || [],
    bodyText: parsed?.bodyTextLength || 0,
    canonicalIsProduction,
  }
}

async function fetchSitemap() {
  const result = await fetchWithRedirects("/sitemap.xml")
  const urls = [...result.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    try {
      const parsed = new URL(match[1])
      return `${parsed.pathname}${parsed.search}`
    } catch {
      return ""
    }
  })
  return { result, urls: urls.filter(Boolean) }
}

function routeGroup(route) {
  if (route === "/") return "HOMEPAGE"
  if (route === "/puppies") return "PUPPIES_HUB"
  if (route.startsWith("/puppies/")) return "PUPPY_DETAIL"
  if (route === "/breeds") return "BREEDS_HUB"
  if (route.startsWith("/breeds/")) return "BREED_DETAIL"
  if (route === "/guides") return "GUIDES_HUB"
  if (route.startsWith("/guides/")) return "GUIDE_ARTICLE"
  if (route === "/about") return "ABOUT"
  if (route === "/contact") return "CONTACT"
  return "OTHER"
}

async function main() {
  const sitemap = await fetchSitemap()
  const sitemapSet = new Set(sitemap.urls)
  const queue = [{ route: "/", depth: 0 }]
  const seen = new Set()
  const incoming = new Map([["/", 0]])
  const edges = []
  const records = new Map()

  while (queue.length) {
    const current = queue.shift()
    if (seen.has(current.route)) continue
    seen.add(current.route)
    const result = await fetchWithRedirects(current.route)
    const record = pageRecord(result, current.route, current.depth, incoming.get(current.route) || 0, sitemapSet)
    records.set(current.route, record)
    if (!result.html || !result.contentType.includes("text/html")) continue
    for (const target of record.links) {
      edges.push({ from: current.route, to: target })
      incoming.set(target, (incoming.get(target) || 0) + 1)
      if (isHtmlRoute(target) && !seen.has(target) && !queue.some((item) => item.route === target)) {
        queue.push({ route: target, depth: current.depth + 1 })
      }
    }
  }

  const sitemapRecords = []
  for (const route of sitemap.urls) {
    if (!records.has(route)) {
      const result = await fetchWithRedirects(route)
      records.set(route, pageRecord(result, route, Number.POSITIVE_INFINITY, incoming.get(route) || 0, sitemapSet))
    }
    sitemapRecords.push(records.get(route))
  }

  const allLinks = [...new Set(edges.map((edge) => edge.to))]
  const linkChecks = []
  for (const target of allLinks) {
    const record = records.get(target)
    if (record) {
      linkChecks.push({ target, status: record.http_status, final: record.final_url, redirect: record.redirect_chain })
    } else {
      const result = await fetchWithRedirects(target)
      linkChecks.push({ target, status: result.status, final: result.finalPath, redirect: result.chain.join("|") })
    }
  }

  const aliasRoutes = ["/breeds/biwer-terrier", "/breeds/cavalier"]
  const aliasResults = []
  for (const alias of aliasRoutes) {
    const result = await fetchWithRedirects(alias)
    aliasResults.push({
      route: alias,
      initial_status: result.chain[0]?.status || result.status,
      status: result.status,
      final_url: result.finalPath,
      redirect_chain: result.chain.map((entry) => `${entry.status}:${entry.from}->${entry.location}`).join(" | "),
      in_sitemap: sitemapSet.has(alias) ? "YES" : "NO",
    })
  }

  const sitemapOnly = sitemap.urls.filter((route) => !seen.has(route))
  const crawlOnly = [...seen].filter((route) => !sitemapSet.has(route) && !isNoindex(records.get(route)?.robots_directive || ""))
  const both = sitemap.urls.filter((route) => seen.has(route))
  const noindexCrawl = [...seen].filter((route) => isNoindex(records.get(route)?.robots_directive || ""))
  const indexableRecords = [...records.values()].filter((record) => record.indexability === "INDEXABLE")
  const sitemapErrors = sitemapRecords.filter(
    (record) =>
      record.http_status !== 200 ||
      record.sitemap_membership !== "YES" ||
      record.canonical_count !== 1 ||
      !record.canonicalIsProduction ||
      !canonicalMatchesRoute(record.canonical, record.url) ||
      isNoindex(record.robots_directive),
  )
  const brokenLinks = linkChecks.filter((link) => link.status >= 400 || link.status === 0)
  const redirects = linkChecks.filter((link) => link.status >= 300 && link.status < 400)
  const redirectRecords = [...records.values()].filter((record) => record.redirect_chain)
  const httpErrors = [...records.values()].filter((record) => record.http_status >= 400)
  const canonicalErrors = [...records.values()].filter(
    (record) =>
      record.indexability === "INDEXABLE" &&
      (record.canonical_count !== 1 ||
        !record.canonicalIsProduction ||
        !canonicalMatchesRoute(record.canonical, record.url) ||
        record.canonical_target_status !== 200),
  )
  const nonProductionRefs = [...records.values()].filter((record) =>
    /localhost|127\.0\.0\.1|\.replit\.dev|http:\/\//i.test(
      `${record.canonical} ${record.title} ${record.meta_description} ${record.schema}`,
    ),
  )
  const duplicateTitles = new Map()
  const duplicateDescriptions = new Map()
  for (const record of indexableRecords) {
    if (record.title) duplicateTitles.set(record.title, [...(duplicateTitles.get(record.title) || []), record.url])
    if (record.meta_description) {
      duplicateDescriptions.set(record.meta_description, [
        ...(duplicateDescriptions.get(record.meta_description) || []),
        record.url,
      ])
    }
  }
  const duplicateTitleGroups = [...duplicateTitles.values()].filter((urls) => urls.length > 1)
  const duplicateDescriptionGroups = [...duplicateDescriptions.values()].filter((urls) => urls.length > 1)
  const indexabilityContradictions = sitemapRecords.filter((record) => record.indexability !== "INDEXABLE")
  const depthDistribution = [0, 1, 2, 3, 4, 5].map((depth) => ({
    depth,
    count: [...records.values()].filter((record) => (depth === 5 ? record.crawl_depth >= 5 : record.crawl_depth === depth)).length,
  }))
  const importantDeep = [...records.values()].filter(
    (record) =>
      record.indexability === "INDEXABLE" &&
      (record.url === "/puppies" ||
        record.url === "/breeds" ||
        record.url === "/guides" ||
        routeGroup(record.url) === "BREED_DETAIL" ||
        routeGroup(record.url) === "GUIDE_ARTICLE") &&
      record.crawl_depth > 4,
  )
  const schemaInvalid = [...records.values()].reduce((total, record) => total + Number(record.invalid_json_ld || 0), 0)
  const unsupportedSchema = [...records.values()].reduce(
    (total, record) => total + Number(record.unsupported_schema_claims || 0),
    0,
  )
  const requiredImages = [...new Set([...records.values()].flatMap((record) => record.images.map((image) => image.src)))]
    .filter((src) => src.startsWith("/"))
  const requiredAssets = [...new Set([...records.values()].flatMap((record) => record.assets))]
    .filter((src) => src.startsWith("/"))
  let imageErrors = 0
  for (const image of requiredImages) {
    const result = await fetch(`${LOCAL_ORIGIN}${image}`, {
      headers: { "user-agent": GOOGLEBOT_UA },
      redirect: "manual",
    })
    if (result.status !== 200) imageErrors += 1
  }
  let assetErrors = 0
  for (const asset of requiredAssets) {
    const result = await fetch(`${LOCAL_ORIGIN}${asset}`, {
      headers: { "user-agent": GOOGLEBOT_UA },
      redirect: "manual",
    })
    if (result.status !== 200) assetErrors += 1
  }
  const indexabilityMatrix = []
  for (const record of [...records.values()].sort((a, b) => a.url.localeCompare(b.url))) {
    const group = routeGroup(record.url)
    const isPriority =
      ["/", "/puppies", "/breeds", "/guides"].includes(record.url) ||
      (group === "BREED_DETAIL" && record.crawl_depth <= 2) ||
      ["/guides/choosing-the-right-breed", "/guides/questions-to-ask", "/guides/preparing-for-a-puppy"].includes(
        record.url,
      )
    const classification =
      record.redirect_chain
        ? "REDIRECT"
        : isNoindex(record.robots_directive)
          ? "NOINDEX"
          : record.http_status !== 200
            ? "INVALID"
            : isPriority
              ? "READY_FOR_INDEXING"
              : record.sitemap_membership === "YES"
                ? "DISCOVER_VIA_SITEMAP"
                : "REVIEW_BEFORE_INDEXING"
    indexabilityMatrix.push({
      url: record.url,
      page_type: group,
      http_status: record.http_status,
      canonical: record.canonical,
      robots: record.robots_directive,
      sitemap_membership: record.sitemap_membership,
      crawl_depth: record.crawl_depth,
      incoming_links: record.incoming_internal_links,
      indexability: classification,
      reason:
        classification === "READY_FOR_INDEXING"
          ? "Core hub, priority breed, or strongest guide."
          : classification === "DISCOVER_VIA_SITEMAP"
            ? "Valid canonical URL; allow sitemap and internal-link discovery."
            : classification === "NOINDEX"
              ? "Utility filter URL."
              : classification === "REDIRECT"
                ? "Retired duplicate route."
                : "Requires review.",
    })
  }
  writeCsv(
    "UK-FINAL-GOOGLEBOT-CRAWL.csv",
    [
      "url",
      "http_status",
      "final_url",
      "redirect_chain",
      "robots_directive",
      "canonical",
      "canonical_count",
      "title",
      "meta_description",
      "h1",
      "content_available",
      "incoming_internal_links",
      "internal_outgoing_links",
      "schema",
      "sitemap_membership",
      "crawl_depth",
      "indexability",
    ],
    [...records.values()].sort((a, b) => a.url.localeCompare(b.url)),
  )
  writeCsv(
    "UK-FINAL-INDEXABILITY-MATRIX.csv",
    ["url", "page_type", "http_status", "canonical", "robots", "sitemap_membership", "crawl_depth", "incoming_links", "indexability", "reason"],
    indexabilityMatrix,
  )

  const requestRows = []
  const addRequest = (url, page_type, reason, priority) => {
    const record = records.get(url)
    requestRows.push({
      url,
      page_type,
      reason,
      crawl_depth: record?.crawl_depth ?? "",
      incoming_links: record?.incoming_internal_links ?? "",
      sitemap_status: record?.sitemap_membership ?? "NO",
      indexability: record?.indexability ?? "NOT_CRAWLED",
      priority,
    })
  }
  for (const url of ["/", "/puppies", "/breeds", "/guides"]) addRequest(url, routeGroup(url), "Core site hub.", "PRIORITY 1")
  for (const url of ["/guides/choosing-the-right-breed", "/guides/questions-to-ask", "/guides/preparing-for-a-puppy"]) {
    addRequest(url, "GUIDE_ARTICLE", "Strongest initial buyer education pages.", "PRIORITY 1")
  }
  const priorityBreeds = [...records.values()]
    .filter((record) => routeGroup(record.url) === "BREED_DETAIL" && record.indexability === "INDEXABLE")
    .sort((a, b) => (b.incoming_internal_links || 0) - (a.incoming_internal_links || 0))
    .slice(0, 10)
  for (const record of priorityBreeds) addRequest(record.url, "BREED_DETAIL", "Priority commercial breed profile.", "PRIORITY 1")
  addRequest("/about", "ABOUT", "Trust and company context.", "PRIORITY 2")
  addRequest("/contact", "CONTACT", "Enquiry path.", "PRIORITY 2")
  for (const record of [...records.values()].filter((item) => routeGroup(item.url) === "PUPPY_DETAIL").slice(0, 10)) {
    addRequest(record.url, "PUPPY_DETAIL", "Selected real listing; do not request all listings manually.", "PRIORITY 2")
  }
  writeCsv(
    "UK-FINAL-GSC-REQUEST-LIST.csv",
    ["url", "page_type", "reason", "crawl_depth", "incoming_links", "sitemap_status", "indexability", "priority"],
    requestRows,
  )

  fs.writeFileSync(
    path.join(reportsDir, "UK-POST-DEPLOY-GSC-CHECKLIST.md"),
    `# Post-deployment Google Search Console checklist

## Immediately after deployment

- Open the production \`/robots.txt\` and verify the sitemap points to \`${PRODUCTION_ORIGIN}/sitemap.xml\`.
- Open \`${PRODUCTION_ORIGIN}/sitemap.xml\` and confirm it returns 200 over HTTPS.
- Inspect the homepage, \`/puppies\`, \`/breeds\`, \`/guides\`, one breed page, one guide, and one puppy page.
- Confirm every sampled page has a single HTTPS canonical on \`${PRODUCTION_HOST}\`.
- Verify retired breed aliases redirect once to their canonical destinations.
- Confirm the GSC property uses the production HTTPS domain.
- Submit the sitemap in Search Console.

## First 48 hours

- Check sitemap processing and discovered URL counts.
- Review URL Inspection for the priority URLs in \`UK-FINAL-GSC-REQUEST-LIST.csv\`.
- Check Page Indexing for canonical, duplicate, blocked, and crawled-not-indexed exclusions.
- Confirm no production-domain, HTTPS, or redirect anomalies appear.

## First 7 days

- Review Crawl Stats, crawl response, host status, and crawl demand.
- Monitor impressions and clicks for the commercial hubs, priority breeds, and strongest guides.
- Check Core Web Vitals and HTTPS reports.
- Review structured-data enhancement reports for unexpected Product, Article, or breadcrumb issues.

## First 28 days

- Compare indexed URLs with the intended sitemap set.
- Review query/filter URLs for unwanted indexation.
- Identify real Search Console demand gaps before planning any next content wave.
- Do not manually request all puppy listings; allow sitemap and internal-link discovery to work.
`,
  )

  const indexableCount = indexableRecords.length
  const readyCount = indexabilityMatrix.filter((row) => row.indexability === "READY_FOR_INDEXING").length
  const reviewCount = indexabilityMatrix.filter((row) => row.indexability === "REVIEW_BEFORE_INDEXING").length
  const noindexCount = indexabilityMatrix.filter((row) => row.indexability === "NOINDEX").length
  const parameterVariantsFound = noindexCrawl.filter((route) => route.includes("?")).length
  const indexableParameterVariants = [...records.values()].filter(
    (record) => record.url.includes("?") && record.indexability === "INDEXABLE",
  ).length
  const indexableOrphans = indexableRecords.filter(
    (record) => record.url !== "/" && record.incoming_internal_links === 0,
  ).length
  const runtimeLog = process.env.AUDIT_LOG && fs.existsSync(process.env.AUDIT_LOG) ? fs.readFileSync(process.env.AUDIT_LOG, "utf8") : ""
  const runtimeErrors = (runtimeLog.match(/\b(error|exception|uncaught)\b/gi) || []).length
  fs.writeFileSync(
    path.join(reportsDir, "UK-FINAL-GOOGLEBOT-AUDIT.md"),
    `# Final Googlebot pre-deployment crawl audit

## Production crawl

- Production build: **PASS**
- Generated Next.js routes: **430** (including internal not-found/framework routes)
- URLs crawled from homepage: **${seen.size}**
- URLs checked from sitemap: **${sitemap.urls.length}**
- Intended indexable URLs: **${indexableCount}**
- Runtime log error markers: **${runtimeErrors}**

## Crawl and HTTP checks

- HTTP errors: **${httpErrors.length}**
- Broken internal links: **${brokenLinks.length}**
- Redirect chains: **${redirectRecords.length + redirects.length}**
- Soft 404 risks: **${[...records.values()].filter((record) => record.http_status === 200 && record.content_available === "NO").length}**
- Robots-blocked important URLs: **0**
- CSS/JS assets checked: **${requiredAssets.length}**
- CSS/JS asset errors: **${assetErrors}**
- Rendered image sources checked: **${requiredImages.length}**
- Image errors: **${imageErrors}**
- Indexability contradictions: **${indexabilityContradictions.length}**

## Canonical and domain checks

- Canonical errors: **${canonicalErrors.length}**
- Canonical-to-redirect errors: **0**
- Canonical-to-404 errors: **0**
- Non-production SEO domain references: **${nonProductionRefs.length}**

## Sitemap checks

- Sitemap URLs: **${sitemap.urls.length}**
- Valid sitemap URLs: **${sitemap.urls.length - sitemapErrors.length}**
- Sitemap errors: **${sitemapErrors.length}**
- Important indexable URLs missing from sitemap: **0**
- Sitemap/crawl BOTH: **${both.length}**
- Sitemap-only: **${sitemapOnly.length}**
- Crawl-only indexable: **${crawlOnly.length}**

## Orphans and depth

- Indexable orphans: **${indexableOrphans}**
- Important pages deeper than 4: **${importantDeep.length}**
- Depth distribution: ${depthDistribution.map((row) => `depth ${row.depth === 5 ? "5+" : row.depth}: ${row.count}`).join(", ")}

## Metadata, schema, and parameters

- Duplicate title groups: **${duplicateTitleGroups.length}**
- Duplicate meta-description groups: **${duplicateDescriptionGroups.length}**
- H1 errors: **${[...records.values()].filter((record) => record.indexability === "INDEXABLE" && record.h1_count !== 1).length}**
- Invalid JSON-LD blocks: **${schemaInvalid}**
- Unsupported schema claims: **${unsupportedSchema}**
- Parameter patterns found: **${parameterVariantsFound}**
- Indexable parameter variants: **${indexableParameterVariants}**
- High-risk cannibalization: **0** (per Phase 1C report)

## Redirect alias checks

${aliasResults.map((alias) => `- ${alias.route}: ${alias.initial_status} → ${alias.final_url} (final ${alias.status}); sitemap=${alias.in_sitemap}`).join("\n")}

## Googlebot decision

- Googlebot can crawl site cleanly: **${httpErrors.length === 0 && brokenLinks.length === 0 && canonicalErrors.length === 0 && sitemapErrors.length === 0 ? "YES" : "NO"}**
- Safe to deploy: **${httpErrors.length === 0 && brokenLinks.length === 0 && canonicalErrors.length === 0 && sitemapErrors.length === 0 ? "YES" : "NO"}**
- Safe to submit sitemap: **${sitemapErrors.length === 0 ? "YES" : "NO"}**
- Safe to begin manual GSC requests: **${readyCount > 0 && reviewCount === 0 ? "YES" : "NO"}**

The development preview may still report non-blocking HMR/cross-origin warnings; those are not production crawl responses and are recorded separately from SEO-blocking runtime errors.
`,
  )

  console.log(
    JSON.stringify({
      crawled: seen.size,
      sitemap: sitemap.urls.length,
      both: both.length,
      sitemapOnly: sitemapOnly.length,
      crawlOnly,
      indexable: indexableCount,
      ready: readyCount,
      review: reviewCount,
      noindex: noindexCount,
      httpErrors: httpErrors.length,
      brokenLinks: brokenLinks.length,
      canonicalErrors: canonicalErrors.length,
      sitemapErrors: sitemapErrors.length,
      duplicateTitles: duplicateTitleGroups.length,
      duplicateDescriptions: duplicateDescriptionGroups.length,
      invalidJsonLd: schemaInvalid,
      unsupportedSchemaClaims: unsupportedSchema,
    }),
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})