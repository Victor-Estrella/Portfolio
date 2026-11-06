import { useRef, type ReactNode } from 'react'
import { motion, useTransform } from 'motion/react'

import { cn } from '@/lib/utils'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1] as const

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
  const ref = useRef<HTMLDivElement>(null)
  const progress = useSmoothScroll(ref, ['start end', 'end start'])
  const numeralY = useTransform(progress, [0, 1], [90, -90])
  const numeralX = useTransform(progress, [0, 1], [-30, 30])

  return (
    <motion.div
      ref={ref}
      // O contêiner dispara a animação (o título começa recortado e não seria "visto")
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      className={cn(
        'relative isolate flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      {/* número gigante vazado, com parallax — mesma numeração da trilha lateral */}
      {index && (
        <motion.span
          aria-hidden
          style={{ y: numeralY, x: numeralX }}
          className={cn(
            'pointer-events-none absolute -top-24 -z-10 font-display text-[9rem] leading-none font-bold tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--border)] sm:text-[13rem] lg:text-[16rem]',
            centered ? 'left-1/2 -translate-x-1/2' : 'right-0'
          )}
        >
          {index}
        </motion.span>
      )}

      <div className={cn('flex max-w-3xl flex-col gap-4', centered && 'items-center')}>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
          {index && <span className="text-muted-foreground">{index}</span>}
          <motion.span
            className="h-px w-8 origin-left bg-primary/60"
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.8, delay: 0.2, ease: EASE } },
            }}
            aria-hidden
          />
          {eyebrow}
        </span>

        {/* título sobe de dentro de uma máscara, como uma linha sendo "revelada" */}
        <motion.h2
          variants={{
            hidden: { clipPath: 'inset(0% 0% 100% 0%)', y: 36 },
            show: { clipPath: 'inset(-10% -5% -25% -5%)', y: 0, transition: { duration: 0.9, delay: 0.08, ease: EASE } },
          }}
          className="font-display text-[1.75rem] leading-[1.1] font-bold tracking-tight text-balance min-[420px]:text-3xl sm:text-4xl lg:text-[2.85rem]"
        >
          {title}
        </motion.h2>

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
