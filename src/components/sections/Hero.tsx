import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'

import AuroraBackground from '@/components/AuroraBackground'
import HeroContent from '@/components/hero/HeroContent'
import HeroStory from '@/components/story/HeroStory'
import StoryStatic from '@/components/story/StoryStatic'
import { CodeWindow } from '@/components/story/mocks'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { scrollToSection } from '@/data/profile'

/** Versão imersiva (scroll conduz a história) só em desktop paisagem e com movimento liberado */
const IMMERSIVE_MQ = '(min-width: 1024px) and (min-height: 640px) and (min-aspect-ratio: 5/4) and (prefers-reduced-motion: no-preference)'

const ease = [0.22, 1, 0.36, 1] as const

/** Mobile, tablet e "menos movimento": Hero normal + história em cards */
function HeroStatic() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  return (
    <>
      <section
        id="home"
        aria-label="Apresentação"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-28 pb-16 sm:pt-32"
      >
        <AuroraBackground variant="hero" />

        <motion.div
          style={reduceMotion ? undefined : { y, opacity }}
          className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10"
        >
          <HeroContent />

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mx-auto flex justify-center pb-4"
          >
            {/* janela desenhada em 760px e reduzida para caber */}
            <div className="[zoom:0.44] min-[420px]:[zoom:0.5] sm:[zoom:0.6] lg:[zoom:0.56]">
              <CodeWindow className="h-[500px] w-[760px]" />
            </div>
          </motion.div>
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

      <StoryStatic />
    </>
  )
}

export default function Hero() {
  const immersive = useMediaQuery(IMMERSIVE_MQ)
  return immersive ? <HeroStory /> : <HeroStatic />
}
