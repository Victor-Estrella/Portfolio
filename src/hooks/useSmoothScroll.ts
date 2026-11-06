import { useEffect, type RefObject } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll, useSpring, type SpringOptions, type UseScrollOptions } from 'motion/react'

type Offset = NonNullable<UseScrollOptions['offset']>

const DEFAULT_SPRING: SpringOptions = { stiffness: 120, damping: 24, mass: 0.5, restDelta: 0.0005 }

/**
 * Progresso de scroll (0 → 1) de um elemento, suavizado por uma mola.
 *
 * O valor passa por um MotionValue comum antes da mola: assim o Motion não tenta
 * acelerar a animação com a ScrollTimeline nativa (que ignora o `offset`).
 */
export function useSmoothScroll(target: RefObject<HTMLElement | null>, offset: Offset, spring: SpringOptions = DEFAULT_SPRING) {
  const { scrollYProgress } = useScroll({ target, offset })
  const raw = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => raw.set(v))
  useEffect(() => raw.set(scrollYProgress.get()), [raw, scrollYProgress])
  return useSpring(raw, spring)
}
