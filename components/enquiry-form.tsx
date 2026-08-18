"use client"

import type React from "react"

import { useState } from "react"

export function EnquiryForm({ puppyName }: { puppyName?: string }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sage bg-sage/30 p-6 text-center">
        <p className="font-serif text-xl text-forest-deep">Thank you</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {"We've received your enquiry"}
          {puppyName ? ` about ${puppyName}` : ""}. A member of our team will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={
            puppyName ? `Hi, I'd love to learn more about ${puppyName}. Could we arrange a meeting?` : undefined
          }
          className="resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm leading-relaxed outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
        />
      </div>
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-primary" />
        <span>
          I understand Meadowbrook facilitates introductions and that a meeting and health check take place before any
          adoption is confirmed.
        </span>
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        Send enquiry
      </button>
    </form>
  )
}
