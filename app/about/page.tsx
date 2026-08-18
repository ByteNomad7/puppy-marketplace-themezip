import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { CtaLink } from "@/components/cta-link"

export const metadata: Metadata = {
  title: "About Us | Potty Registered Puppies UK",
  description:
    "Potty Registered Puppies is a UK puppy marketplace helping families explore teacup and toy puppies, understand breed differences, and make an informed enquiry.",
  alternates: {
    canonical: "https://www.pottyregisteredpuppies.com/about",
  },
}

const values = [
  {
    title: "Wellbeing first",
    body: "Every listing centres on the health and happiness of the puppy, from early socialisation to veterinary care.",
  },
  {
    title: "Transparency",
    body: "Clear information and honest conversations help UK families make confident, informed decisions.",
  },
  {
    title: "Thoughtful matches",
    body: "We encourage matches based on lifestyle and temperament, not appearance alone, for a lasting and happy fit.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">Our story</span>
            <h1 className="mt-3 text-pretty text-4xl leading-tight text-forest-deep md:text-5xl">
              A considered way to find your companion in the UK
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Potty Registered Puppies exists to make finding a puppy feel considered rather than rushed. We connect
              UK families with teacup and toy puppy listings and provide practical guidance to help them choose carefully.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              We believe every puppy deserves a loving home and every family deserves complete peace of mind.
              Our team is here to guide you through every step of the journey, from choosing the right breed to
              welcoming your new companion home.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/about/story.png"
              alt="A person walking several happy dogs on a tree-lined path"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="max-w-xl text-pretty text-3xl text-forest-deep">What we stand for</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-xl text-forest-deep">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-center rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:py-16">
          <h2 className="max-w-lg text-pretty text-3xl md:text-4xl">Have a question before you begin?</h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
            Our team is happy to talk through breeds, timing, or anything else — with no obligation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <CtaLink href="/contact" variant="light">
              Contact us
            </CtaLink>
            <CtaLink href="/puppies" variant="ghostLight">
              Browse puppies
            </CtaLink>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
