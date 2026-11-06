import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_60%,transparent)] hover:shadow-[0_8px_30px_-8px_var(--primary)] hover:brightness-110',
        gradient:
          'text-primary-foreground bg-[linear-gradient(100deg,var(--primary),var(--accent))] bg-[length:200%_auto] hover:bg-right hover:shadow-[0_10px_40px_-12px_var(--primary)]',
        outline:
          'border border-border bg-card/60 text-foreground shadow-[var(--shadow-card)] hover:bg-card hover:border-primary/45',
        ghost: 'text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 has-[>svg]:px-4',
        sm: 'h-8 px-3.5 text-xs has-[>svg]:px-3',
        lg: 'h-12 px-7 text-base has-[>svg]:px-6',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
