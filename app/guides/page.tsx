import type { Metadata } from "next"
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

export default function GuidesPage() {
  const [featured, ...rest] = guides

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
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:row-span-2">
            <GuideCard guide={featured} featured />
          </div>
          {rest.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
