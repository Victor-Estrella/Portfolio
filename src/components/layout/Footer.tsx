import { ArrowUp, Mail } from 'lucide-react'

import { Github, Linkedin } from '@/components/icons'

import { profile } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/6 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <p className="font-medium">{profile.shortName}</p>
            <p className="text-xs text-muted-foreground">
              © {year} — Feito com React, Tailwind e muito café.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/6 hover:text-foreground"
          >
            <Mail className="size-4.5" />
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/6 hover:text-foreground"
          >
            <Github className="size-4.5" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/6 hover:text-foreground"
          >
            <Linkedin className="size-4.5" />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="ml-2 grid size-9 place-items-center rounded-full border border-white/10 bg-white/4 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
