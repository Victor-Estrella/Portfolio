import { Check, Globe, Lock } from 'lucide-react'

import { Github } from '@/components/icons'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

interface ProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Mídia */}
          <div
            className={cn(
              'relative flex items-center justify-center overflow-hidden border-b border-white/6 p-6 md:rounded-l-3xl md:border-r md:border-b-0',
              'bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_65%)]'
            )}
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" aria-hidden />
            <img
              src={project.image}
              alt={`Prévia do projeto ${project.name}`}
              className={cn(
                'relative rounded-xl shadow-2xl shadow-black/50',
                project.shot === 'mobile'
                  ? 'max-h-[22rem] w-auto object-contain md:max-h-[26rem]'
                  : 'w-full object-cover'
              )}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={project.type === 'mobile' ? 'accent' : 'default'}>
                  {project.type === 'mobile' ? 'Mobile' : 'Web'}
                </Badge>
                <Badge variant="secondary">{project.year}</Badge>
              </div>
              <DialogTitle className="text-gradient">{project.name}</DialogTitle>
              <DialogDescription>{project.tagline}</DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {project.description}
            </p>

            {/* Destaques */}
            <ul className="flex flex-col gap-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Stack */}
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack) => (
                  <span
                    key={stack.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/7 bg-white/3 px-3 py-2 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-white/6"
                  >
                    {stack.image ? (
                      <img src={stack.image} alt="" className="size-4 object-contain" />
                    ) : (
                      <i className={cn(stack.icon, 'text-base')} aria-hidden />
                    )}
                    {stack.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {project.links.github && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.links.github, '_blank', 'noopener,noreferrer')}
                >
                  <Github className="size-4" />
                  Ver código
                </Button>
              )}
              {project.links.site ? (
                <Button
                  variant="gradient"
                  onClick={() => window.open(project.links.site, '_blank', 'noopener,noreferrer')}
                >
                  <Globe className="size-4" />
                  Acessar site
                </Button>
              ) : (
                <Button variant="ghost" disabled className="cursor-not-allowed">
                  <Lock className="size-4" />
                  Sem site publicado
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
