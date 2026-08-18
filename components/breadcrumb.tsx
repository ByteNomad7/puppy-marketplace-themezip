import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="size-3.5 text-border" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
