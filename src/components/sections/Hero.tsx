import { lazy, Suspense } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Briefcase, Download, GraduationCap, Mail } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import BrandMark from '@/components/BrandMark'
import SocialLinks from '@/components/SocialLinks'
import { Button, buttonVariants } from '@/components/ui/button'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { profile, scrollToSection } from '@/data/profile'
import { experience } from '@/data/experience'
import { coreSkills } from '@/data/skills'
import TextType from '@reactbits/TextType/TextType'

// WebGL carregado depois do conteúdo principal, para não atrasar o primeiro paint
const Particles = lazy(() => import('@reactbits/Particles/Particles'))

const ease = [0.22, 1, 0.36, 1] as const
const currentRole = experience.find((role) => role.current)

const particleColors = {
  dark: ['#38bdf8', '#a78bfa', '#e2e8f0'],
  light: ['#0284c7', '#7c3aed', '#94a3b8'],
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  return (
    <section
      id="home"
      aria-label="Apresentação"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-28 pb-16 sm:pt-32"
    >
      {/* Camadas de fundo */}
      <AuroraBackground variant="hero" />

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-60" aria-hidden>
          <Suspense fallback={null}>
            <Particles
              key={theme}
              particleColors={particleColors[theme]}
              particleCount={isMobile ? 60 : 140}
              particleSpread={16}
              speed={0.08}
              particleBaseSize={isMobile ? 70 : 90}
              moveParticlesOnHover={false}
              alphaParticles
              disableRotation={false}
            />
          </Suspense>
        </div>
      )}

      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10"
      >
        {/* Apresentação */}
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
            className="mt-6 font-display text-[2.5rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance min-[420px]:text-5xl sm:text-6xl lg:text-[4.25rem]"
          >
            <span className="sr-only">{profile.name} — {profile.role}</span>
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
            className="mt-5 flex min-h-10 items-start gap-2 font-mono text-xs sm:min-h-6 text-muted-foreground sm:text-sm"
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
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
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

          {/* Stack principal */}
          <motion.div {...fadeUp(0.42)} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
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

        {/* Cartão "Atualmente" */}
        {currentRole && (
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="relative mx-auto w-full max-w-md lg:mr-0"
          >
            {/* camada de profundidade atrás do cartão */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] rounded-3xl border border-border bg-elevated/70"
              aria-hidden
            />

            <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-float)] sm:p-7 lg:animate-float">
              <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-primary/20 blur-3xl glow" aria-hidden />

              <div className="relative flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  <Briefcase className="size-3.5 text-primary" />
                  Atualmente
                </span>
                <span className="rounded-full border border-border bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {currentRole.period.start} — {currentRole.period.end}
                </span>
              </div>

              <p className="relative mt-5 font-display text-2xl font-bold tracking-tight">{currentRole.company}</p>
              <p className="relative mt-1 text-sm text-muted-foreground">
                {currentRole.title} · {currentRole.area}
              </p>

              <div className="relative mt-6 border-t border-border pt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  Produtos em que participei do desenvolvimento
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {currentRole.products.map((product) => (
                    <li
                      key={product.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 py-1 pr-2.5 pl-1 text-xs font-medium"
                    >
                      <BrandMark
                        name={product.name}
                        monogram={product.monogram}
                        logo={product.logo}
                        hue={product.hue}
                        className="size-5 rounded-full text-[10px]"
                      />
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <GraduationCap className="size-4 text-accent" />
                  ADS · FIAP — cursando Eng. de Software
                </span>
                <button
                  onClick={() => scrollToSection('experiencia')}
                  className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary"
                >
                  Ver experiência
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollToSection('sobre')}
        aria-label="Rolar para a seção Sobre"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:flex"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
        Role para explorar
      </motion.button>
    </section>
  )
}
