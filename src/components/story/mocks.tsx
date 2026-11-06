/**
 * Peças ilustradas da história "Do código à tela" — estilo traço grosso +
 * sombra sólida deslocada (dá espessura sem 3D real). Cores fixas: a história
 * tem a própria paleta, igual nos temas claro e escuro.
 */
import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { BLUE, C, CODE_LINES, INK, PAPER, SKY, VIOLET } from './palette'

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

/* ------------------------------------------------------------------ */
/*  Web                                                                */
/* ------------------------------------------------------------------ */

const bar = (w: number, color = '#c9c6bd') => (
  <span className="block h-[9px] rounded-full" style={{ width: w, background: color }} />
)

export function BrowserBar() {
  return (
    <div className="flex h-12 items-center gap-2 px-5" style={{ borderBottom: `2.5px solid ${INK}` }}>
      <span className="size-3.5 rounded-full" style={{ background: '#f97316' }} />
      <span className="size-3.5 rounded-full" style={{ background: INK }} />
      <span className="size-3.5 rounded-full" style={{ background: INK }} />
      <span className="ml-auto flex gap-3">
        {bar(46, '#4b5563')}
        {bar(46, '#4b5563')}
        {bar(46, '#4b5563')}
      </span>
    </div>
  )
}

export function WebHeadline() {
  return (
    <div>
      <p className="font-display text-[40px] leading-[1.02] font-bold tracking-tight" style={{ color: INK }}>
        Seu produto,
      </p>
      <p className="font-serif text-[42px] leading-[1.05] italic" style={{ color: BLUE }}>
        na tela.
      </p>
      <div className="mt-5 flex flex-col gap-2.5">
        {bar(230)}
        {bar(200)}
        {bar(160)}
      </div>
      <span
        className="mt-6 inline-block rounded-full px-5 py-2.5 font-display text-[15px] font-bold text-white"
        style={{ background: INK }}
      >
        Fale comigo
      </span>
    </div>
  )
}

export function WebImage() {
  return (
    <div
      className="relative size-full overflow-hidden rounded-2xl"
      style={{ background: `linear-gradient(140deg, ${BLUE}, ${VIOLET})`, border: `2.5px solid ${INK}` }}
    >
      <span className="absolute top-8 right-9 size-16 rounded-full" style={{ background: SKY, border: `2.5px solid ${INK}` }} />
      <span className="absolute -bottom-16 -left-6 h-36 w-[130%] rounded-[50%]" style={{ background: PAPER, opacity: 0.9 }} />
    </div>
  )
}

export function WebCard({ accent }: { accent: string }) {
  return (
    <div className="flex size-full items-center gap-3 rounded-xl px-4" style={{ border: `2.5px solid ${INK}`, background: PAPER }}>
      <span className="size-7 shrink-0 rounded-lg" style={{ background: accent }} />
      <span className="flex flex-col gap-1.5">
        {bar(90, '#6b7280')}
        {bar(60)}
      </span>
    </div>
  )
}

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

/* ------------------------------------------------------------------ */
/*  API                                                                */
/* ------------------------------------------------------------------ */

export function ApiTerminal() {
  const line = (children: ReactNode) => <div className="h-[26px] font-mono text-[15px] whitespace-pre">{children}</div>
  return (
    <Ink dark depth={8} radius={18} className="size-full">
      <div className="flex h-10 items-center gap-2 px-4" style={{ borderBottom: '2px solid #262a33' }}>
        <span className="rounded-md px-2 py-0.5 font-mono text-[13px] font-bold" style={{ background: '#28c840', color: INK }}>
          GET
        </span>
        <span className="font-mono text-[14px]" style={{ color: C.txt }}>
          /api/projects
        </span>
        <span className="ml-auto font-mono text-[13px]" style={{ color: '#28c840' }}>
          200 OK
        </span>
      </div>
      <div className="px-4 py-3">
        {line(<span style={{ color: C.pun }}>{'['}</span>)}
        {line(
          <>
            <span style={{ color: C.pun }}>{'  { '}</span>
            <span style={{ color: C.attr }}>"name"</span>
            <span style={{ color: C.pun }}>: </span>
            <span style={{ color: C.str }}>"Enova"</span>
            <span style={{ color: C.pun }}>{' },'}</span>
          </>
        )}
        {line(
          <>
            <span style={{ color: C.pun }}>{'  { '}</span>
            <span style={{ color: C.attr }}>"name"</span>
            <span style={{ color: C.pun }}>: </span>
            <span style={{ color: C.str }}>"SafeHub"</span>
            <span style={{ color: C.pun }}>{' }'}</span>
          </>
        )}
        {line(<span style={{ color: C.pun }}>{']'}</span>)}
      </div>
    </Ink>
  )
}
