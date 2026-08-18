import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { PuppyCard } from "@/components/puppy-card"
import { CtaLink } from "@/components/cta-link"
import { breeds, puppies } from "@/lib/data"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo"

export function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const breed = breeds.find((b) => b.slug === slug)
  if (!breed) return { title: "Breed not found" }
  return {
    title: `${breed.name} Puppies for Sale UK | Potty Registered Puppies`,
    description: `${breed.summary} Find ${breed.name} puppies for sale in the UK at Potty Registered Puppies.`,
    alternates: {
      canonical: `https://www.pottyregisteredpuppies.com/breeds/${slug}`,
    },
  }
}

export default async function BreedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const breed = breeds.find((b) => b.slug === slug)
  if (!breed) notFound()

  const available = puppies.filter((p) => p.breedSlug === breed.slug)

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Breeds", path: "/breeds" },
            { name: breed.name },
          ]),
          webPageSchema({
            name: `${breed.name} — Breed Profile`,
            description: breed.summary,
            path: `/breeds/${breed.slug}`,
          }),
        ]}
      />
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Breeds", href: "/breeds" },
            { label: breed.name },
          ]}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="zoom-parent relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={breed.image || "/placeholder.svg"}
              alt={`A ${breed.name} puppy`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="zoom-img object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">{breed.group} group</span>
            <h1 className="mt-3 text-pretty text-4xl text-forest-deep md:text-5xl">{breed.name}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{breed.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {breed.temperament.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sage/50 px-3.5 py-1.5 text-sm font-medium text-forest-deep"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <h2 className="text-2xl text-forest-deep">At a glance</h2>
            <dl className="mt-5 flex flex-col divide-y divide-border">
              {breed.traits.map((trait) => (
                <div key={trait.label} className="flex items-center justify-between py-3">
                  <dt className="text-sm text-muted-foreground">{trait.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{trait.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-2xl text-forest-deep">Living with a {breed.name}</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{breed.care}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl text-forest-deep md:text-3xl">
              {available.length > 0 ? `${breed.name} puppies for sale` : `${breed.name} puppies`}
            </h2>
            <CtaLink href="/puppies" variant="outline">
              View all puppies
            </CtaLink>
          </div>
          {available.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((p) => (
                <PuppyCard key={p.slug} puppy={p} />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
              There are no {breed.name} puppies listed right now. Send us an enquiry and we&apos;ll let you
              know when one becomes available.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  )
}
