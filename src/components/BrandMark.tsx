import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

interface BrandMarkProps {
  name: string
  monogram: string
  /** logo oficial — quando existe, substitui o monograma */
  logo?: string
  /** matiz do monograma; sem ele usa as cores do tema */
  hue?: number
  className?: string
}

/**
 * Identidade visual compacta de um produto/projeto.
 * Mostra a logo oficial quando disponível; caso contrário, um monograma
 * neutro (apenas decorativo, sem imitar a marca real).
 */
export default function BrandMark({ name, monogram, logo, hue, className }: BrandMarkProps) {
  if (logo) {
    return (
      <span
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-black shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_8px_20px_-12px_rgb(0_0_0/0.6)]',
          className
        )}
      >
        <img src={logo} alt={`Logo ${name}`} loading="lazy" decoding="async" className="size-full object-cover" />
      </span>
    )
  }

  const style =
    hue === undefined
      ? undefined
      : ({
          '--mark-a': `oklch(0.72 0.14 ${hue})`,
          '--mark-b': `oklch(0.55 0.17 ${(hue + 40) % 360})`,
        } as CSSProperties)

  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden rounded-2xl font-display font-bold text-white',
        'bg-[linear-gradient(135deg,var(--mark-a,var(--primary)),var(--mark-b,var(--accent)))]',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_20px_-10px_var(--mark-b,var(--accent))]',
        className
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
      <span className="relative">{monogram}</span>
    </span>
  )
}
