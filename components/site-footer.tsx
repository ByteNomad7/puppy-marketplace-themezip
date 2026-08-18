import Link from "next/link"
import { Logo } from "@/components/logo"

const columns = [
  {
    title: "Puppies",
    links: [
      { label: "All Puppies", href: "/puppies" },
      { label: "Maltipoo Puppies", href: "/breeds/maltipoo" },
      { label: "Pomeranian Puppies", href: "/breeds/pomeranian" },
      { label: "Poodle Puppies", href: "/breeds/poodle" },
      { label: "Yorkshire Terrier Puppies", href: "/breeds/yorkie" },
    ],
  },
  {
    title: "Breeds",
    links: [
      { label: "All Breeds", href: "/breeds" },
      { label: "Pomsky", href: "/breeds/pomsky" },
      { label: "Maltese", href: "/breeds/maltese" },
      { label: "Morkie", href: "/breeds/morkie" },
      { label: "Coton de Tuléar", href: "/breeds/coton-de-tulear" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Buyer Guides", href: "/guides" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Health & Care", href: "/guides/health-and-care" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Responsible Sourcing", href: "/about" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Connecting UK families with healthy, well-raised teacup and toy
              puppies. Browse with confidence and find your perfect companion.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-sm font-semibold tracking-wide text-primary-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Potty Registered Puppies. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
