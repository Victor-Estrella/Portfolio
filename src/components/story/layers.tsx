/**
 * Camadas da "Anatomia de uma interface". Empilhadas sem espaço entre si formam
 * uma tela só; separadas em profundidade mostram como a interface é construída.
 * Plano de cada camada: 560 × 360 px.
 */
import type { CSSProperties, ReactNode } from 'react'

import { BLUE, INK, PAPER, SKY, VIOLET } from './palette'

const line = (w: number, color = '#c9c6bd', h = 8) => (
  <span className="block rounded-full" style={{ width: w, height: h, background: color }} />
)

/** Etiqueta de código da camada (fica de frente para a câmera) */
export function LayerTag({ index, label, tag }: { index: number; label: string; tag: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-2.5 whitespace-nowrap"
      style={{ background: PAPER, border: `2.5px solid ${INK}`, boxShadow: `5px 6px 0 ${INK}` }}
    >
      <span className="font-mono text-[15px] font-bold" style={{ color: BLUE }}>
        0{index + 1}
      </span>
      <span className="font-display text-[19px] font-bold" style={{ color: INK }}>
        {label}
      </span>
      <span className="rounded-md px-2 py-0.5 font-mono text-[14px]" style={{ background: INK, color: SKY }}>
        {tag}
      </span>
    </div>
  )
}

/* 01 — Layout: base, colunas do grid e margens */
export function LayerLayout() {
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ background: PAPER, border: `2.5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 10px 0 ${INK}` }}
    >
      <div className="absolute inset-x-5 inset-y-0 grid grid-cols-12 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ background: `${BLUE}12`, borderLeft: `1.5px dashed ${BLUE}55`, borderRight: `1.5px dashed ${BLUE}55` }} />
        ))}
      </div>
      <span className="absolute inset-x-0 top-[58px]" style={{ borderTop: `1.5px dashed ${BLUE}66` }} />
      <span className="absolute inset-x-0 top-[250px]" style={{ borderTop: `1.5px dashed ${BLUE}66` }} />
    </div>
  )
}

/* 02 — Componentes: navbar, moldura da imagem e cards */
export function LayerComponents() {
  const box = (style: CSSProperties, children?: ReactNode) => (
    <div className="absolute rounded-xl" style={{ border: `2.5px solid ${INK}`, background: PAPER, ...style }}>
      {children}
    </div>
  )
  return (
    <div className="relative size-full">
      {box({ top: 14, left: 18, width: 524, height: 34, borderRadius: 999 })}
      {box({ top: 72, left: 300, width: 240, height: 168, borderRadius: 16, background: '#dbe7ff' })}
      {[0, 1, 2].map((i) => (
        <div key={i}>{box({ top: 268, left: 18 + i * 178, width: 166, height: 72 })}</div>
      ))}
    </div>
  )
}

/* 03 — Conteúdo: título, texto, imagem e conteúdo dos cards */
export function LayerContent() {
  return (
    <div className="relative size-full">
      <div className="absolute top-[22px] left-[36px] flex items-center gap-2">
        <span className="size-3 rounded-full" style={{ background: BLUE }} />
        {line(70, INK, 7)}
      </div>
      <div className="absolute top-[22px] right-[110px] flex gap-3">
        {line(36, '#4b5563', 6)}
        {line(36, '#4b5563', 6)}
        {line(36, '#4b5563', 6)}
      </div>

      <div className="absolute top-[80px] left-[28px]">
        <p className="font-display text-[34px] leading-[1] font-bold tracking-tight" style={{ color: INK }}>
          Seu produto,
        </p>
        <p className="font-serif text-[36px] leading-[1.1] italic" style={{ color: BLUE }}>
          na tela.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {line(220)}
          {line(180)}
        </div>
      </div>

      <div className="absolute top-[74px] left-[302px] h-[164px] w-[236px] overflow-hidden rounded-[14px]" style={{ background: `linear-gradient(140deg, ${BLUE}, ${VIOLET})` }}>
        <span className="absolute top-6 right-8 size-12 rounded-full" style={{ background: SKY, border: `2.5px solid ${INK}` }} />
        <span className="absolute -bottom-12 -left-4 h-28 w-[130%] rounded-[50%]" style={{ background: PAPER, opacity: 0.85 }} />
      </div>

      {[INK, BLUE, INK].map((dot, i) => (
        <div key={i} className="absolute flex items-center gap-3" style={{ top: 292, left: 34 + i * 178 }}>
          <span className="size-6 rounded-lg" style={{ background: dot }} />
          <span className="flex flex-col gap-1.5">
            {line(80, '#6b7280', 7)}
            {line(54, '#c9c6bd', 7)}
          </span>
        </div>
      ))}
    </div>
  )
}

/* 04 — Interação: botão com foco, cursor e um toggle */
export function LayerInteraction() {
  return (
    <div className="relative size-full">
      <div
        className="absolute top-[198px] left-[22px] rounded-full p-[5px]"
        style={{ border: `2.5px dashed ${SKY}` }}
      >
        <span className="block rounded-full px-5 py-2.5 font-display text-[15px] font-bold" style={{ background: INK, color: PAPER }}>
          Fale comigo
        </span>
      </div>
      <svg className="absolute top-[222px] left-[132px]" width="34" height="40" viewBox="0 0 34 40" aria-hidden>
        <path d="M3 3 L3 33 L11 25 L17 37 L23 34 L17 22 L28 22 Z" fill={PAPER} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="absolute top-[20px] right-[30px] flex h-[22px] w-[42px] items-center rounded-full px-[3px]" style={{ background: BLUE, border: `2px solid ${INK}` }}>
        <span className="ml-auto size-[14px] rounded-full" style={{ background: PAPER }} />
      </div>
    </div>
  )
}

/* 05 — Dados: resposta da API alimentando a interface */
export function LayerData() {
  return (
    <div className="relative size-full">
      <div
        className="absolute top-[96px] left-[330px] flex items-center gap-2 rounded-xl px-3 py-2"
        style={{ background: INK, border: `2px solid ${PAPER}`, boxShadow: `5px 6px 0 ${INK}` }}
      >
        <span className="rounded px-1.5 py-0.5 font-mono text-[12px] font-bold" style={{ background: '#28c840', color: INK }}>
          200
        </span>
        <span className="font-mono text-[13px]" style={{ color: '#e9e7e1' }}>
          GET /api/projects
        </span>
      </div>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full font-mono text-[11px] font-bold"
          style={{ top: 258, left: 150 + i * 178, padding: '2px 8px', background: SKY, color: INK, border: `2px solid ${INK}` }}
        >
          {['json', 'json', 'json'][i]}
        </span>
      ))}
    </div>
  )
}
