import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Mail, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { profile } from '@/data/profile'
import Particles from '@reactbits/Particles/Particles'
import TextType from '@reactbits/TextType/TextType'
import Magnet from '@reactbits/Magnet/Magnet'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20"
    >
      {/* Camadas de fundo */}
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_50%_35%,transparent,var(--background)_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[-20%] left-1/2 size-[22rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px] animate-glow-pulse sm:size-[42rem] sm:blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[8%] bottom-[6%] size-[16rem] rounded-full bg-accent/15 blur-[100px] animate-glow-pulse sm:size-[26rem] sm:blur-[130px]"
        aria-hidden
      />

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <Particles
            particleColors={['#38bdf8', '#a78bfa', '#e2e8f0']}
            particleCount={isMobile ? 120 : 280}
            particleSpread={16}
            speed={0.08}
            particleBaseSize={90}
            moveParticlesOnHover={false}
            alphaParticles
            disableRotation={false}
          />
        </div>
      )}

      {/* Conteúdo */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="mb-1 block text-base font-medium text-muted-foreground/80 sm:text-xl">
            Olá, eu sou
          </span>
          <span className="text-gradient">Victor Henrique</span>{' '}
          <span className="block sm:inline">Estrella Carracci</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 flex min-h-[5rem] max-w-2xl items-center justify-center px-2 sm:mt-6 sm:min-h-[3.5rem]"
        >
          <TextType
            text={[...profile.typewriter]}
            typingSpeed={32}
            pauseDuration={2200}
            deletingSpeed={18}
            showCursor
            cursorCharacter="_"
            className="text-sm text-muted-foreground sm:text-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap"
        >
          <Magnet padding={70} magnetStrength={5} disabled={!!reduceMotion}>
            <Button
              size="lg"
              variant="gradient"
              className="w-60 sm:w-auto"
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="size-4" />
              Ver projetos
            </Button>
          </Magnet>

          <Magnet padding={70} magnetStrength={5} disabled={!!reduceMotion}>
            <Button
              size="lg"
              variant="outline"
              className="w-60 sm:w-auto"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="size-4" />
              Entrar em contato
            </Button>
          </Magnet>
        </motion.div>
      </motion.div>
    </section>
  )
}
