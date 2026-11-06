import { AnimatePresence, motion, useSpring } from 'motion/react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { navLinks, scrollToSection } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const sections = navLinks.filter((link) => link.id !== 'home')
const ids = navLinks.map((link) => link.id)

/**
 * Trilha numerada fixa na lateral — a mesma linguagem das etapas da história do
 * Hero, continuando pelo site inteiro. Só aparece em telas largas, depois do Hero.
 */
export default function SectionRail() {
  const active = useActiveSection(ids)
  const index = sections.findIndex((s) => s.id === active)
  const visible = index >= 0

  const fill = useSpring(0, { stiffness: 120, damping: 24 })
  useEffect(() => {
    fill.set(visible ? (index + 1) / sections.length : 0)
  }, [fill, index, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Seções"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 min-[1440px]:block"
        >
          <ol className="relative flex flex-col gap-3 pl-5">
            <span className="absolute top-1.5 bottom-1.5 left-[4px] w-[2px] rounded-full bg-border" aria-hidden />
            <motion.span
              className="absolute top-1.5 bottom-1.5 left-[4px] w-[2px] origin-top rounded-full bg-[linear-gradient(var(--primary),var(--accent))]"
              style={{ scaleY: fill }}
              aria-hidden
            />
            {sections.map((section, i) => {
              const isActive = i === index
              return (
                <li key={section.id} className="relative">
                  <span
                    className={cn(
                      'absolute top-1/2 -left-5 size-2.5 -translate-y-1/2 rounded-full border-2 transition-colors duration-300',
                      isActive ? 'border-primary bg-primary' : i < index ? 'border-primary bg-background' : 'border-border bg-background'
                    )}
                    aria-hidden
                  />
                  <button
                    onClick={() => scrollToSection(section.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex items-baseline gap-2 font-mono text-[11px] transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    0{i + 1}
                    {/* largura via CSS (max-width): animar width "auto" com o Motion cancelaria a rolagem suave */}
                    <span
                      className={cn(
                        'overflow-hidden font-display text-xs font-bold whitespace-nowrap transition-[max-width,opacity] duration-300',
                        isActive ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'
                      )}
                    >
                      {section.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
