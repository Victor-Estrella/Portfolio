import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useTransform } from 'motion/react'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface ScrollTiltProps {
  children: ReactNode
  className?: string
  /** deslocamento vertical inicial (px) */
  distance?: number
  /** inclinação inicial (graus) */
  tilt?: number
  /** atraso relativo (0–0.3): a peça começa um pouco depois das vizinhas */
  lag?: number
}

/**
 * Entrada guiada pelo scroll, no mesmo idioma da história do Hero: o bloco sobe
 * "deitado" e se endireita conforme entra na tela — e volta se a pessoa rolar
 * para cima. O progresso passa por uma mola, como na história.
 */
export default function ScrollTilt({ children, className, distance = 80, tilt = 16, lag = 0 }: ScrollTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const p = useSmoothScroll(ref, ['start end', 'start 0.6'])

  const range = [lag, 1]
  const y = useTransform(p, range, [distance, 0])
  const rotateX = useTransform(p, range, [tilt, 0])
  const scale = useTransform(p, range, [0.95, 1])
  const opacity = useTransform(p, [lag, lag + (1 - lag) * 0.55], [0, 1])

  if (reduce)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div className="h-full" style={{ y, rotateX, scale, opacity, transformOrigin: '50% 100%' }}>
        {children}
      </motion.div>
    </div>
  )
}
