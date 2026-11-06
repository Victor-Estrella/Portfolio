import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { Monitor, Smartphone } from 'lucide-react'

import ScrollTilt from '@/components/motion/ScrollTilt'
import SectionHeading from '@/components/sections/SectionHeading'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import { coreSkills, focusAreas, skillGroups } from '@/data/skills'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const areaIcon = { front: Monitor, mobile: Smartphone }


/* pseudo-aleatório determinístico para espalhar as peças */
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Peça que chega espalhada (posição, giro, profundidade) e se encaixa com a rolagem */
function ScatterPiece({ progress, index, className, children }: { progress: MotionValue<number>; index: number; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  const from = { x: (rand(index) - 0.5) * 520, y: 160 + rand(index + 7) * 140, rotate: (rand(index + 3) - 0.5) * 50 }
  const range = [index * 0.06, 0.62 + index * 0.06]
  const x = useTransform(progress, range, [from.x, 0])
  const y = useTransform(progress, range, [from.y, 0])
  const rotate = useTransform(progress, range, [from.rotate, 0])
  const rotateX = useTransform(progress, range, [40, 0])
  const opacity = useTransform(progress, [range[0], range[0] + 0.25], [0, 1])
  return (
    <motion.div className={className} style={reduce ? undefined : { x, y, rotate, rotateX, opacity }}>
      {children}
    </motion.div>
  )
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridProgress = useSmoothScroll(gridRef, ['start end', 'start 0.35'])

  return (
    <section id="skills" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/3 right-[-10%] size-[16rem] rounded-full bg-accent/10 blur-[110px] glow sm:size-[28rem] sm:blur-[150px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title={
            <>
              Tecnologias que uso <span className="accent-serif text-[1.08em]">de verdade</span>
            </>
          }
          description="Organizadas pelo que mais uso no dia a dia — sem listas infladas."
        />

        {/* Stack principal */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5"
          style={{ perspective: 1200 }}
        >
          {coreSkills.map((skill, i) => (
            <ScatterPiece
              key={skill.name}
              progress={gridProgress}
              index={i}
              className={cn(i === coreSkills.length - 1 && 'col-span-2 sm:col-span-1')}
            >
              <div className="surface group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-4 ink-hover sm:flex-col sm:items-start sm:p-5">
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <TechIcon name={skill.icon} className="relative text-3xl sm:text-4xl" />
                <div className="relative">
                  <p className="font-display text-base font-semibold">{skill.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{skill.context}</p>
                </div>
              </div>
            </ScatterPiece>
          ))}
        </div>

        {/* Áreas de atuação */}
        <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-2">
          {focusAreas.map((area, i) => {
            const Icon = areaIcon[area.id]
            return (
              <ScrollTilt key={area.id} lag={i * 0.08} className="h-full">
                <SpotlightCard className="surface h-full rounded-3xl p-6 sm:p-8">
                  <div className="relative z-2">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{area.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{area.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {area.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-xs font-medium"
                        >
                          <TechIcon name={skill.icon} className="text-sm" />
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </ScrollTilt>
            )
          })}
        </div>

        {/* Inventário */}
        <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <ScrollTilt key={group.title} lag={i * 0.07} className="h-full">
            <div className="surface h-full rounded-3xl p-6">
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">{group.title}</h3>
              <ul className="mt-4 flex flex-col">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 border-b border-border py-2.5 text-sm font-medium last:border-b-0"
                  >
                    {skill.icon ? (
                      <TechIcon name={skill.icon} className="text-lg" />
                    ) : (
                      <span className="grid w-5 place-items-center" aria-hidden>
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                    )}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
            </ScrollTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
