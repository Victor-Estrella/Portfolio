import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import Particles from '@reactbits/Particles/Particles'
import TextType from '@reactbits/TextType/TextType'
import Magnet from '@reactbits/Magnet/Magnet'
import ShinyText from '@reactbits/ShinyText/ShinyText'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20"
    >
      {/* Camadas de fundo */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_50%_35%,transparent,var(--background)_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[-20%] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] animate-glow-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[8%] bottom-[6%] size-[26rem] rounded-full bg-accent/15 blur-[130px] animate-glow-pulse"
        aria-hidden
      />

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <Particles
            particleColors={['#38bdf8', '#a78bfa', '#e2e8f0']}
            particleCount={280}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-xs backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <ShinyText text={profile.availableLabel} speed={4} className="font-medium" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="block text-muted-foreground/80 text-lg font-medium sm:text-xl">
            Olá, eu sou
          </span>
          <span className="text-gradient">Victor Henrique</span>{' '}
          <span className="block sm:inline">Estrella Carracci</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 flex min-h-[3.5rem] max-w-2xl items-center justify-center px-2"
        >
          <TextType
            text={[
              'Desenvolvedor Full Stack | React · React Native · Spring Boot',
              'Aplicações web e mobile com integração real entre front e back',
              'Código limpo, performance e escalabilidade em primeiro lugar',
            ]}
            typingSpeed={32}
            pauseDuration={2200}
            deletingSpeed={18}
            showCursor
            cursorCharacter="_"
            className="text-base text-muted-foreground sm:text-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnet padding={70} magnetStrength={5} disabled={!!reduceMotion}>
            <Button
              size="lg"
              variant="gradient"
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
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="size-4" />
              Entrar em contato
            </Button>
          </Magnet>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.button
        onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity }}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="tracking-[0.2em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/4"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
