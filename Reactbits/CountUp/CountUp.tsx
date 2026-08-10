import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

interface CountUpProps {
  to: number
  from?: number
  direction?: 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  onStart?: () => void
  onEnd?: () => void
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? to : from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)

  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === 'down' ? to : from)
    }
  }, [from, to, direction])

  useEffect(() => {
    if (!isInView || !startWhen) return

    onStart?.()

    const timeoutId = setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to)
    }, delay * 1000)

    const durationTimeoutId = setTimeout(
      () => {
        onEnd?.()
      },
      delay * 1000 + duration * 1000
    )

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(durationTimeoutId)
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (!ref.current) return
      const hasDecimals = !Number.isInteger(to) || !Number.isInteger(from)
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? 1 : 0,
        maximumFractionDigits: hasDecimals ? 1 : 0,
      }
      const formatted = Intl.NumberFormat('pt-BR', options).format(Number(latest.toFixed(1)))
      ref.current.textContent = separator ? formatted.replace(/\./g, separator) : formatted
    })

    return () => unsubscribe()
  }, [springValue, separator, to, from])

  return <span className={className} ref={ref} />
}
