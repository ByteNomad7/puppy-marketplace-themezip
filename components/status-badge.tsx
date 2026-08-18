import { cn } from "@/lib/utils"
import type { Puppy } from "@/lib/data"

const styles: Record<Puppy["status"], string> = {
  Available: "bg-primary/10 text-primary",
  Reserved: "bg-accent/25 text-accent-foreground",
  "Coming Soon": "bg-sage/40 text-sage-foreground",
}

export function StatusBadge({
  status,
  className,
}: {
  status: Puppy["status"]
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}
