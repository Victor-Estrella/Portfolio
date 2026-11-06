import { motion } from 'motion/react'
import { ArrowRight, Download, Mail } from 'lucide-react'

import SocialLinks from '@/components/SocialLinks'
import { Button, buttonVariants } from '@/components/ui/button'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import { profile, scrollToSection } from '@/data/profile'
import { experience } from '@/data/experience'
import { coreSkills } from '@/data/skills'
import TextType from '@reactbits/TextType/TextType'

const ease = [0.22, 1, 0.36, 1] as const
const currentRole = experience.find((role) => role.current)
/** Logos distintas dos produtos (Cage, Pulso, Pontic) */
const productLogos = [...new Map(currentRole?.products.filter((p) => p.logo).map((p) => [p.logo, p]) ?? []).values()]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

/** Coluna de apresentação — a mesma nas versões imersiva e estática */
export default function HeroContent() {
  return (
    <div className="flex flex-col items-start">
      {profile.available && (
        <motion.span
          {...fadeUp(0)}
          className="inline-flex items-center gap-2.5 rounded-full border border-success/25 bg-success/10 py-1.5 pr-4 pl-3 text-xs font-medium text-success"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-success animate-ping-slow" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {profile.availability}
        </motion.span>
      )}

      <motion.h1
        {...fadeUp(0.08)}
        className="mt-6 font-display text-[2.5rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance min-[420px]:text-5xl sm:text-6xl lg:text-[4.1rem]"
      >
        <span className="sr-only">
          {profile.name} — {profile.role}
        </span>
        <span aria-hidden>
          Victor Henrique
          <br />
          Estrella <span className="accent-serif text-[1.08em]">Carracci</span>
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.16)}
        className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground/90 sm:text-2xl"
        aria-hidden
      >
        {profile.role}
      </motion.p>

      <motion.p
        {...fadeUp(0.22)}
        className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground text-pretty sm:text-lg"
      >
        {profile.summary}
      </motion.p>

      <motion.div
        {...fadeUp(0.28)}
        className="mt-4 flex min-h-10 items-start gap-2 font-mono text-xs text-muted-foreground sm:min-h-6 sm:text-sm"
        aria-hidden
      >
        <span className="text-primary">&gt;</span>
        <TextType
          text={profile.typewriter}
          typingSpeed={34}
          pauseDuration={2000}
          deletingSpeed={18}
          showCursor
          cursorCharacter="_"
          cursorClassName="text-primary"
          textColors={['currentColor']}
        />
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.34)}
        className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
      >
        <Button size="lg" variant="gradient" className="w-full sm:w-auto" onClick={() => scrollToSection('contato')}>
          <Mail className="size-4" />
          Entrar em contato
        </Button>

        <a
          href={profile.resumeUrl}
          download={profile.resumeFileName}
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
        >
          <Download className="size-4" />
          Baixar currículo
        </a>

        <SocialLinks
          className="justify-center gap-2 sm:ml-1"
          itemClassName="size-12 border border-border bg-card/60 shadow-[var(--shadow-card)] hover:border-primary/40"
        />
      </motion.div>

      {/* Atualmente — sinal de experiência, compacto */}
      {currentRole && (
        <motion.button
          {...fadeUp(0.42)}
          onClick={() => scrollToSection('experiencia')}
          className="group mt-7 flex w-full items-center gap-3.5 rounded-2xl border border-border bg-card/60 p-2.5 pr-4 text-left shadow-[var(--shadow-card)] backdrop-blur-sm transition-colors hover:border-primary/40 sm:w-auto"
        >
          <span className="flex -space-x-2.5">
            {productLogos.map((product) => (
              <img
                key={product.name}
                src={product.logo}
                alt=""
                className="size-9 rounded-xl bg-black object-cover ring-2 ring-background"
              />
            ))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Atualmente · {currentRole.period.start} — {currentRole.period.end}
            </span>
            <span className="block truncate text-sm font-semibold">
              {currentRole.title} na {currentRole.company}
              <span className="font-normal text-muted-foreground"> · {currentRole.products.length} produtos</span>
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </motion.button>
      )}

      {/* Stack principal */}
      <motion.div {...fadeUp(0.5)} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Stack principal</span>
        <ul className="flex flex-wrap items-center gap-2" aria-label="Stack principal">
          {coreSkills.map((skill) => (
            <li
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
            >
              <TechIcon name={skill.icon} className="text-sm" />
              {skill.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

