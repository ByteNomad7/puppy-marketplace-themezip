import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import { CtaLink } from "@/components/cta-link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/50">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20 lg:px-8">
        <div className="max-w-xl">
          <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Find the right puppy for your family
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            Browse listed puppies, learn about each breed, and send an enquiry
            with confidence. Thoughtful guidance every step of the way.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/puppies" variant="primary" size="lg">
              Find a Puppy
            </CtaLink>
            <CtaLink href="/#how-it-works" variant="outline" size="lg">
              How It Works
            </CtaLink>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-lg sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="/puppies/hero.png"
              alt="A family gently holding a golden retriever puppy at home"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
