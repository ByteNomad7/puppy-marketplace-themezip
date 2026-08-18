"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { breeds } from "@/lib/data"

// Note: listings carry no location data, so no location filter is offered.
// Price filtering lives in the listing browser once real ranges are needed.

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-background px-3.5 text-[0.95rem] text-foreground outline-none transition-colors focus:border-primary/40 focus:ring-3 focus:ring-ring/20"

export function SearchModule({ className }: { className?: string }) {
  const router = useRouter()
  const [breedSlug, setBreedSlug] = useState("")

  return (
    <form
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-md md:flex-row md:items-end ${className ?? ""}`}
      onSubmit={(e) => {
        e.preventDefault()
        router.push(breedSlug ? `/breeds/${breedSlug}` : "/puppies")
      }}
    >
      <Field label="Breed">
        <select
          className={selectClass}
          value={breedSlug}
          onChange={(e) => setBreedSlug(e.target.value)}
        >
          <option value="">Any breed</option>
          {breeds.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </Field>
      <button
        type="submit"
        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md md:w-auto"
      >
        <Search className="size-4" />
        Search Puppies
      </button>
    </form>
  )
}
