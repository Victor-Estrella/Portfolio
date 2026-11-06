import { useRef } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import ProductCard from '@/components/experience/ProductCard'
import SectionHeading from '@/components/sections/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/data/experience'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

/** Linha da timeline "desenhada" conforme a rolagem */
function TimelineRail() {
  const ref = useRef<HTMLSpanElement>(null)
  const progress = useSmoothScroll(ref, ['start 0.75', 'end 0.55'])
  return (
    <span ref={ref} aria-hidden className="absolute top-10 bottom-0 left-[5px] hidden w-px md:block">
      <span className="absolute inset-0 bg-border" />
      <motion.span
        className="absolute inset-0 origin-top bg-[linear-gradient(to_bottom,var(--primary),var(--accent))]"
        style={{ scaleY: progress }}
      />
    </span>
  )
}

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden border-y border-border bg-elevated px-4 py-24 sm:py-32"
    >
      <AuroraBackground variant="top" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Experiência"
          title={
            <>
              Experiência <span className="accent-serif text-[1.08em]">profissional</span>
            </>
          }
          description="Atuação no desenvolvimento e na evolução de produtos web e mobile em ambiente profissional."
        />

        <ol className="mt-12 sm:mt-16">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}`} className="relative grid gap-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
              {/* Trilho da timeline */}
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2 md:pt-6 md:pl-7">
                <span className="relative flex size-3 md:absolute md:top-7 md:left-0">
                  {role.current && <span className="absolute inline-flex size-full rounded-full bg-primary animate-ping-slow" />}
                  <span className="relative inline-flex size-3 rounded-full bg-primary ring-4 ring-primary/15" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {role.period.start} — {role.period.end}
                </span>
                {role.current && <Badge variant="success">Atual</Badge>}
              </div>
              <TimelineRail />

              <div className="min-w-0">
                {/* Cargo */}
                <AnimatedContent distance={40} duration={0.8}>
                  <SpotlightCard className="surface rounded-3xl p-6 sm:p-8 lg:p-10">
                    <div className="relative z-2 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
                      <div>
                        <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">{role.area}</p>
                        <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{role.company}</h3>
                        <p className="mt-1.5 text-base font-medium text-foreground/85">{role.title}</p>
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.95rem]">
                          {role.summary}
                        </p>
                      </div>

                      <ul className="flex flex-col gap-3 lg:border-l lg:border-border lg:pl-8">
                        {role.activities.map((activity) => (
                          <li key={activity} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                              <Check className="size-3" />
                            </span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>

                {/* Produtos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6 }}
                  className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Produtos dos quais participei</h3>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                      Participação no desenvolvimento e na evolução de produtos da {role.company}, web e mobile.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(role.products.length).padStart(2, '0')} produtos
                  </span>
                </motion.div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  {role.products.map((product, i) => (
                    <ProductCard key={product.name} product={product} company={role.company} index={i} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
