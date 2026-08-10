import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  delay?: number
  initialOpacity?: number
  scale?: number
  blur?: number
  threshold?: number
  className?: string
}

export default function AnimatedContent({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  duration = 0.7,
  delay = 0,
  initialOpacity = 0,
  scale = 1,
  blur = 0,
  threshold = 0.15,
  className = '',
}: AnimatedContentProps) {
  const axis = direction === 'horizontal' ? 'x' : 'y'
  const offset = reverse ? -distance : distance

  return (
    <motion.div
      className={className}
      initial={{
        [axis]: offset,
        opacity: initialOpacity,
        scale,
        filter: blur ? `blur(${blur}px)` : 'blur(0px)',
      }}
      whileInView={{ [axis]: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
