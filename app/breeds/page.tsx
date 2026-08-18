import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { BreedCard } from "@/components/breed-card"
import { breeds } from "@/lib/data"

export const metadata: Metadata = {
  title: "Dog Breed Profiles | Potty Registered Puppies UK",
  description:
    "Explore breed profiles for teacup and toy dogs available in the UK — covering temperament, care needs, and what to expect — to help you find the right match for your home.",
  alternates: {
    canonical: "https://www.pottyregisteredpuppies.com/breeds",
  },
}

export default function BreedsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Breeds" }]} />
        <div className="mt-6 max-w-2xl">
          <h1 className="text-pretty text-4xl text-forest-deep md:text-5xl">Breed library</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every breed brings its own temperament, energy, and care routine. Explore these profiles to understand what
            daily life with each companion looks like.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((breed) => (
            <BreedCard key={breed.slug} breed={breed} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
