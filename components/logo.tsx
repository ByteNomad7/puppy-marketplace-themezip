import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  tone = "default",
}: {
  className?: string
  tone?: "default" | "light"
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Meadowbrook Puppies home"
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          tone === "light" ? "bg-primary-foreground/15" : "bg-primary/10",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "size-5",
            tone === "light" ? "text-primary-foreground" : "text-primary",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3 6 11h3l-4 6h5v4h4v-4h5l-4-6h3z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-medium tracking-tight",
            tone === "light" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          Meadowbrook
        </span>
        <span
          className={cn(
            "text-[0.68rem] font-medium uppercase tracking-[0.18em]",
            tone === "light" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          Puppies
        </span>
      </span>
    </Link>
  )
}
