import { Search, BookOpen, MessageCircle, PawPrint } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const steps = [
  {
    icon: Search,
    title: "Browse Puppies",
    description:
      "Explore available puppies by breed, location, and price to find matches that fit your family.",
  },
  {
    icon: BookOpen,
    title: "Learn About the Puppy",
    description:
      "Read breed traits, temperament, and care information to understand what to expect.",
  },
  {
    icon: MessageCircle,
    title: "Send an Enquiry",
    description:
      "Reach out with your questions through a simple, secure enquiry form.",
  },
  {
    icon: PawPrint,
    title: "Arrange the Next Steps",
    description:
      "Coordinate the details and prepare to welcome your new companion home.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 scroll-mt-16">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="A calm, considered path to your new puppy"
          description="Four simple steps designed to help you make an informed and confident decision."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="font-serif text-2xl text-border">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
