"use client"

import type React from "react"

import { useState } from "react"

export function EnquiryForm({ puppyName }: { puppyName?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)
    const encodedFormData = new URLSearchParams()
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        encodedFormData.append(key, value)
      }
    })

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedFormData.toString(),
      })

      if (!response.ok) {
        throw new Error("The enquiry could not be sent.")
      }

      setSubmitted(true)
    } catch {
      setError("We couldn’t send your enquiry just now. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sage bg-sage/30 p-6 text-center">
        <p className="font-serif text-xl text-forest-deep">Thank you</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {"Your enquiry has been sent"}
          {puppyName ? ` about ${puppyName}` : ""}. We&apos;ll review the details and get back to you using the information you provided.
        </p>
      </div>
    )
  }

  return (
    <form
      name="puppy-enquiry"
      method="POST"
      action="/__forms.html"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="puppy-enquiry" />
      <input type="hidden" name="puppy" value={puppyName || "General enquiry"} />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
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
        <input type="checkbox" name="consent" value="agreed" required className="mt-0.5 h-4 w-4 accent-primary" />
        <span>
          I understand this is an enquiry and that I should make appropriate checks before making any commitment.
        </span>
      </label>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  )
}
