import { HeartPulse, Compass, Lock, LifeBuoy } from "lucide-react"

const items = [
  {
    icon: HeartPulse,
    title: "Health information",
    description: "Clear details on wellbeing and early care.",
  },
  {
    icon: Compass,
    title: "Buyer guidance",
    description: "Educational guides to help you decide.",
  },
  {
    icon: Lock,
    title: "Secure enquiries",
    description: "Reach out safely through our platform.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Help throughout your journey.",
  },
]

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-x-8 gap-y-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/40 text-sage-foreground">
              <item.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
