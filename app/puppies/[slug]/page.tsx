import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { PuppyGallery } from "@/components/puppy-gallery"
import { StatusBadge } from "@/components/status-badge"
import { EnquiryForm } from "@/components/enquiry-form"
import { PuppyCard } from "@/components/puppy-card"
import { puppies, breeds, formatPrice } from "@/lib/data"

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const puppy = puppies.find((p) => p.slug === slug)
  if (!puppy) return { title: "Puppy not found" }
  const colourPart = puppy.colour ? ` ${puppy.colour}` : ""
  return {
    title: `${puppy.name} — ${puppy.breed} Puppy for Sale in the UK | Potty Registered Puppies`,
    description: `Meet ${puppy.name}, a${colourPart} ${puppy.breed} puppy available in the UK. ${puppy.ageWeeks} weeks old, ${puppy.sex.toLowerCase()}. Enquire today at Potty Registered Puppies.`,
    alternates: {
      canonical: `https://www.pottyregisteredpuppies.com/puppies/${slug}`,
    },
  }
}

export default async function PuppyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const puppy = puppies.find((p) => p.slug === slug)
  if (!puppy) notFound()

  const breed = breeds.find((b) => b.slug === puppy.breedSlug)
  const related = puppies.filter((p) => p.slug !== puppy.slug && p.breedSlug === puppy.breedSlug).slice(0, 3)
  const fallback = puppies.filter((p) => p.slug !== puppy.slug).slice(0, 3)
  const suggestions = related.length ? related : fallback

  const facts = [
    { label: "Breed", value: puppy.breed },
    { label: "Sex", value: puppy.sex },
    { label: "Age", value: `${puppy.ageWeeks} weeks` },
    ...(puppy.colour ? [{ label: "Colour", value: puppy.colour }] : []),
  ]

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Puppies", href: "/puppies" },
            { label: puppy.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <PuppyGallery images={puppy.gallery} name={puppy.name} />

          <div className="flex flex-col">
            <StatusBadge status={puppy.status} />
            <h1 className="mt-3 text-pretty text-4xl text-forest-deep md:text-5xl">{puppy.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {puppy.breed} · {puppy.sex}
            </p>
            <p className="mt-5 font-serif text-2xl text-primary">{formatPrice(puppy.price)}</p>

            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {facts.map((f) => (
                <div key={f.label} className="bg-card px-5 py-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {puppy.description}
            </p>

            {breed && (
              <Link
                href={`/breeds/${breed.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Learn about {breed.name}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-2xl text-forest-deep md:text-3xl">Send an enquiry</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Interested in {puppy.name}? Share a few details and our team will be in touch to arrange a viewing and
                answer any questions. There is no obligation.
              </p>
            </div>
            <EnquiryForm puppyName={puppy.name} />
          </div>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="text-2xl text-forest-deep md:text-3xl">You may also like</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((p) => (
                <PuppyCard key={p.slug} puppy={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}
