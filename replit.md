# Meadowbrook Puppies

A Next.js 16 puppy marketplace theme with pages for browsing puppies, breeds, and buyer guides.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript
- **Package manager**: pnpm

## Running the app

The dev server runs on port 5000 via the **Start application** workflow:

```
node_modules/.bin/next dev --port 5000
```

> pnpm is used for dependency management but the workflow calls Next.js directly to avoid pnpm's build-script approval check for the `msw` package.

## Data

All data lives in `lib/data.ts` as static arrays (puppies, breeds, guides). There is no database or backend — this is a frontend-only theme with placeholder content.

## Project structure

```
app/          Next.js App Router pages
components/   Reusable UI components
lib/          Data and utilities
public/       Static images
```

## User preferences

- Keep existing project structure and stack.
