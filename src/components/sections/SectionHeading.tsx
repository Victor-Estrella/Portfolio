import type { ReactNode } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** número da seção, exibido no eyebrow (ex.: "02") */
  index?: string
  eyebrow: string
  title: ReactNode
  description?: string
  className?: string
  align?: 'center' | 'left'
  /** conteúdo extra à direita do título (desktop) */
  aside?: ReactNode
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  aside,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-4', centered && 'items-center')}>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
          {index && <span className="text-muted-foreground">{index}</span>}
          <span className="h-px w-8 bg-primary/60" aria-hidden />
          {eyebrow}
        </span>

        <h2 className="font-display text-[1.75rem] leading-[1.1] font-bold tracking-tight text-balance min-[420px]:text-3xl sm:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>

        {description && (
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground text-pretty sm:text-base">
            {description}
          </p>
        )}
      </div>

      {aside && <div className="shrink-0">{aside}</div>}
    </motion.div>
  )
}
