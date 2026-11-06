import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import HeroContent from '@/components/hero/HeroContent'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/data/profile'
import Part from './Part'
import {
  ApiTerminal,
  BrowserBar,
  CodeLine,
  EditorChrome,
  Ink,
  PhoneCard,
  PhoneHeader,
  PhoneRow,
  PhoneTabBar,
  WebCard,
  WebHeadline,
  WebImage,
} from './mocks'
import { CODE_LINES, BLUE, INK, VIOLET } from './palette'
import { STORY_STEPS, stepAt } from './storyData'

/**
 * Coreografia "Do código à tela".
 *
 * O trilho tem várias alturas de tela; o palco fica preso (sticky) e um único
 * progresso `p` (0 → 1) do scroll comanda tudo: o Hero sai, o código explode em
 * profundidade e se remonta em uma interface web, depois num app e por fim numa
 * integração com API. As peças vivem num palco virtual de 1000×625 px, escalado
 * para caber na tela.
 */

/** Momentos-chave do progresso */
const K = {
  start: 0.05, // o código começa a se soltar
  explode: 0.16, // linhas espalhadas em profundidade
  web: 0.27, // interface web montada
  webEnd: 0.42,
  mobile: 0.54, // app montado na frente
  mobileEnd: 0.66,
  api: 0.78, // integração conectada
}

const STAGE_W = 1000
const STAGE_H = 625
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => t * t * (3 - 2 * t)

/** Posição/escala do palco: à direita no Hero, embaixo à esquerda na história */
function frame(p: number, w: number, h: number) {
  const cw = Math.min(w - 32, 1152)
  const left = (w - cw) / 2

  const s0 = (cw * 0.5) / STAGE_W
  const x0 = left + cw * 0.53
  const y0 = h * 0.52 - (STAGE_H * s0) / 2 + 10

  const s1 = Math.min((cw * 0.74) / STAGE_W, (h * 0.66) / STAGE_H)
  const x1 = left - 8
  const y1 = h - STAGE_H * s1 - h * 0.05

  const t = smooth(clamp01((p - K.start) / (K.explode + 0.04 - K.start)))
  return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, s: s0 + (s1 - s0) * t }
}

