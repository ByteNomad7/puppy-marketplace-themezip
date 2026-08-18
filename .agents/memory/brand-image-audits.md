---
name: Brand image audits
description: Removing source-brand photography from generated marketplace image libraries
---

When sanitising an imported image library, audit every derived asset as well as listing galleries. Breed thumbnails and other copied “first image” assets can retain source branding even after the underlying listing photo is removed.

**Why:** Removing image paths mechanically can leave an empty primary image, malformed gallery entries, or an empty product record. A separate derived thumbnail may also keep the branding visible.

**How to apply:** Identify branded photos first, remove their gallery references and files, promote the first clean gallery image to `image`, remove records with no clean gallery, and inspect/rebuild derived breed thumbnails before verifying the rendered pages.