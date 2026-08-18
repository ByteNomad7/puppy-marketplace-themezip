import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { GuideCard } from "@/components/guide-card"
import { guides } from "@/lib/data"

export const metadata: Metadata = {
  title: "Puppy Buyer Guide UK | Potty Registered Puppies",
  description:
    "Practical UK guidance for choosing, preparing for, and caring for a new puppy. Written to help families make a confident, informed decision.",
  alternates: {
    canonical: "https://www.pottyregisteredpuppies.com/guides",
  },
}

const ALL_CATEGORIES = Array.from(new Set(guides.map((g) => g.category)))

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = ALL_CATEGORIES.includes(category ?? "") ? category! : null

  const filtered = activeCategory
    ? guides.filter((g) => g.category === activeCategory)
    : guides

  const [featured, ...rest] = filtered

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Buyer Guide" }]} />
        <div className="mt-6 max-w-2xl">
          <h1 className="text-pretty text-4xl text-forest-deep md:text-5xl">Buyer guide</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Bringing home a puppy is a meaningful decision. These guides walk you through the essentials, from choosing
            a breed to settling into the first few months.
          </p>
        </div>

        {/* Category filter buttons */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/guides"
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            All
          </Link>
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/guides?category=${encodeURIComponent(cat)}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No guides found for this category.</p>
        ) : filtered.length === 1 ? (
          <div className="max-w-2xl">
            <GuideCard guide={featured} featured />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:row-span-2">
              <GuideCard guide={featured} featured />
            </div>
            {rest.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
