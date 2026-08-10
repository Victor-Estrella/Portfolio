import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import SectionHeading from '@/components/sections/SectionHeading'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { skillCategories, skills, type SkillCategory } from '@/data/skills'

const marqueeItems = [
  'React',
  'TypeScript',
  'Next.js',
  'React Native',
  'Spring Boot',
  'Node.js',
  'Tailwind CSS',
  'Java',
  'Python',
  'Docker',
  'Git',
  'REST API',
  'Clean Code',
  'SOLID',
]

export default function Skills() {
  const [category, setCategory] = useState<SkillCategory>('all')

  const filtered = useMemo(
    () => (category === 'all' ? skills : skills.filter((s) => s.category === category)),
    [category]
  )

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/3 right-[-10%] size-[28rem] rounded-full bg-accent/10 blur-[150px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack"
          title="Tecnologias que uso no dia a dia"
          description="Do design da interface ao deploy: as ferramentas que sustentam meus projetos."
        />

        {/* Filtros */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                category === cat.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {category === cat.id && (
                <motion.span
                  layoutId="skill-filter"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,var(--primary),var(--accent))]"
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <TooltipProvider>
          <motion.div layout className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="group relative flex aspect-square cursor-default flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/7 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_18px_45px_-22px_var(--primary)]">
                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <i
                          className={cn(skill.icon, 'relative text-3xl transition-transform duration-300 group-hover:scale-115 sm:text-4xl')}
                          aria-hidden
                        />
                        <span className="relative px-1 text-center text-[11px] leading-tight font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{skill.name}</TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </TooltipProvider>
      </div>

      {/* Marquee infinito */}
      <div className="mask-fade-x mt-16 flex overflow-hidden select-none" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-4 pr-4 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-4 font-display text-xl font-medium whitespace-nowrap text-muted-foreground/45 sm:text-2xl"
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
