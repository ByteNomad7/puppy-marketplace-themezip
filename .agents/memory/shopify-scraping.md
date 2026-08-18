---
name: Shopify product scraping
description: How to reliably fetch product and collection data from a public Shopify store
---

Public Shopify stores expose JSON APIs without authentication:

- `/products.json?limit=250&page=N` — paginate all products
- `/collections/<handle>/products.json?limit=250` — products in a specific collection
- `/collections.json` — list all collection handles

**Filtering available puppies:** Check each variant titled "Full Payment" for `available: true`. Title-based keywords like "RESERVED" or "PURCHASED" also signal status.

**Why:** The storefront HTML is hard to parse; the JSON API is stable and structured.

**Product details:** `body_html` contains an HTML table with breed, sex, name, age, colour. Parse with regex on `<tr>/<td>` pairs.

**Image URLs:** In `product.images[].src` — direct CDN links, downloadable without auth.
