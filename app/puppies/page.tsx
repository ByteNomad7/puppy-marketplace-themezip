import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb } from "@/components/breadcrumb"
import { PuppyBrowser } from "@/components/puppy-browser"

export const metadata: Metadata = {
  title: "Available Puppies | Meadowbrook Puppies",
  description:
    "Browse available puppies by breed, location, and price. Filter and sort to find the right match for your family.",
}

export default function PuppiesPage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Puppies" }]} />
          <h1 className="mt-4 text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            Available Puppies
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Explore well-raised puppies currently listed on our marketplace. Use
            the filters to narrow by breed, availability, and more.
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
