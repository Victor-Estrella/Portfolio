import { motion } from 'motion/react'

import { LayerComponents, LayerContent, LayerData, LayerInteraction, LayerLayout } from './layers'
import { FINALE, LAYERS } from './storyData'

const VIEWS = [LayerLayout, LayerComponents, LayerContent, LayerInteraction, LayerData]

/** Mobile, tablet e "menos movimento": a interface montada + as etapas em lista */
export default function StoryStatic() {
  const steps = [...LAYERS.map((l) => ({ label: l.label, text: l.text, tag: l.tag as string | undefined })), { ...FINALE, tag: undefined }]

  return (
    <section aria-labelledby="story-title" className="relative px-4 pt-12 pb-8 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">Como eu construo</p>
        <h2 id="story-title" className="mt-3 font-display text-[2rem] leading-[1.05] font-bold tracking-tight sm:text-5xl">
          Anatomia de <span className="accent-serif text-[1.08em]">uma interface.</span>
        </h2>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* interface montada (camadas empilhadas), desenhada em 560px e reduzida */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
            aria-hidden
          >
            <div className="relative h-[360px] w-[560px] [zoom:0.58] min-[420px]:[zoom:0.64] sm:[zoom:0.85] md:[zoom:0.8]">
              {VIEWS.map((View, i) => (
                <div key={i} className="absolute inset-0">
                  <View />
                </div>
              ))}
            </div>
          </motion.div>

          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                className="surface rounded-2xl p-4"
              >
                <p className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <span className="font-display font-bold">{s.label}</span>
                  {s.tag && (
                    <code className="ml-auto rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[11px] text-muted-foreground">{s.tag}</code>
                  )}
                </p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
