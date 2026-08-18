"use client"

import { Search } from "lucide-react"
import { breeds } from "@/lib/data"

const locations = ["Any location", "Portland, OR", "Austin, TX", "Denver, CO", "Seattle, WA", "Boise, ID", "Madison, WI"]
const priceRanges = ["Any price", "Under $2,000", "$2,000 – $2,500", "$2,500 – $3,000", "$3,000+"]

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
  return (
    <form
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-md md:flex-row md:items-end ${className ?? ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <Field label="Breed">
        <select className={selectClass} defaultValue="">
          <option value="">Any breed</option>
          {breeds.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Location">
        <select className={selectClass} defaultValue="Any location">
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </Field>
      <Field label="Price range">
        <select className={selectClass} defaultValue="Any price">
          {priceRanges.map((p) => (
            <option key={p}>{p}</option>
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
