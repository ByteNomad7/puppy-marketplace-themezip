import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { PuppyBrowser } from "@/components/puppy-browser"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, itemListSchema } from "@/lib/seo"
import { puppies } from "@/lib/data"

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
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12 lg:px-8">
          <PuppyBrowser />
        </div>
      </section>
    </PageShell>
  )
}