/* pseudo-aleatório determinístico */
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export default function HeroStory() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  // Repassa o progresso para um MotionValue comum: assim o Motion não tenta acelerar
  // opacity/cor com a ScrollTimeline nativa (que ignoraria o `offset` do trilho).
  const p = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => p.set(v))
  useEffect(() => p.set(scrollYProgress.get()), [p, scrollYProgress])

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

  // Hero sai; história entra
  const heroOpacity = useTransform(p, [0.015, 0.09], [1, 0])
  const heroY = useTransform(p, [0, 0.11], [0, -90])
  const storyOpacity = useTransform(p, [0.13, 0.2], [0, 1])
  const storyY = useTransform(p, [0.13, 0.21], [40, 0])
  const bg = useTransform(
    p,
    [0.06, 0.17, K.webEnd, K.webEnd + 0.07, K.mobileEnd, K.mobileEnd + 0.07],
    ['rgba(37,99,235,0)', 'rgba(37,99,235,1)', 'rgba(37,99,235,1)', 'rgba(11,13,18,1)', 'rgba(11,13,18,1)', 'rgba(91,33,182,1)']
  )

  const [step, setStep] = useState(0)
  const [heroLive, setHeroLive] = useState(true)
  useMotionValueEvent(p, 'change', (v) => {
    setStep(stepAt(v))
    setHeroLive(v < 0.07)
  })

  const goToProgress = (target: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + target * (track.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  const current = STORY_STEPS[step]

  return (
    <section id="home" ref={trackRef} aria-label="Apresentação" className="relative h-[480vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fundos */}
        <AuroraBackground variant="hero" />
        <motion.div className="absolute inset-0" style={{ backgroundColor: bg }} aria-hidden />

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
          className="pointer-events-none absolute top-0 left-0 z-0 origin-top-left"
          style={{ x: stageX, y: stageY, scale: stageS, width: STAGE_W, height: STAGE_H }}
        >
          <div className="relative size-full [transform-style:preserve-3d]" style={{ perspective: 1800 }}>
            <CodeStage p={p} />
            <WebStage p={p} />
            <MobileStage p={p} />
            <ApiStage p={p} />
          </div>
        </motion.div>

        {/* Texto da história */}
        <motion.div
          style={{ opacity: storyOpacity, y: storyY }}
          className={cn('absolute inset-0 z-20 px-4 text-white', heroLive && 'pointer-events-none')}
        >
          <div className="relative mx-auto h-full max-w-6xl">
            <h2 className="absolute top-[14vh] left-0 font-display text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[1] font-bold tracking-[-0.035em]">
              Do código
              <br />
              <span className="font-serif text-[1.1em] font-normal tracking-normal text-sky-200 italic">à tela.</span>
            </h2>

            <div className="absolute top-[14vh] right-0 w-[36%] min-w-[20rem]">
              <div role="tablist" aria-label="Etapas" className="flex gap-6">
                {STORY_STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={step === i}
                    onClick={() => goToProgress(s.focus)}
                    className={cn(
                      'relative pb-2 font-display text-lg font-bold transition-colors',
                      step === i ? 'text-white' : 'text-white/45 hover:text-white/75'
                    )}
                  >
                    {s.tab}
                    {step === i && (
                      <motion.span layoutId="story-tab" className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7"
                  role="tabpanel"
                >
                  <h3 className="font-display text-[2rem] leading-[1.05] font-bold tracking-tight text-balance">{current.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-white/80">{current.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {current.stack.map((s) => (
                      <li key={s} className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/90">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection(current.cta.target)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    style={{ color: INK }}
                  >
                    {current.cta.label}
                    <ArrowRight className="size-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Dica de scroll */}
        <motion.button
          style={{ opacity: heroOpacity }}
          onClick={() => goToProgress(STORY_STEPS[0].focus)}
          className={cn(
            'absolute right-[max(1rem,calc((100vw-72rem)/2))] bottom-8 z-30 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 py-1.5 pr-1.5 pl-4 text-sm font-semibold shadow-[var(--shadow-card)] backdrop-blur-md',
            !heroLive && 'pointer-events-none'
          )}
        >
          Role para ver o código virar tela
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <ArrowDown className="size-4" />
          </span>
        </motion.button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Etapas do palco                                                    */
/* ------------------------------------------------------------------ */

type StageProps = { p: ReturnType<typeof useScroll>['scrollYProgress'] }

/** Editor: inclinado no Hero; as linhas explodem em profundidade e somem */
function CodeStage({ p }: StageProps) {
  const at = [0, K.start, K.explode, K.web]
  return (
    <Part
      p={p}
      at={at}
      track={{ rotateY: [-16, -16, -32, -32], rotateX: [7, 7, 16, 16], rotate: [-2, -2, 0, 0], scale: [1, 1, 0.94, 0.86], z: [0, 0, -60, -160] }}
      className="top-[60px] left-[120px] h-[500px] w-[760px]"
    >
      {/* fundo da janela some para as linhas flutuarem */}
      <Part p={p} at={at} track={{ opacity: [1, 1, 0.12, 0] }} className="inset-0">
        <Ink dark depth={9} radius={22} className="size-full">
          <EditorChrome />
        </Ink>
      </Part>

      {CODE_LINES.map((line, i) => (
        <Part
          key={i}
          p={p}
          at={[0, K.start, K.explode, K.web - 0.03, K.web]}
          track={{
            z: [0, 0, 40 + (i % 4) * 55, 40 + (i % 4) * 55, 120],
            x: [0, 0, (rand(i) - 0.5) * 120, (rand(i) - 0.5) * 140, (rand(i) - 0.5) * 160],
            y: [0, 0, (i - 5) * 9, (i - 5) * 12, (i - 5) * 16],
            rotate: [0, 0, (rand(i + 9) - 0.5) * 10, (rand(i + 9) - 0.5) * 12, 0],
            opacity: [1, 1, 1, 0.9, 0],
          }}
          className="left-[14px]"
          style={{ top: 68 + i * 34 }}
        >
          <CodeLine tokens={line} n={i + 1} />
        </Part>
      ))}
    </Part>
  )
}

/** Peça que "voa" de um ponto espalhado até a posição montada */
function Assemble({
  p,
  from,
  to,
  offset,
  className,
  style,
  children,
}: StageProps & {
  from: number
  to: number
  offset: { x?: number; y?: number; z?: number; rotate?: number }
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <Part
      p={p}
      at={[from, to]}
      track={{
        x: [offset.x ?? 0, 0],
        y: [offset.y ?? 0, 0],
        z: [offset.z ?? 200, 0],
        rotate: [offset.rotate ?? 0, 0],
        opacity: [0, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </Part>
  )
}

/** Interface web: monta a partir do código e depois recua para dar lugar ao app */
function WebStage({ p }: StageProps) {
  const a = K.explode - 0.02
  return (
    <Part
      p={p}
      at={[K.web, K.webEnd, K.mobile, K.mobileEnd, K.api]}
      track={{ x: [0, 0, -80, -80, -150], y: [0, 0, -10, -10, -20], scale: [1, 1, 0.86, 0.86, 0.8], rotateY: [0, 0, 14, 14, 18] }}
      className="top-[110px] left-[40px] h-[430px] w-[640px]"
    >
      <Part
        p={p}
        at={[a, K.web]}
        track={{ opacity: [0, 1], z: [-220, 0], rotateX: [-24, 0], scale: [0.85, 1] }}
        className="inset-0"
      >
        <Ink className="size-full">
          <BrowserBar />
        </Ink>
      </Part>

      <Assemble p={p} from={a + 0.01} to={K.web} offset={{ x: -140, y: -90, z: 260, rotate: -10 }} className="top-[76px] left-[30px] w-[300px]">
        <WebHeadline />
      </Assemble>
      <Assemble p={p} from={a + 0.02} to={K.web} offset={{ x: 160, y: -70, z: 320, rotate: 12 }} className="top-[76px] left-[345px] h-[220px] w-[265px]">
        <WebImage />
      </Assemble>
      {[INK, BLUE, INK].map((accent, i) => (
        <Assemble
          key={i}
          p={p}
          from={a + 0.03 + i * 0.008}
          to={K.web}
          offset={{ x: (i - 1) * 120, y: 140, z: 240, rotate: (i - 1) * 14 }}
          className="top-[330px] h-[64px] w-[184px]"
          style={{ left: 30 + i * 200 }}
        >
          <WebCard accent={accent} />
        </Assemble>
      ))}
    </Part>
  )
}

/** App mobile: entra na frente da interface web */
function MobileStage({ p }: StageProps) {
  const a = K.webEnd + 0.01
  return (
    <Part
      p={p}
      at={[K.mobileEnd, K.api]}
      track={{ x: [0, -170], y: [0, -10] }}
      className="top-[70px] left-[600px] h-[500px] w-[250px]"
    >
      <Part
        p={p}
        at={[a, K.mobile]}
        track={{ opacity: [0, 1], y: [200, 0], z: [320, 0], rotate: [16, 0], rotateY: [-40, 0] }}
        className="inset-0"
      >
        <Ink radius={40} depth={9} className="size-full" />
      </Part>
      <Assemble p={p} from={a + 0.02} to={K.mobile} offset={{ y: -60, z: 200 }} className="inset-x-0 top-0">
        <PhoneHeader />
      </Assemble>
      <Assemble p={p} from={a + 0.03} to={K.mobile} offset={{ x: 120, y: -40, z: 260, rotate: 10 }} className="top-[112px] right-5 left-5 h-[130px]">
        <PhoneCard />
      </Assemble>
      {[INK, VIOLET, INK].map((dot, i) => (
        <Assemble
          key={i}
          p={p}
          from={a + 0.04 + i * 0.008}
          to={K.mobile}
          offset={{ x: -120 + i * 40, y: 60, z: 220, rotate: -8 + i * 8 }}
          className="left-6"
          style={{ top: 268 + i * 46 }}
        >
          <PhoneRow dot={dot} />
        </Assemble>
      ))}
      <Assemble p={p} from={a + 0.06} to={K.mobile} offset={{ y: 120, z: 180 }} className="inset-x-5 bottom-5">
        <PhoneTabBar />
      </Assemble>
    </Part>
  )
}

/** Integração: terminal com a resposta da API e dados correndo até o app */
function ApiStage({ p }: StageProps) {
  const a = K.mobileEnd + 0.01
  return (
    <>
      <Part p={p} at={[a + 0.05, K.api]} track={{ opacity: [0, 1] }} className="inset-0">
        <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="overflow-visible">
          <path id="api-wire" d="M 690 250 C 810 250, 865 300, 865 380" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="8 10" />
          {[0, 0.55, 1.1].map((delay) => (
            <circle key={delay} r="7" fill="#7dd3fc" stroke={INK} strokeWidth="2.5">
              <animateMotion dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath href="#api-wire" />
              </animateMotion>
            </circle>
          ))}
        </svg>
      </Part>
      <Part
        p={p}
        at={[a, K.api]}
        track={{ opacity: [0, 1], x: [180, 0], y: [80, 0], z: [260, 0], rotate: [10, -3] }}
        className="top-[380px] left-[715px] h-[205px] w-[300px]"
      >
        <ApiTerminal />
      </Part>
    </>
  )
}
