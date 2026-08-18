import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { GuideCard } from "@/components/guide-card"
import { CtaLink } from "@/components/cta-link"
import { guides } from "@/lib/data"

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return { title: "Article not found" }
  return {
    title: `${guide.title} | Potty Registered Puppies`,
    description: guide.excerpt,
    alternates: {
      canonical: `https://www.pottyregisteredpuppies.com/guides/${slug}`,
    },
  }
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <PageShell>
      <article>
        <header className="mx-auto max-w-3xl px-5 pt-8 md:pt-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Buyer Guide", href: "/guides" },
              { label: guide.title },
            ]}
          />
          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wide text-accent-foreground">{guide.category}</span>
            <span aria-hidden="true" className="text-border">
              •
            </span>
            <span className="text-muted-foreground">{guide.readTime}</span>
          </div>
          <h1 className="mt-3 text-pretty text-4xl leading-tight text-forest-deep md:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{guide.excerpt}</p>
        </header>

        <div className="mx-auto mt-8 max-w-4xl px-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={guide.image || "/placeholder.svg"}
              alt={guide.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 py-12">
          <div className="flex flex-col gap-6 text-pretty leading-relaxed text-foreground/90">
            <p className="text-lg">
              Finding the right puppy is one of the most rewarding decisions a family can make. At Potty Registered
              Puppies, we are here to help UK families make that decision with confidence, knowledge, and care.
            </p>
            <h2 className="mt-2 text-2xl text-forest-deep">Where to begin</h2>
            <p>
              A thoughtful decision starts with honest reflection about your household, daily routine, and the years
              ahead. Consider space, activity levels, time for training, and who will share the responsibility of care.
            </p>
            <p>
              Matching a puppy to your lifestyle is far more important than choosing based on appearance alone. The
              right fit leads to a calmer, happier home for both you and your companion.
            </p>
            <h2 className="mt-2 text-2xl text-forest-deep">What to look for</h2>
            <p>
              Prioritise wellbeing and transparency. Meeting a puppy in a clean, caring environment, asking about
              health records, and taking time before committing all support a confident, informed choice.
            </p>
            <blockquote className="border-l-2 border-accent pl-5 font-serif text-xl italic text-forest-deep">
              A good match is never rushed. Take the time to meet, ask questions, and be sure.
            </blockquote>
            <p>
              When you are ready, our team is here to help you arrange a viewing and answer any remaining questions,
              with no obligation.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6 text-center md:p-8">
            <p className="font-serif text-xl text-forest-deep">Ready to find your companion?</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Browse puppies available in the UK or send us an enquiry. We&apos;re happy to guide you at your own pace.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <CtaLink href="/puppies">Browse puppies</CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Contact us
              </CtaLink>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-2xl text-forest-deep md:text-3xl">More from the guide</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
