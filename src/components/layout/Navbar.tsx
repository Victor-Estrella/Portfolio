import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'

import { Github, Linkedin } from '@/components/icons'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navLinks, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  // Trava o scroll do body enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500',
            scrolled
              ? 'border-white/10 bg-background/70 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          )}
        >
          {/* Marca */}
          <button
            onClick={() => goTo('home')}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2 pl-1 outline-none"
            aria-label="Ir para o início"
          >
            <span className="text-sm font-semibold tracking-tight">
              {profile.shortName}
              <span className="hidden text-[11px] font-normal text-muted-foreground sm:block">
                {profile.role}
              </span>
            </span>
          </button>

          {/* Links (desktop) */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/7"
                      />
                    )}
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Ações */}
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/7 hover:text-foreground sm:grid"
            >
              <Github className="size-4.5" />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/7 hover:text-foreground sm:grid"
            >
              <Linkedin className="size-4.5" />
            </a>

            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'hidden xl:inline-flex')}
            >
              <Download className="size-3.5" />
              Currículo
            </a>

            <Button size="sm" variant="gradient" className="hidden lg:inline-flex" onClick={() => goTo('contato')}>
              Contato
              <ArrowUpRight className="size-3.5" />
            </Button>

            {/* Toggle mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/4 text-foreground transition-colors hover:bg-white/9 lg:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-xl lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.ul
              className="flex h-full flex-col items-center justify-center gap-2 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border border-white/6 px-5 py-4 font-display text-xl font-semibold transition-colors',
                      active === link.id
                        ? 'bg-white/7 text-foreground'
                        : 'text-muted-foreground hover:bg-white/4 hover:text-foreground'
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 opacity-60" />
                  </button>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 flex w-full max-w-xs items-center justify-center gap-3"
              >
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/4"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/4"
                >
                  <Linkedin className="size-5" />
                </a>
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/4 px-5 text-sm font-medium"
                >
                  <Download className="size-4" />
                  Currículo
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
