import Link from "next/link"
import Image from "next/image"
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
      className={cn(
        "inline-flex shrink-0 items-center",
        tone === "light" && "rounded-lg bg-[#f5f1e7] px-3 py-2",
        className,
      )}
      aria-label="Potty Registered Puppies home"
    >
      <Image
        src="/potty-registered-puppies-logo.png"
        alt="Potty Registered Puppies"
        width={1453}
        height={371}
        priority={tone === "default"}
        sizes={tone === "light" ? "220px" : "(min-width: 640px) 200px, 165px"}
        className={cn(
          "h-auto",
          tone === "light" ? "w-[220px]" : "w-[165px] sm:w-[200px]",
        )}
      />
    </Link>
  )
}
