"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function PuppyGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)
  const gallery = images.length ? images : ["/placeholder.svg"]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={gallery[active] || "/placeholder.svg"}
          alt={`${name} photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-3">
          {gallery.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-xl border transition-all sm:w-24",
                active === i
                  ? "border-primary ring-2 ring-primary/25"
                  : "border-border opacity-80 hover:opacity-100",
              )}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
