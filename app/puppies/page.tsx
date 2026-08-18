import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { PuppyBrowser } from "@/components/puppy-browser"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, itemListSchema } from "@/lib/seo"
import { breeds, puppies } from "@/lib/data"
import { CtaLink } from "@/components/cta-link"

const featuredBreeds = breeds
  .map((breed) => ({
    breed,
    listingCount: puppies.filter((puppy) => puppy.breedSlug === breed.slug).length,
  }))
  .filter(({ listingCount }) => listingCount > 0)
  .sort((a, b) => b.listingCount - a.listingCount || a.breed.name.localeCompare(b.breed.name))
  .slice(0, 6)

export const metadata: Metadata = {
  title: "Teacup & Toy Puppies for Sale UK | Potty Registered Puppies",
  description:
    "Browse teacup and toy puppies for sale across the UK. Filter by breed, sex, and age to find your perfect companion. All listings at Potty Registered Puppies.",
  alternates: {
    canonical: "https://www.pottyregisteredpuppies.com/puppies",
  },
}

export default function PuppiesPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Puppies" }]),
          itemListSchema(puppies.map((p) => ({ name: p.name, path: `/puppies/${p.slug}` }))),
        ]}
      />
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Puppies" }]} />
          <h1 className="mt-4 text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            Puppies for Sale in the UK
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Explore our full range of teacup and toy puppies. Use the filters to narrow
            by breed, sex, and more to find the right companion for your home.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink href="/breeds" size="sm">
              Explore breeds
            </CtaLink>
            <CtaLink href="/guides" variant="outline" size="sm">
              Read buyer guides
            </CtaLink>
            <CtaLink href="/about" variant="outline" size="sm">
              About us
            </CtaLink>
            <CtaLink href="/contact" variant="outline" size="sm">
              Contact us
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12 lg:px-8">
          <div className="mb-10 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-xl text-forest-deep">Explore puppies by breed</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredBreeds.map(({ breed }) => (
                <Link
                  key={breed.slug}
                  href={`/breeds/${breed.slug}`}
                  className="rounded-full border border-border px-3.5 py-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {breed.name}
                </Link>
              ))}
            </div>
          </div>
          <PuppyBrowser />
        </div>
      </section>
    </PageShell>
  )
}
