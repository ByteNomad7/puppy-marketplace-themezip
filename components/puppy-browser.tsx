"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal, X, Check } from "lucide-react"
import { PuppyCard } from "@/components/puppy-card"
import { puppies, breeds, type Puppy } from "@/lib/data"
import { cn } from "@/lib/utils"

const statuses: Puppy["status"][] = ["Available", "Reserved", "Coming Soon"]
const sexes: Puppy["sex"][] = ["Male", "Female"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "age-asc", label: "Youngest first" },
]

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left text-sm text-foreground transition-colors hover:text-primary"
    >
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-md border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background",
        )}
      >
        {checked && <Check className="size-3.5" />}
      </span>
      {label}
    </button>
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border pb-5">
      <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export function PuppyBrowser() {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedSexes, setSelectedSexes] = useState<string[]>([])
  const [sort, setSort] = useState("featured")
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    const result = puppies.filter((p) => {
      if (selectedBreeds.length && !selectedBreeds.includes(p.breedSlug)) return false
      if (selectedStatuses.length && !selectedStatuses.includes(p.status)) return false
      if (selectedSexes.length && !selectedSexes.includes(p.sex)) return false
      return true
    })
    const priceOf = (p: Puppy) => p.price ?? Number.MAX_SAFE_INTEGER
    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => priceOf(a) - priceOf(b))
      case "price-desc":
        return [...result].sort((a, b) => priceOf(b) - priceOf(a))
      case "age-asc":
        return [...result].sort((a, b) => a.ageWeeks - b.ageWeeks)
      default:
        return result
    }
  }, [selectedBreeds, selectedStatuses, selectedSexes, sort])

  const activeCount =
    selectedBreeds.length + selectedStatuses.length + selectedSexes.length

  const filters = (
    <div className="flex flex-col gap-5">
      <FilterGroup title="Breed">
        {breeds.map((b) => (
          <CheckItem
            key={b.slug}
            label={b.name}
            checked={selectedBreeds.includes(b.slug)}
            onToggle={() => toggle(b.slug, selectedBreeds, setSelectedBreeds)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Availability">
        {statuses.map((s) => (
          <CheckItem
            key={s}
            label={s}
            checked={selectedStatuses.includes(s)}
            onToggle={() => toggle(s, selectedStatuses, setSelectedStatuses)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Sex">
        {sexes.map((s) => (
          <CheckItem
            key={s}
            label={s}
            checked={selectedSexes.includes(s)}
            onToggle={() => toggle(s, selectedSexes, setSelectedSexes)}
          />
        ))}
      </FilterGroup>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setSelectedBreeds([])
            setSelectedStatuses([])
            setSelectedSexes([])
          }}
          className="self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h2 className="mb-5 font-serif text-xl font-medium text-foreground">
            Filters
          </h2>
          {filters}
        </div>
      </aside>

      <div>
        {/* Controls row */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeCount}
              </span>
            )}
          </button>
          <p className="hidden text-sm text-muted-foreground lg:block">
            Showing <span className="font-medium text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "puppy" : "puppies"}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground outline-none focus:border-primary/40 focus:ring-3 focus:ring-ring/20"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((puppy) => (
              <PuppyCard key={puppy.slug} puppy={puppy} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-foreground">No puppies match your filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting or clearing your selections.
            </p>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-forest-deep/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif text-lg font-medium">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filters}</div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground"
              >
                Show {filtered.length} {filtered.length === 1 ? "puppy" : "puppies"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
