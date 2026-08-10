import { motion } from 'motion/react'
import { Code2, Cpu, Layers, MapPin, Rocket, Smartphone } from 'lucide-react'

import SectionHeading from '@/components/sections/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { profile, stats } from '@/data/profile'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import CountUp from '@reactbits/CountUp/CountUp'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const pillars = [
  {
    icon: Layers,
    title: 'Full Stack de verdade',
    text: 'Do componente React ao endpoint Spring Boot: APIs REST, persistência e arquitetura modular ponta a ponta.',
  },
  {
    icon: Smartphone,
    title: 'Web + Mobile',
    text: 'React e Next.js na web, React Native (Expo) no mobile — compartilhando padrões, tipos e boas práticas.',
  },
  {
    icon: Cpu,
    title: 'IA aplicada',
    text: 'Integração com IA Generativa (Gemini) para recomendações personalizadas e análises em produtos reais.',
  },
  {
    icon: Rocket,
    title: 'Performance e escala',
    text: 'SOLID, Clean Code e decisões orientadas a performance, acessibilidade e manutenção a longo prazo.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/4 left-[-10%] size-[30rem] rounded-full bg-primary/10 blur-[150px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre mim"
          title="Construindo produtos que resolvem problemas reais"
          description="Full Stack com foco em web e mobile, unindo interfaces bem acabadas a back-ends confiáveis."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Bio */}
          <AnimatedContent distance={50} duration={0.8}>
            <SpotlightCard className="h-full rounded-3xl border border-white/7 bg-card/50 p-7 backdrop-blur-sm sm:p-9">
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
                        ? 'text-lg leading-relaxed text-foreground/90 text-pretty'
                        : 'text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.95rem]'
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-xs text-muted-foreground">
                  <Code2 className="size-3.5 text-primary" />
                  SOLID · Clean Code · REST · Git Flow
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Stats + pilares */}
          <div className="flex flex-col gap-5">
            <AnimatedContent distance={50} duration={0.8} delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/7 bg-card/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30"
                  >
                    <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
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
                  className="group rounded-2xl border border-white/7 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card/70"
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
