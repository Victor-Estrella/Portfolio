import { useRef, useState, type ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import { Github } from '@/components/icons'
import SectionHeading from '@/components/sections/SectionHeading'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectDialog from '@/components/projects/ProjectDialog'
import { buttonVariants } from '@/components/ui/button'
import { profile } from '@/data/profile'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { ownProjects, studyProjects, type Project } from '@/data/projects'

function GroupHeading({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="border-b border-border pb-5"
    >
      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
      <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

/**
 * Baralho empilhável: cada projeto fica preso no topo e o próximo desliza por cima;
 * os de trás recuam e escurecem. No mobile vira uma lista normal.
 */
function ProjectDeck({ items, onOpen }: { items: Project[]; onOpen: (project: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useSmoothScroll(ref, ['start start', 'end end'])
  const desktop = useMediaQuery('(min-width: 1024px)')

  if (!desktop) {
    return (
      <div ref={ref} className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} onOpen={() => onOpen(project)} />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="mt-8">
      {items.map((project, i) => (
        <DeckCard key={project.slug} index={i} total={items.length} progress={progress}>
          <ProjectCard project={project} index={i} wide onOpen={() => onOpen(project)} />
        </DeckCard>
      ))}
    </div>
  )
}

function DeckCard({
  index,
  total,
  progress,
  children,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  children: ReactNode
}) {
  const behind = total - 1 - index
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - behind * 0.05])
  const rotateX = useTransform(progress, [start, 1], [0, behind * 2.5])
  const shade = useTransform(progress, [start, Math.min(1, start + 1.2 / total)], [0, behind > 0 ? 0.55 : 0])

  return (
    <div
      className="sticky h-[440px]"
      style={{ top: 104 + index * 18, marginBottom: index === total - 1 ? 0 : '16vh', perspective: 1400 }}
    >
      {/* base opaca: os cards de trás não "vazam" através do vidro do card da frente */}
      <motion.div style={{ scale, rotateX, transformOrigin: '50% 0%' }} className="relative h-full rounded-3xl bg-background">
        {children}
        <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-0 rounded-3xl bg-background" />
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelected(project)
    setOpen(true)
  }

  return (
    <section id="projetos" className="relative overflow-x-clip px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-0 left-1/2 size-[18rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--aurora-blue),transparent)] opacity-60 blur-2xl sm:size-[36rem]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Projetos"
          title={
            <>
              Projetos <span className="accent-serif text-[1.08em]">fora da Noweb</span>
            </>
          }
          description="Projetos próprios, colaborações e projetos acadêmicos — com o contexto e as tecnologias que efetivamente usei em cada um."
          aside={
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline' })}
            >
              <Github className="size-4" />
              GitHub
              <ArrowUpRight className="size-3.5" />
            </a>
          }
        />

        {/* Próprios e colaborações */}
        <div className="mt-14 sm:mt-16">
          <GroupHeading
            title="Projetos próprios e colaborações"
            description="Marcas e presença digital construídas por mim ou em parceria."
          />
          <ProjectDeck items={ownProjects} onOpen={openProject} />
        </div>

        {/* Acadêmicos e pessoais */}
        <div className="mt-16 sm:mt-20">
          <GroupHeading
            title="Projetos acadêmicos e pessoais"
            description="Aplicações web e mobile desenvolvidas na FIAP e em estudos próprios, com estudo de caso de cada uma."
          />
          <ProjectDeck items={studyProjects} onOpen={openProject} />
        </div>
      </div>

      <ProjectDialog project={selected} open={open} onOpenChange={setOpen} />
    </section>
  )
}
