import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

import { scrollToSection } from '@/data/profile'
import {
  ApiTerminal,
  BrowserBar,
  Ink,
  PhoneCard,
  PhoneHeader,
  PhoneRow,
  PhoneTabBar,
  WebCard,
  WebHeadline,
  WebImage,
} from './mocks'
import { BLUE, INK, SKY, VIOLET } from './palette'
import { STORY_STEPS } from './storyData'

/** Mini ilustração de cada etapa (desenhada em px e reduzida com zoom) */
function Illustration({ id }: { id: (typeof STORY_STEPS)[number]['id'] }) {
  if (id === 'web') {
    return (
      <Ink className="h-[430px] w-[640px]">
        <BrowserBar />
        <div className="grid grid-cols-[1.1fr_1fr] gap-6 p-7">
          <WebHeadline />
          <div className="h-[220px]">
            <WebImage />
          </div>
        </div>
        <div className="grid h-[64px] grid-cols-3 gap-4 px-7">
          <WebCard accent={INK} />
          <WebCard accent={BLUE} />
          <WebCard accent={INK} />
        </div>
      </Ink>
    )
  }
  if (id === 'mobile') {
    return (
      <Ink radius={40} depth={9} className="h-[500px] w-[250px]">
        <PhoneHeader />
        <div className="mx-5 mt-4 h-[130px]">
          <PhoneCard />
        </div>
        <div className="mt-6 flex flex-col gap-5 px-6">
          <PhoneRow dot={INK} />
          <PhoneRow dot={VIOLET} />
          <PhoneRow dot={INK} />
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <PhoneTabBar />
        </div>
      </Ink>
    )
  }
  return (
    <div className="h-[220px] w-[340px]">
      <ApiTerminal />
    </div>
  )
}

export default function StoryStatic() {
  return (
    <section aria-labelledby="story-title" className="relative px-4 pt-12 pb-8 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <h2 id="story-title" className="font-display text-[2rem] leading-[1.05] font-bold tracking-tight sm:text-5xl">
          Do código <span className="accent-serif text-[1.08em]">à tela.</span>
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STORY_STEPS.map((step, i) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col overflow-hidden rounded-3xl text-white"
              style={{ background: step.bg }}
            >
              <div className="grid h-52 place-items-center overflow-hidden" aria-hidden>
                <div className={step.id === 'web' ? '[zoom:0.42]' : step.id === 'mobile' ? '[zoom:0.36]' : '[zoom:0.7]'}>
                  <Illustration id={step.id} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: SKY }}>
                  {step.tab}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {step.stack.map((s) => (
                    <li key={s} className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] text-white/85">
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection(step.cta.target)}
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-white hover:underline"
                >
                  {step.cta.label}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
