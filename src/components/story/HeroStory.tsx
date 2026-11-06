import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowDown } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import HeroContent from '@/components/hero/HeroContent'
import { cn } from '@/lib/utils'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Part from './Part'
import { Ink, PhoneCard, PhoneHeader, PhoneRow, PhoneTabBar } from './mocks'
import { LayerComponents, LayerContent, LayerData, LayerInteraction, LayerLayout, LayerTag } from './layers'
import { INK, VIOLET } from './palette'
import { FINALE, K, LAYERS, focusAt, stepAt } from './storyData'

/**
 * "Anatomia de uma interface".
 *
 * O trilho tem várias alturas de tela e o palco fica preso (sticky). O progresso
 * do scroll passa por uma mola (suaviza a roda do mouse) e comanda tudo: o Hero
 * sai, a tela gira para uma vista isométrica e se separa em camadas — layout,
 * componentes, conteúdo, interação e dados —, cada uma em foco na sua vez. No fim
 * as camadas se juntam e a mesma interface aparece no app mobile.
 */

const STAGE_W = 1000
const STAGE_H = 625
const LAYER_GAP = 124
const PLANE_X = 220
const PLANE_Y = 132
const PLANE_W = 560
const PLANE_H = 360
const LAYER_VIEWS = [LayerLayout, LayerComponents, LayerContent, LayerInteraction, LayerData]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => t * t * (3 - 2 * t)

/** Palco à direita no Hero; à direita e maior durante a história */
function frame(p: number, w: number, h: number) {
  const cw = Math.min(w - 32, 1152)
  const left = (w - cw) / 2

  // a tela (560×360, em x=220 y=132 do palco) ocupa ~46% da largura no Hero
  const s0 = Math.min((cw * 0.44) / PLANE_W, (h * 0.5) / PLANE_H)
  const x0 = left + cw * 0.54 - PLANE_X * s0
  const y0 = h * 0.52 - (PLANE_Y + PLANE_H / 2) * s0

  const s1 = Math.min((cw * 0.62) / STAGE_W, (h * 0.8) / STAGE_H)
  const x1 = left + cw * 0.69 - (STAGE_W / 2) * s1
  const y1 = h * 0.58 - (PLANE_Y + PLANE_H / 2) * s1

  const t = smooth(clamp01((p - K.start) / (K.exploded - K.start)))
  return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, s: s0 + (s1 - s0) * t }
}

/** Rotação da tela: inclinada no Hero → isométrica → de frente no final */
const ISO_AT = [0, K.start, K.exploded, K.collapse, K.finale]
const ISO = {
  rotateX: [7, 7, 56, 56, 0],
  rotateY: [-14, -14, 0, 0, 0],
  rotateZ: [0, 0, -36, -36, 0],
}

