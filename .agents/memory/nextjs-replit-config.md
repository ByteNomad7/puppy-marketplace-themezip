---
name: Next.js Replit dev host config
description: How to configure allowedDevOrigins correctly for Next.js on Replit
---

Next.js 16 `allowedDevOrigins` requires exact hostnames — wildcards like `*.replit.dev` are silently ignored.

**Rule:** Spread the env var conditionally so it's only applied in dev and picks up the live domain at startup:

```js
...(process.env.REPLIT_DEV_DOMAIN
  ? { allowedDevOrigins: [process.env.REPLIT_DEV_DOMAIN] }
  : {}),
```

**Why:** Replit proxies requests through a unique subdomain (e.g. `<id>.archer.replit.dev`). Next.js blocks cross-origin dev resource requests by default. The domain changes per session so it must be read at runtime.

**How to apply:** Add to `next.config.mjs` alongside other config keys. Restart the workflow after changing.
