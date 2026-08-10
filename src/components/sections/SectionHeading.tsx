import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-1 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
        <span className="size-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>

      <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-balance min-[420px]:text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground text-pretty sm:text-base',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}

      <span className="mt-1 h-px w-24 bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]" />
    </motion.div>
  )
}
