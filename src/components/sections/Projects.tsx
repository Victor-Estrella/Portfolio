import { useState } from 'react'
import { motion } from 'motion/react'
import { Github } from '@/components/icons'

import SectionHeading from '@/components/sections/SectionHeading'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectDialog from '@/components/projects/ProjectDialog'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import { projects, type Project } from '@/data/projects'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelected(project)
    setOpen(true)
  }

  return (
    <section id="projetos" className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-0 left-1/2 size-[18rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[110px] sm:size-[34rem] sm:blur-[160px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projetos"
          title="Alguns produtos que construí"
          description="Cada projeto nasceu de um problema real — clique em um card para ver os detalhes técnicos."
        />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => openProject(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(profile.contact.github, '_blank', 'noopener,noreferrer')}
          >
            <Github className="size-4" />
            Ver todos no GitHub
          </Button>
        </motion.div>
      </div>

      <ProjectDialog project={selected} open={open} onOpenChange={setOpen} />
    </section>
  )
}
