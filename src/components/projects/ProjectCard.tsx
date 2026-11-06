import type { MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight, BookOpen, Globe, Monitor, Smartphone } from 'lucide-react'

import BrandMark from '@/components/BrandMark'
import { Github } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import { hasCaseStudy, type Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: () => void
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const caseStudy = hasCaseStudy(project)

  // posição do mouse em % (spotlight) + inclinação 3D sutil
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}% ${mouseY}%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)`

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mouseX.set(px * 100)
    mouseY.set(py * 100)
    if (!reduceMotion) {
      tiltY.set((px - 0.5) * 6)
      tiltX.set((0.5 - py) * 6)
    }
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    mouseX.set(50)
    mouseY.set(50)
  }

  const PlatformIcon = project.platform === 'mobile' ? Smartphone : Monitor

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="surface group relative flex h-full flex-col overflow-hidden rounded-3xl transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
      >
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Mídia */}
        <div
          className={cn(
            'relative aspect-video overflow-hidden border-b border-border bg-elevated',
            project.image && project.shot === 'mobile' && 'flex items-center justify-center'
          )}
        >
          {project.image ? (
            <>
              {project.shot === 'mobile' && (
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_62%)]"
                />
              )}
              <img
                src={project.image}
                alt={`Prévia do projeto ${project.name}`}
                loading="lazy"
                decoding="async"
                className={cn(
                  'relative transition-transform duration-700 ease-out group-hover:scale-[1.05]',
                  project.shot === 'mobile'
                    ? 'h-[135%] w-auto translate-y-8 rounded-xl object-contain drop-shadow-[0_18px_40px_rgb(0_0_0/0.35)]'
                    : 'size-full object-cover object-top'
                )}
              />
            </>
          ) : (
            <ProjectCover project={project} />
          )}

          <div className="absolute top-3 left-3 z-2 flex flex-wrap gap-1.5">
            <Badge className="border-border bg-card/85 text-foreground backdrop-blur-md">
              <PlatformIcon className="size-3" />
              {project.platform === 'mobile' ? 'Mobile' : 'Web'}
            </Badge>
            {project.year && (
              <Badge variant="secondary" className="bg-card/85 backdrop-blur-md">
                {project.year}
              </Badge>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-2 flex flex-1 flex-col p-5 sm:p-6">
          <p className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
            {project.category}
          </p>

          <h4 className="mt-2 font-display text-xl font-bold tracking-tight">
            {project.name}
          </h4>

          {/* Com estudo de caso, o card mostra o resumo; sem ele, a descrição completa */}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {caseStudy ? project.tagline : project.description}
          </p>

          {/* Escopo (quando não há stack confirmada) */}
          {project.scope && project.scope.length > 0 && (
            <div className="mt-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Escopo</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.scope.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack */}
          {project.stacks && project.stacks.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
              {project.stacks.map((stack) => (
                <li
                  key={stack.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {stack.image ? (
                    <img src={stack.image} alt="" className="size-3.5 object-contain" />
                  ) : (
                    stack.icon && <TechIcon name={stack.icon} className="text-[13px]" />
                  )}
                  {stack.name}
                </li>
              ))}
            </ul>
          )}

          {/* Ações */}
          {(caseStudy || project.links.github || project.links.site) && (
            <div className="mt-auto flex flex-wrap items-center gap-1 pt-6">
              {caseStudy && (
                <Button size="sm" variant="outline" className="mr-1" onClick={onOpen} aria-haspopup="dialog">
                  <BookOpen className="size-3.5" />
                  Estudo de caso
                </Button>
              )}
              {project.links.site && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    caseStudy
                      ? cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'px-2.5 has-[>svg]:px-2.5')
                      : buttonVariants({ size: 'sm', variant: 'outline' })
                  }
                >
                  <Globe className="size-3.5" />
                  {caseStudy ? 'Site' : 'Visitar site'}
                  <ArrowUpRight className="size-3" />
                  <span className="sr-only">de {project.name} (abre em nova aba)</span>
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'px-2.5 has-[>svg]:px-2.5')}
                >
                  <Github className="size-3.5" />
                  Código
                  <span className="sr-only">de {project.name} no GitHub (abre em nova aba)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}

/** Capa para projetos sem prévia: monograma + composição abstrata, sem simular telas. */
function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden />
      <div
        className="absolute size-56 rounded-full bg-primary/25 blur-3xl glow transition-transform duration-700 group-hover:scale-125"
        aria-hidden
      />
      <div className="absolute size-40 translate-x-16 translate-y-6 rounded-full bg-accent/25 blur-3xl glow" aria-hidden />

      <div className="relative flex flex-col items-center gap-4">
        <BrandMark
          name={project.name}
          monogram={project.monogram ?? project.name[0]}
          className="size-20 rounded-3xl text-4xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg] sm:size-24 sm:text-5xl"
        />
        <span className="font-display text-lg font-bold tracking-tight text-foreground/80">{project.name}</span>
      </div>
    </div>
  )
}
