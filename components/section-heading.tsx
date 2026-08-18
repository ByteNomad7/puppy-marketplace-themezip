import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  align = "left",
}: {
  eyebrow?: string
  title: string
  description?: string
  link?: { label: string; href: string }
  align?: "left" | "center"
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-3xl font-medium leading-tight text-foreground text-balance sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-accent-foreground hover:underline"
        >
          {link.label}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}
