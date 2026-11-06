import type { CSSProperties, ReactNode } from 'react'
import { cubicBezier, motion, useTransform, type MotionValue } from 'motion/react'

import { cn } from '@/lib/utils'

const ease = cubicBezier(0.65, 0, 0.35, 1)

type Key = 'x' | 'y' | 'z' | 'rotate' | 'rotateX' | 'rotateY' | 'scale' | 'opacity'
export type Track = Partial<Record<Key, number[]>>

function useTrack(p: MotionValue<number>, at: number[], values: number[] | undefined, fallback: number) {
  return useTransform(p, at, values ?? at.map(() => fallback), { ease })
}

interface PartProps {
  /** progresso da história (0 → 1) */
  p: MotionValue<number>
  /** pontos de progresso dos keyframes */
  at: number[]
  /** valores por propriedade, um para cada ponto de `at` */
  track: Track
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Peça da coreografia: posição/rotação/opacidade interpoladas pelo progresso
 * do scroll. Mantém `preserve-3d` para que peças aninhadas herdem a profundidade.
 */
export default function Part({ p, at, track, className, style, children }: PartProps) {
  const x = useTrack(p, at, track.x, 0)
  const y = useTrack(p, at, track.y, 0)
  const z = useTrack(p, at, track.z, 0)
  const rotate = useTrack(p, at, track.rotate, 0)
  const rotateX = useTrack(p, at, track.rotateX, 0)
  const rotateY = useTrack(p, at, track.rotateY, 0)
  const scale = useTrack(p, at, track.scale, 1)
  const opacity = useTrack(p, at, track.opacity, 1)

  return (
    <motion.div
      className={cn('absolute [transform-style:preserve-3d] will-change-transform', className)}
      style={{ x, y, z, rotate, rotateX, rotateY, scale, opacity, ...style }}
    >
      {children}
    </motion.div>
  )
}
