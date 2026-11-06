import { ArrowUpRight, Check, Globe } from 'lucide-react'

import { Github } from '@/components/icons'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import TechIcon from '@/components/TechIcon'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

interface ProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Estudo de caso — só é aberto para projetos com entregas documentadas. */
export default function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Mídia */}
          {project.image && (
            <div className="relative flex items-center justify-center overflow-hidden border-b border-border bg-elevated p-4 sm:p-6 md:rounded-l-3xl md:border-r md:border-b-0">
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_65%)]"
              />
              <img
                src={project.image}
                alt={`Prévia do projeto ${project.name}`}
                className={cn(
                  'relative rounded-xl shadow-[var(--shadow-float)]',
                  project.shot === 'mobile'
                    ? 'max-h-[15rem] w-auto object-contain sm:max-h-[20rem] md:max-h-[26rem]'
                    : 'w-full object-cover'
                )}
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-5 p-5 sm:p-7 lg:p-8">
            <DialogHeader>
              <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
                Estudo de caso · {project.category}
              </p>
              <DialogTitle className="text-gradient pr-10">{project.name}</DialogTitle>
              <DialogDescription>{project.tagline}</DialogDescription>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge variant={project.platform === 'mobile' ? 'accent' : 'default'}>
                  {project.platform === 'mobile' ? 'Mobile' : 'Web'}
                </Badge>
                {project.year && <Badge variant="secondary">{project.year}</Badge>}
              </div>
            </DialogHeader>

            <div>
              <p className="mb-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Contexto</p>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{project.description}</p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  Principais entregas
                </p>
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
              </div>
            )}

            {project.stacks && project.stacks.length > 0 && (
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stacks.map((stack) => (
                    <span
                      key={stack.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-3 py-2 text-xs font-medium"
                    >
                      {stack.image ? (
                        <img src={stack.image} alt="" className="size-4 object-contain" />
                      ) : (
                        stack.icon && <TechIcon name={stack.icon} className="text-base" />
                      )}
                      {stack.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.links.github || project.links.site) && (
              <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
                {project.links.site && (
                  <a
                    href={project.links.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'gradient' })}
                  >
                    <Globe className="size-4" />
                    Acessar site
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'outline' })}
                  >
                    <Github className="size-4" />
                    Ver código
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
