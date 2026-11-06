import { motion } from 'motion/react'
import { Monitor, Smartphone } from 'lucide-react'

import SectionHeading from '@/components/sections/SectionHeading'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import { coreSkills, focusAreas, skillGroups } from '@/data/skills'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const ease = [0.22, 1, 0.36, 1] as const
const areaIcon = { front: Monitor, mobile: Smartphone }

const marqueeItems = [...coreSkills.map((s) => s.name), 'Tailwind CSS', 'REST APIs', 'Git', 'Clean Code', 'SOLID']

export default function Skills() {
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
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5">
          {coreSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease }}
              className={cn(i === coreSkills.length - 1 && 'col-span-2 sm:col-span-1')}
            >
              <div className="surface group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)] sm:flex-col sm:items-start sm:p-5">
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <TechIcon name={skill.icon} className="relative text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl" />
                <div className="relative">
                  <p className="font-display text-base font-semibold">{skill.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{skill.context}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Áreas de atuação */}
        <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-2">
          {focusAreas.map((area, i) => {
            const Icon = areaIcon[area.id]
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
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
              </motion.div>
            )
          })}
        </div>

        {/* Inventário */}
        <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="surface rounded-3xl p-6"
            >
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee infinito */}
      <div className="mask-fade-x mt-16 flex overflow-hidden select-none sm:mt-20" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-6 pr-6 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-6 font-display text-2xl font-medium whitespace-nowrap text-foreground/15 sm:text-4xl"
            >
              {item}
              <span className="size-1.5 rounded-full bg-primary/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
