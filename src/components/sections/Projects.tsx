import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import { Github } from '@/components/icons'
import SectionHeading from '@/components/sections/SectionHeading'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectDialog from '@/components/projects/ProjectDialog'
import { buttonVariants } from '@/components/ui/button'
import { profile } from '@/data/profile'
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

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelected(project)
    setOpen(true)
  }

  return (
    <section id="projetos" className="relative overflow-hidden px-4 py-24 sm:py-32">
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
          <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
            {ownProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} onOpen={() => openProject(project)} />
            ))}
          </div>
        </div>

        {/* Acadêmicos e pessoais */}
        <div className="mt-16 sm:mt-20">
          <GroupHeading
            title="Projetos acadêmicos e pessoais"
            description="Aplicações web e mobile desenvolvidas na FIAP e em estudos próprios, com estudo de caso de cada uma."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {studyProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} onOpen={() => openProject(project)} />
            ))}
          </div>
        </div>
      </div>

      <ProjectDialog project={selected} open={open} onOpenChange={setOpen} />
    </section>
  )
}
