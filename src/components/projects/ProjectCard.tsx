import type { MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Globe } from 'lucide-react'

import { Github } from '@/components/icons'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: () => void
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()

  // posição do mouse em % (usada no spotlight)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 })

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}% ${mouseY}%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)`

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    mouseX.set(px * 100)
    mouseY.set(py * 100)

    if (!reduceMotion) {
      tiltY.set((px - 0.5) * 9)
      tiltX.set((0.5 - py) * 9)
    }
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/7 bg-card/50 backdrop-blur-sm transition-colors duration-500 outline-none hover:border-primary/25 focus-visible:border-primary/50"
      >
        {/* spotlight que segue o mouse */}
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Preview — mesma proporção nos dois formatos para os cards alinharem */}
        <div
          className={cn(
            'relative aspect-2/1 overflow-hidden border-b border-white/6',
            project.shot === 'mobile'
              ? 'flex items-center justify-center bg-[radial-gradient(circle_at_50%_115%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_62%)]'
              : 'bg-black/40'
          )}
        >
          <img
            src={project.image}
            alt={`Prévia do projeto ${project.name}`}
            loading="lazy"
            decoding="async"
            className={cn(
              'transition-transform duration-700 ease-out group-hover:scale-[1.06]',
              project.shot === 'mobile'
                ? 'h-[135%] w-auto translate-y-10 rounded-xl object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]'
                : 'size-full object-cover object-top'
            )}
          />

          <div className="absolute top-3 left-3 z-2 flex gap-1.5">
            <Badge variant={project.type === 'mobile' ? 'accent' : 'default'}>
              {project.type === 'mobile' ? 'Mobile' : 'Web'}
            </Badge>
            <Badge variant="secondary">{project.year}</Badge>
          </div>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-card/90 to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-2 flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">{project.name}</h3>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/4 text-muted-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/15 group-hover:text-primary">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{project.tagline}</p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.stacks.slice(0, 4).map((stack) => (
              <Badge key={stack.name} variant="secondary" className="text-[10px]">
                {stack.name}
              </Badge>
            ))}
            {project.stacks.length > 4 && (
              <Badge variant="secondary" className="text-[10px]">
                +{project.stacks.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-white/6 pt-4 text-xs text-muted-foreground">
            {project.links.github && (
              <span className="inline-flex items-center gap-1.5">
                <Github className="size-3.5" />
                Código
              </span>
            )}
            {project.links.site && (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <Globe className="size-3.5" />
                Site online
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
