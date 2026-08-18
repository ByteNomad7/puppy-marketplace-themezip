# Post-deployment Google Search Console checklist

## Immediately after deployment

- Open the production `/robots.txt` and verify the sitemap points to `https://www.pottyregisteredpuppies.com/sitemap.xml`.
- Open `https://www.pottyregisteredpuppies.com/sitemap.xml` and confirm it returns 200 over HTTPS.
- Inspect the homepage, `/puppies`, `/breeds`, `/guides`, one breed page, one guide, and one puppy page.
- Confirm every sampled page has a single HTTPS canonical on `www.pottyregisteredpuppies.com`.
- Verify retired breed aliases redirect once to their canonical destinations.
- Confirm the GSC property uses the production HTTPS domain.
- Submit the sitemap in Search Console.

## First 48 hours

- Check sitemap processing and discovered URL counts.
- Review URL Inspection for the priority URLs in `UK-FINAL-GSC-REQUEST-LIST.csv`.
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
