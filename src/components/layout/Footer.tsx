import { ArrowUp } from 'lucide-react'

import SocialLinks from '@/components/SocialLinks'
import { navLinks, profile, scrollToSection } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center text-sm md:text-left">
          <p className="font-display font-semibold">{profile.name}</p>
          <p className="text-xs text-muted-foreground">
            {profile.role} · © {year}
          </p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {navLinks.slice(1).map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="transition-colors hover:text-foreground">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <SocialLinks include={['email', 'github', 'linkedin']} />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="ml-2 grid size-9 place-items-center rounded-full border border-border bg-foreground/[0.03] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
