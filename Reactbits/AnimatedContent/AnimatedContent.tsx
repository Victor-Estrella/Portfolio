import type { ReactNode } from 'react'

import ScrollTilt from '@/components/motion/ScrollTilt'

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  /** atraso em segundos (vira um pequeno atraso no progresso do scroll) */
  delay?: number
  duration?: number
  className?: string
}

/**
 * Mantém a API original do AnimatedContent, mas a entrada agora é guiada pelo
 * scroll (inclinação 3D + mola), no mesmo idioma da história do Hero.
 */
export default function AnimatedContent({ children, distance = 40, delay = 0, className = '' }: AnimatedContentProps) {
  return (
    <ScrollTilt className={className} distance={distance * 1.6} lag={Math.min(0.3, delay)}>
      {children}
    </ScrollTilt>
  )
}
