import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Breed } from "@/lib/data"

export function BreedCard({
  breed,
  className,
}: {
  breed: Breed
  className?: string
}) {
  return (
    <Link
      href={`/breeds/${breed.slug}`}
      className={`group zoom-parent relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow duration-300 hover:shadow-md ${className ?? ""}`}
    >
      <Image
        src={breed.image || "/placeholder.svg"}
        alt={`${breed.name}`}
        fill
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 20vw"
        className="zoom-img object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
      <div className="relative flex items-end justify-between gap-2 p-4">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary-foreground/70">
            {breed.group}
          </p>
          <h3 className="mt-0.5 font-serif text-lg font-medium text-primary-foreground">
            {breed.name}
          </h3>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
