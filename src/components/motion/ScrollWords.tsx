import { useRef } from 'react'
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react'

import { cn } from '@/lib/utils'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface ScrollWordsProps {
  text: string
  /** palavras (sem pontuação) que ganham o destaque em serifa itálica */
  highlight?: string[]
  className?: string
}

/**
 * Texto que "acende" palavra por palavra conforme a rolagem — e apaga de volta
 * se a pessoa sobe. Usa a mesma mola da história do Hero.
 */
export default function ScrollWords({ text, highlight = [], className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const progress = useSmoothScroll(ref, ['start 0.85', 'end 0.45'])
  const words = text.split(' ')

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const accent = highlight.includes(word.replace(/[.,;:!?]/g, ''))
        return (
          <Word key={i} progress={progress} range={[start, end]} accent={accent} still={!!reduce}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  progress,
  range,
  accent,
  still,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  accent: boolean
  still: boolean
  children: string
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span
      aria-hidden
      style={still ? undefined : { opacity, y }}
      className={cn('mr-[0.28em] inline-block', accent && 'accent-serif text-[1.08em]')}
    >
      {children}
    </motion.span>
  )
}