export default function HeroStory() {
  const trackRef = useRef<HTMLDivElement>(null)
  // progresso do trilho suavizado por uma mola (a roda do mouse não "pula")
  const p = useSmoothScroll(trackRef, ['start start', 'end end'], { stiffness: 110, damping: 26, mass: 0.6, restDelta: 0.0001 })

  // tamanho da tela como motion values: o palco reposiciona no resize sem re-render
  const vw = useMotionValue(typeof window === 'undefined' ? 1440 : window.innerWidth)
  const vh = useMotionValue(typeof window === 'undefined' ? 900 : window.innerHeight)
  useEffect(() => {
    const onResize = () => {
      vw.set(window.innerWidth)
      vh.set(window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [vw, vh])

  const stageX = useTransform([p, vw, vh], ([a, b, c]: number[]) => frame(a, b, c).x)
  const stageY = useTransform([p, vw, vh], ([a, b, c]: number[]) => frame(a, b, c).y)
  const stageS = useTransform([p, vw, vh], ([a, b, c]: number[]) => frame(a, b, c).s)

  const heroOpacity = useTransform(p, [0.01, 0.07], [1, 0])
  const heroY = useTransform(p, [0, 0.1], [0, -80])
  const storyOpacity = useTransform(p, [0.1, 0.16], [0, 1])
  const storyX = useTransform(p, [0.1, 0.17], [-30, 0])
  const rail = useTransform(p, [K.exploded, K.finale], [0, 1])

  const [step, setStep] = useState(-1)
  useMotionValueEvent(p, 'change', (v) => setStep(stepAt(v)))
  const heroLive = step === -1

  const goToProgress = (target: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + target * (track.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  const steps = [...LAYERS.map((l) => ({ label: l.label, text: l.text })), FINALE]

  return (
    <section id="home" ref={trackRef} aria-label="Apresentação" className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <AuroraBackground variant="hero" />

        {/* Hero (primeiro quadro) */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className={cn('absolute inset-0 z-10 flex items-center px-4 pt-20', !heroLive && 'pointer-events-none')}
          aria-hidden={!heroLive}
        >
          <div className="mx-auto grid w-full max-w-6xl lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <HeroContent />
          </div>
        </motion.div>

        {/* Palco 3D */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={{ x: stageX, y: stageY, scale: stageS, width: STAGE_W, height: STAGE_H }}
        >
          <div className="relative size-full [transform-style:preserve-3d]" style={{ perspective: 2200 }}>
            <Interface p={p} />
            <PhoneFinale p={p} />
          </div>
        </motion.div>

        {/* Texto: título + etapas com trilha de progresso */}
        <motion.div
          style={{ opacity: storyOpacity, x: storyX }}
          className={cn('absolute inset-0 z-20 px-4', heroLive && 'pointer-events-none')}
          aria-hidden={heroLive}
        >
          <div className="relative mx-auto h-full max-w-6xl">
            <div className="absolute top-[15vh] left-0 w-[32%] min-w-[19rem]">
              <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">Como eu construo</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.3rem)] leading-[1.02] font-bold tracking-[-0.03em]">
                Anatomia de
                <br />
                <span className="accent-serif text-[1.1em]">uma interface.</span>
              </h2>

              <ol className="relative mt-8 flex flex-col gap-1 pl-6">
                <span className="absolute top-2 bottom-2 left-[5px] w-[2px] rounded-full bg-border" aria-hidden />
                <motion.span
                  className="absolute top-2 bottom-2 left-[5px] w-[2px] origin-top rounded-full bg-[linear-gradient(var(--primary),var(--accent))]"
                  style={{ scaleY: rail }}
                  aria-hidden
                />
                {steps.map((s, i) => {
                  const active = step === i
                  const done = step > i
                  return (
                    <li key={s.label} className="relative">
                      <span
                        className={cn(
                          'absolute top-[0.85rem] -left-6 size-3 rounded-full border-2 transition-colors duration-300',
                          active ? 'border-primary bg-primary' : done ? 'border-primary bg-background' : 'border-border bg-background'
                        )}
                        aria-hidden
                      />
                      <button
                        onClick={() => goToProgress(i < LAYERS.length ? focusAt(i) : K.finale + 0.06)}
                        className={cn(
                          'flex w-full items-baseline gap-3 py-2 text-left transition-colors',
                          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-current={active ? 'step' : undefined}
                      >
                        <span className="font-mono text-xs">0{i + 1}</span>
                        <span className={cn('font-display font-bold transition-[font-size] duration-300', active ? 'text-xl' : 'text-base')}>
                          {s.label}
                        </span>
                      </button>
                      {/* abre/fecha via CSS (grid 0fr → 1fr): animar height "auto" com o Motion
                          dispara um scrollTo interno que cancelaria a rolagem suave dos links */}
                      <div
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        )}
                      >
                        <p className="overflow-hidden pl-8 text-sm leading-relaxed text-muted-foreground">
                          <span className="block pb-3">{s.text}</span>
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Dica de scroll */}
        <motion.button
          style={{ opacity: heroOpacity }}
          onClick={() => goToProgress(focusAt(0))}
          className={cn(
            'absolute right-[max(1rem,calc((100vw-72rem)/2))] bottom-8 z-30 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 py-1.5 pr-1.5 pl-4 text-sm font-semibold shadow-[var(--shadow-card)] backdrop-blur-md',
            !heroLive && 'pointer-events-none'
          )}
        >
          Role para ver a interface por dentro
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <ArrowDown className="size-4" />
          </span>
        </motion.button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Interface em camadas                                               */
/* ------------------------------------------------------------------ */

function Interface({ p }: { p: MotionValue<number> }) {
  return (
    <Part
      p={p}
      at={ISO_AT}
      track={{
        ...ISO,
        x: [0, 0, 20, 20, -150],
        y: [0, 0, 115, 115, 20],
        scale: [1, 1, 0.84, 0.84, 1.08],
      }}
      className="top-[132px] left-[220px] h-[360px] w-[560px]"
    >
      {LAYER_VIEWS.map((View, i) => (
        <Layer key={i} p={p} index={i}>
          <View />
        </Layer>
      ))}
    </Part>
  )
}

/** Camada: sobe em profundidade, acende na sua vez e desce de volta no final */
function Layer({ p, index, children }: { p: MotionValue<number>; index: number; children: ReactNode }) {
  const f = focusAt(index)
  const base = index * LAYER_GAP
  const dimStart = Math.min(K.exploded + 0.03, f - 0.07)
  const dim = index === 0 ? 0.6 : 0.42
  const at = [0, K.start, K.exploded, dimStart, f - 0.05, f - 0.015, f + 0.06, f + 0.095, K.collapse, K.finale]
  const opacity = [1, 1, 1, dim, dim, 1, 1, dim, 1, 1]

  // Opacidade só nas folhas: `opacity < 1` num elemento 3D achataria os filhos no plano dele.
  return (
    <Part p={p} at={at} track={{ z: [0, 0, base, base, base, base, base, base, base, 0] }} className="inset-0">
      <Part p={p} at={at} track={{ opacity }} className="inset-0">
        {/* placa translúcida: deixa cada camada legível como uma folha separada */}
        {index > 0 && (
          <Part
            p={p}
            at={[K.start, K.exploded, K.collapse - 0.03, K.collapse]}
            track={{ opacity: [0, 1, 1, 0] }}
            className="inset-0 rounded-[22px] border-2 border-dashed border-sky-300/50 bg-sky-200/[0.07]"
          />
        )}
        {children}
      </Part>

      {/* fio da etiqueta até a camada (no plano da camada) */}
      <Part
        p={p}
        at={[K.exploded - 0.03, K.exploded, K.collapse - 0.04, K.collapse]}
        track={{ opacity: [0, 1, 1, 0] }}
        className="top-[330px] -left-[70px] w-[70px]"
        style={{ borderTop: `2.5px dashed ${INK}` }}
      />

      {/* etiqueta: gira ao contrário da tela para ficar de frente */}
      <Part
        p={p}
        at={[K.start, K.exploded - 0.03, K.exploded, dimStart, f - 0.05, f - 0.015, f + 0.06, f + 0.095, K.collapse - 0.04, K.collapse]}
        track={{
          rotate: [0, 36, 36, 36, 36, 36, 36, 36, 36, 0],
          rotateX: [-7, -56, -56, -56, -56, -56, -56, -56, -56, 0],
          opacity: [0, 0, 1, dim, dim, 1, 1, dim, dim, 0],
          scale: [0.82, 0.82, 0.82, 0.74, 0.74, 0.88, 0.88, 0.74, 0.74, 0.82],
        }}
        className="-left-[70px] origin-top-left"
        style={{ translate: '-100% 0', top: index === 0 ? 350 : 300 }}
      >
        <LayerTag index={index} label={LAYERS[index].label} tag={LAYERS[index].tag} />
      </Part>
    </Part>
  )
}

/** Final: a mesma interface no app mobile */
function PhoneFinale({ p }: { p: MotionValue<number> }) {
  const a = K.collapse + 0.02
  return (
    <Part
      p={p}
      at={[a, K.finale]}
      track={{ opacity: [0, 1], x: [220, 0], y: [60, 0], z: [260, 0], rotate: [14, -3], rotateY: [-40, 0] }}
      className="top-[70px] left-[650px] h-[470px] w-[236px]"
    >
      <Ink radius={40} depth={9} className="size-full">
        <PhoneHeader />
        <div className="mx-5 mt-4 h-[120px]">
          <PhoneCard />
        </div>
        <div className="mt-5 flex flex-col gap-4 px-6">
          <PhoneRow dot={INK} />
          <PhoneRow dot={VIOLET} />
          <PhoneRow dot={INK} />
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <PhoneTabBar />
        </div>
      </Ink>
    </Part>
  )
}
