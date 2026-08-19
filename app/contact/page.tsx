import type { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"
import { ContactForm } from "@/components/contact-form"
import { CtaLink } from "@/components/cta-link"
import { PageShell } from "@/components/page-shell"
import { CONTACT_EMAIL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact Potty Registered Puppies | UK Puppy Enquiries",
  description:
    "Send Potty Registered Puppies an enquiry about a puppy, breed, viewing, or the puppy-buying process. We are here to help UK families ask the right questions.",
  alternates: {
    canonical: "https://www.pottyregisteredpuppies.com/contact",
  },
  openGraph: {
    title: "Contact Potty Registered Puppies | UK Puppy Enquiries",
    description:
      "Send an enquiry about a puppy, breed, viewing, or the puppy-buying process.",
    url: "https://www.pottyregisteredpuppies.com/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">Get in touch</span>
            <h1 className="mt-3 text-pretty text-4xl leading-tight text-forest-deep md:text-5xl">
              How can we help?
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Ask us about a puppy, a breed, arranging a viewing, or anything you would like to understand before
              making a decision.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-secondary/50 p-6">
              <h2 className="font-serif text-xl text-forest-deep">A considered conversation</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Share as much or as little as you like. The more you tell us about what you are looking for, the more
                useful our response can be.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/puppies" variant="outline" size="sm">
                Browse puppies
              </CtaLink>
              <CtaLink href="/guides" variant="outline" size="sm">
                Read buyer guides
              </CtaLink>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="mb-7">
              <h2 className="text-2xl text-forest-deep md:text-3xl">Send an enquiry</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Use the form below for a puppy enquiry or a general question. Please do not include sensitive
                personal information in your message.
              </p>
            </div>
            <ContactForm />
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              By sending this form, you agree that Potty Registered Puppies may use the details you provide to
              respond to your enquiry.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}