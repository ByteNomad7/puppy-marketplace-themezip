import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { TrustStrip } from "@/components/home/trust-strip"
import { HowItWorks } from "@/components/home/how-it-works"
import { SearchModule } from "@/components/search-module"
import { SectionHeading } from "@/components/section-heading"
import { PuppyCard } from "@/components/puppy-card"
import { BreedCard } from "@/components/breed-card"
import { GuideCard } from "@/components/guide-card"
import { CtaLink } from "@/components/cta-link"
import { puppies, breeds, guides } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        {/* Search module */}
        <section className="relative z-10 bg-secondary/50 pb-14">
          <div className="mx-auto -mt-8 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SearchModule />
          </div>
        </section>

        <TrustStrip />

        {/* Available puppies */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
            <SectionHeading
              eyebrow="Available Now"
              title="Puppies looking for a family"
              description="A selection of our teacup and toy puppies currently listed."
              link={{ label: "View all puppies", href: "/puppies" }}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {puppies.slice(0, 6).map((puppy) => (
                <PuppyCard key={puppy.slug} puppy={puppy} />
              ))}
            </div>
          </div>
        </section>

        {/* Breed discovery */}
        <section className="bg-secondary/40">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
            <SectionHeading
              eyebrow="Explore by Breed"
              title="Find the breed that suits your home"
              description="Every breed has its own character. Learn what makes each one a great companion."
              link={{ label: "All breeds", href: "/breeds" }}
            />
            <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
              {breeds.map((breed) => (
                <BreedCard
                  key={breed.slug}
                  breed={breed}
                  className="w-52 shrink-0 snap-start sm:w-auto"
                />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Buyer education */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
            <SectionHeading
              eyebrow="Puppy Buying Guides"
              title="Learn before you welcome them home"
              description="Editorial guides written to help you prepare, ask the right questions, and care for your new puppy."
              link={{ label: "Read all guides", href: "/guides" }}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-forest-deep">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20 lg:px-8">
            <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight text-primary-foreground text-balance sm:text-4xl">
              Ready to find your family&apos;s new companion?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/75">
              Browse available puppies or reach out with your questions. We&apos;re
              here to help you every step of the way.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href="/puppies" variant="gold" size="lg">
                Find a Puppy
              </CtaLink>
              <CtaLink href="/contact" variant="ghostLight" size="lg">
                Contact Us
              </CtaLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
