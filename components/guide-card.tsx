import Link from "next/link"
import Image from "next/image"
import type { Guide } from "@/lib/data"

export function GuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link
        href={`/guides/${guide.slug}`}
        className={`zoom-parent relative block overflow-hidden ${featured ? "aspect-[16/11]" : "aspect-[16/10]"}`}
      >
        <Image
          src={guide.image || "/placeholder.svg"}
          alt={guide.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          className="zoom-img object-cover"
        />
      </Link>
      <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-8" : "p-5"}`}>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wide text-accent-foreground">
            {guide.category}
          </span>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span className="text-muted-foreground">{guide.readTime}</span>
        </div>
        <h3
          className={`mt-2.5 font-serif font-medium leading-snug text-foreground ${
            featured ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          <Link
            href={`/guides/${guide.slug}`}
            className="transition-colors hover:text-primary"
          >
            {guide.title}
          </Link>
        </h3>
        <p className={`mt-2 leading-relaxed text-muted-foreground ${featured ? "text-base" : "text-sm"}`}>
          {guide.excerpt}
        </p>
      </div>
    </article>
  )
}
