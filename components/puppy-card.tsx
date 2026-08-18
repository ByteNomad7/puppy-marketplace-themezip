import Link from "next/link"
import Image from "next/image"
import { StatusBadge } from "@/components/status-badge"
import { formatPrice, type Puppy } from "@/lib/data"

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link
        href={`/puppies/${puppy.slug}`}
        className="zoom-parent relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={puppy.image || "/placeholder.svg"}
          alt={`${puppy.name}, a ${puppy.breed} puppy`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="zoom-img object-cover"
        />
        <StatusBadge
          status={puppy.status}
          className="absolute left-3 top-3 bg-background/90 backdrop-blur-sm"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              {puppy.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{puppy.breed}</p>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {puppy.sex}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          {puppy.colour && <span>{puppy.colour}</span>}
          {puppy.colour && <span aria-hidden="true" className="mx-1 text-border">•</span>}
          <span>{puppy.ageWeeks} wks</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-serif text-lg font-medium text-primary">
            {formatPrice(puppy.price)}
          </span>
          <Link
            href={`/puppies/${puppy.slug}`}
            className="text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-accent-foreground hover:underline"
          >
            View Puppy
          </Link>
        </div>
      </div>
    </article>
  )
}
