import { GraduationCap, Languages, Layers, MapPin, Plug, Rocket, Smartphone } from 'lucide-react'

import ScrollTilt from '@/components/motion/ScrollTilt'
import ScrollWords from '@/components/motion/ScrollWords'
import SectionHeading from '@/components/sections/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import AnimatedContent from '@reactbits/AnimatedContent/AnimatedContent'
import CountUp from '@reactbits/CountUp/CountUp'
import SpotlightCard from '@reactbits/SpotlightCard/SpotlightCard'

const productCount = experience.reduce((total, role) => total + role.products.length, 0)

const stats = [
  { value: productCount, suffix: '', label: 'Produtos na Noweb' },
  { value: 2, suffix: '+', label: 'Anos programando' },
]

const pillars = [
  {
    icon: Layers,
    title: 'Interfaces componentizadas',
    text: 'Componentes reutilizáveis e tipados em React + TypeScript, pensados para crescer sem virar retrabalho.',
  },
  {
    icon: Smartphone,
    title: 'Web + Mobile',
    text: 'React e Next.js na web, React Native e Expo no mobile — os mesmos padrões nas duas pontas.',
  },
  {
    icon: Plug,
    title: 'Integração com APIs',
    text: 'Consumo de APIs REST com estados de carregamento e erro tratados, em diálogo direto com o back-end.',
  },
  {
    icon: Rocket,
    title: 'Manutenção e performance',
    text: 'Correção de bugs, otimização e evolução contínua de aplicações que já estão em uso.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/4 left-[-10%] size-[18rem] rounded-full bg-primary/10 blur-[110px] glow sm:size-[30rem] sm:blur-[150px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Sobre mim"
          title={
            <>
              Do layout à integração com a API — interfaces para <span className="accent-serif text-[1.08em]">produtos reais.</span>
            </>
          }
          description="Desenvolvedor Front-End & Mobile com experiência profissional em produtos reais e formação em tecnologia pela FIAP."
        />

        {/* frase de abertura: acende palavra por palavra com a rolagem */}
        <ScrollWords
          text={profile.bio[0]}
          highlight={['Noweb', 'evolução']}
          className="mt-14 max-w-4xl font-display text-[1.6rem] leading-[1.2] font-semibold tracking-tight sm:mt-20 sm:text-4xl lg:text-[2.75rem]"
        />

        <div className="mt-14 grid gap-4 sm:mt-20 sm:gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Bio */}
          <AnimatedContent distance={50} duration={0.8}>
            <SpotlightCard className="surface h-full rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="relative z-2 flex h-full flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{profile.role}</Badge>
                  <Badge variant="secondary">
                    <MapPin className="size-3" />
                    {profile.location}
                  </Badge>
                </div>

                {profile.bio.slice(1).map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg'
                        : 'text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.98rem]'
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Languages className="size-3.5 text-primary" />
                    Idiomas:
                  </span>
                  {profile.languages.map((lang) => (
                    <span key={lang.name}>
                      <span className="font-medium text-foreground">{lang.name}</span> · {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Formação */}
            <AnimatedContent distance={50} duration={0.8} delay={0.1} className="flex-1">
              <div className="surface flex h-full flex-col justify-center rounded-3xl p-6 sm:p-8">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  <GraduationCap className="size-4 text-accent" />
                  Formação
                </p>
                <ol className="relative mt-6 flex flex-col gap-7 border-l border-border pl-5">
                  {profile.education.map((item, i) => (
                    <li key={item.course} className="relative">
                      <span
                        className={
                          i === 0
                            ? 'absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full bg-accent ring-4 ring-accent/15'
                            : 'absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full border-2 border-muted-foreground/50 bg-card'
                        }
                        aria-hidden
                      />
                      <p className="font-display text-base font-semibold leading-snug">{item.course}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.degree} · {item.school} · <span className={i === 0 ? 'text-accent' : ''}>{item.status}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedContent>

            {/* Números */}
            <AnimatedContent distance={50} duration={0.8} delay={0.18}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="surface group relative overflow-hidden rounded-2xl p-4 transition-colors duration-300 hover:border-primary/30 sm:p-5"
                  >
                    <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      <CountUp to={stat.value} duration={1.4} />
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</p>
                    <span className="absolute inset-x-5 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>
        </div>

        {/* Como trabalho */}
        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <ScrollTilt key={pillar.title} lag={i * 0.06} className="h-full">
            <div className="surface group h-full rounded-2xl p-5 ink-hover">
              <span className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <pillar.icon className="size-5" />
              </span>
              <h3 className="font-display text-[0.95rem] font-semibold">{pillar.title}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">{pillar.text}</p>
            </div>
            </ScrollTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
