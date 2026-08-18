"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { CtaLink } from "@/components/cta-link"
import { navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search puppies"
            aria-expanded={searchOpen}
            className="flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
          >
            <Search className="size-5" />
          </button>

          <div className="hidden lg:block">
            <CtaLink href="/puppies" variant="primary" size="sm">
              Find a Puppy
            </CtaLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-primary lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Inline search bar */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-secondary/60 transition-all duration-300",
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Search className="size-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by breed, location, or name"
            className="h-11 w-full rounded-full border border-border bg-background px-5 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-3 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 px-1">
            <CtaLink href="/puppies" variant="primary" size="md" className="w-full">
              Find a Puppy
            </CtaLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
