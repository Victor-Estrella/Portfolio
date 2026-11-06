import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'

import SocialLinks from '@/components/SocialLinks'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navLinks, profile, scrollToSection } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  // Trava o scroll do body e permite fechar com Esc enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    if (menuOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const goTo = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <a
        href="#sobre"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          aria-label="Navegação principal"
          className={cn(
            'flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500',
            scrolled
              ? 'border-border bg-background/75 shadow-[var(--shadow-card)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          )}
        >
          {/* Marca */}
          <button
            onClick={() => goTo('home')}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2 pl-1 outline-none"
            aria-label="Ir para o início"
          >
            <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] font-display text-xs font-bold text-primary-foreground transition-transform duration-300 group-hover:rotate-[-8deg]">
              {profile.initials}
            </span>
            <span className="text-left text-sm leading-tight font-semibold tracking-tight">
              {profile.shortName}
              <span className="hidden text-[11px] font-normal text-muted-foreground sm:block">{profile.role}</span>
            </span>
          </button>

          {/* Links (desktop) */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full border border-border bg-foreground/[0.06]"
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
            <SocialLinks className="hidden gap-0.5 sm:flex lg:hidden xl:flex" />
            <ThemeToggle />

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
              aria-controls="mobile-menu"
              className="grid size-9 place-items-center rounded-full border border-border bg-foreground/[0.03] text-foreground transition-colors hover:bg-foreground/[0.08] lg:hidden"
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
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/92 backdrop-blur-xl lg:hidden"
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
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border border-border px-5 py-3.5 font-display text-xl font-semibold transition-colors',
                      active === link.id
                        ? 'bg-foreground/[0.06] text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground'
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-primary">0{i + 1}</span>
                      {link.label}
                    </span>
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
                <SocialLinks
                  className="gap-3"
                  itemClassName="size-11 border border-border bg-foreground/[0.03]"
                  iconClassName="size-5"
                />
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-5 text-sm font-medium"
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
