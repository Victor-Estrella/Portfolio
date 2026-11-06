/**
 * Peças ilustradas da história "Do código à tela" — estilo traço grosso +
 * sombra sólida deslocada (dá espessura sem 3D real). Cores fixas: a história
 * tem a própria paleta, igual nos temas claro e escuro.
 */
import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { C, CODE_LINES, INK, PAPER, SKY, VIOLET } from './palette'

/** Superfície ilustrada: contorno de tinta + sombra sólida (espessura) */
export function Ink({
  className,
  style,
  depth = 7,
  radius = 18,
  dark = false,
  children,
}: {
  className?: string
  style?: CSSProperties
  depth?: number
  radius?: number
  dark?: boolean
  children?: ReactNode
}) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        background: dark ? INK : PAPER,
        border: `2.5px solid ${dark ? PAPER : INK}`,
        borderRadius: radius,
        boxShadow: `${depth}px ${depth + 2}px 0 ${INK}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Código                                                             */
/* ------------------------------------------------------------------ */

export function CodeLine({ tokens, n }: { tokens: [string, string][]; n: number }) {
  return (
    <div className="flex h-[34px] items-center font-mono text-[19px] whitespace-pre">
      <span className="w-12 shrink-0 pr-4 text-right" style={{ color: C.dim }}>
        {n}
      </span>
      {tokens.map(([text, color], i) => (
        <span key={i} style={{ color }}>
          {text}
        </span>
      ))}
    </div>
  )
}

export function EditorChrome() {
  return (
    <div className="flex h-12 items-center gap-2 border-b-2 px-5" style={{ borderColor: '#262a33' }}>
      <span className="size-3.5 rounded-full" style={{ background: '#ff5f57' }} />
      <span className="size-3.5 rounded-full" style={{ background: '#febc2e' }} />
      <span className="size-3.5 rounded-full" style={{ background: '#28c840' }} />
      <span
        className="ml-4 rounded-t-lg px-4 py-1.5 font-mono text-[15px]"
        style={{ background: '#1d2029', color: C.txt }}
      >
        Portfolio.tsx
      </span>
    </div>
  )
}

/** Janela do editor completa (usada nas versões estáticas) */
export function CodeWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <Ink dark depth={9} radius={22} className={className} style={style}>
      <EditorChrome />
      <div className="px-3 py-5">
        {CODE_LINES.map((line, i) => (
          <CodeLine key={i} tokens={line} n={i + 1} />
        ))}
      </div>
    </Ink>
  )
}

const bar = (w: number, color = '#c9c6bd') => (
  <span className="block h-[9px] rounded-full" style={{ width: w, background: color }} />
)

/* ------------------------------------------------------------------ */
/*  Mobile                                                             */
/* ------------------------------------------------------------------ */

export function PhoneHeader() {
  return (
    <div>
      <div className="mx-auto mt-3 h-6 w-24 rounded-full" style={{ background: INK }} />
      <p className="mt-5 px-6 font-display text-[24px] font-bold" style={{ color: INK }}>
        Olá, Ana!
      </p>
    </div>
  )
}

export function PhoneCard() {
  return (
    <div className="relative size-full rounded-2xl p-4" style={{ background: VIOLET, border: `2.5px solid ${INK}` }}>
      <span className="absolute top-4 right-4 size-10 rounded-full" style={{ background: PAPER }} />
      <p className="absolute bottom-4 left-4 font-display text-[17px] font-bold" style={{ color: PAPER }}>
        Próxima entrega
      </p>
    </div>
  )
}

export function PhoneRow({ dot }: { dot: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-6 shrink-0 rounded-full" style={{ background: dot }} />
      <span className="flex flex-col gap-1.5">
        {bar(120, '#374151')}
        {bar(84)}
      </span>
    </div>
  )
}

export function PhoneTabBar() {
  return (
    <div className="flex h-12 items-center justify-around rounded-full px-6" style={{ background: INK }}>
      <span className="size-2.5 rounded-full" style={{ background: SKY }} />
      <span className="size-2.5 rounded-full" style={{ background: PAPER }} />
      <span className="size-2.5 rounded-full" style={{ background: PAPER }} />
    </div>
  )
}
