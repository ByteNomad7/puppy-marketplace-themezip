import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        gold: "bg-accent text-accent-foreground hover:brightness-105 shadow-sm hover:shadow-md",
        outline:
          "border border-primary/25 bg-transparent text-primary hover:bg-primary/5",
        light:
          "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
        ghostLight:
          "border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10",
      },
      size: {
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-[3.125rem] px-7 text-base",
        sm: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type CtaProps = {
  href: string
  className?: string
  children: React.ReactNode
} & VariantProps<typeof ctaVariants>

export function CtaLink({ href, className, variant, size, children }: CtaProps) {
  return (
    <Link href={href} className={cn(ctaVariants({ variant, size, className }))}>
      {children}
    </Link>
  )
}

export { ctaVariants }
