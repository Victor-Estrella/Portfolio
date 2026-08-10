import { motion } from 'motion/react'
import { Code2, Layers, MapPin, Plug, Rocket, Smartphone } from 'lucide-react'

import SectionHeading from '@/components/sections/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { profile, stats } from '@/data/profile'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import CountUp from '@reactbits/CountUp/CountUp'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const pillars = [
  {
    icon: Layers,
    title: 'Interfaces componentizadas',
    text: 'Componentes reutilizáveis e tipados em React + TypeScript, seguindo um design system consistente.',
  },
  {
    icon: Smartphone,
    title: 'Web + Mobile',
    text: 'React e Next.js na web, React Native (Expo) no mobile — mesmos padrões, mesma experiência bem acabada.',
  },
  {
    icon: Plug,
    title: 'Integração com APIs',
    text: 'Consumo de APIs REST com estados de loading e erro tratados. Vivência em Java/Spring Boot facilita o diálogo com o back-end.',
  },
  {
    icon: Rocket,
    title: 'Performance e acessibilidade',
    text: 'Cuidado com renderização, responsividade real e navegação por teclado — front-end que continua fácil de evoluir.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-1/4 left-[-10%] size-[18rem] rounded-full bg-primary/10 blur-[110px] sm:size-[30rem] sm:blur-[150px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre mim"
          title="Interfaces que resolvem problemas reais"
          description="Front-End focado em React e React Native, unindo design bem acabado a integração sólida com APIs."
        />

        <div className="mt-12 grid gap-4 sm:gap-5 sm:mt-16 lg:grid-cols-[1.15fr_1fr]">
          {/* Bio */}
          <AnimatedContent distance={50} duration={0.8}>
            <SpotlightCard className="h-full rounded-3xl border border-white/7 bg-card/50 p-5 backdrop-blur-sm sm:p-7 lg:p-9">
              <div className="relative z-2 flex h-full flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{profile.role}</Badge>
                  <Badge variant="secondary">
                    <MapPin className="size-3" />
                    {profile.location}
                  </Badge>
                </div>

                {profile.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg'
                        : 'text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.95rem]'
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-xs text-muted-foreground">
                  <Code2 className="size-3.5 text-primary" />
                  React · TypeScript · Clean Code · Git Flow
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Stats + pilares */}
          <div className="flex flex-col gap-5">
            <AnimatedContent distance={50} duration={0.8} delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/7 bg-card/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 sm:p-5"
                  >
                    <div className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      <CountUp to={stat.value} duration={1.6} />
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                    <span className="absolute inset-x-5 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-white/7 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card/70 sm:p-5"
                >
                  <span className="mb-3 grid size-9 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <pillar.icon className="size-4.5" />
                  </span>
                  <h3 className="font-display text-sm font-semibold">{pillar.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
