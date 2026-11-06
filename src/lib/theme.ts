import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { light: '#f8f9fb', dark: '#0b0c0f' }
const listeners = new Set<() => void>()

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLORS[theme]))
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  // Sem escolha salva, acompanha a preferência do sistema em tempo real
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = (e: MediaQueryListEvent) => {
    if (!readStored()) applyTheme(e.matches ? 'dark' : 'light')
  }
  mql.addEventListener('change', onSystemChange)

  return () => {
    listeners.delete(listener)
    mql.removeEventListener('change', onSystemChange)
  }
}

/**
 * Tema atual + alternância. O tema inicial é aplicado por um script inline
 * em `index.html` (antes do primeiro paint), então não há flash de tema errado.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'

    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage bloqueado: o tema muda só nesta visita */
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next)
      return
    }

    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => applyTheme(next))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })
      .catch(() => {})
  }, [])

  return { theme, toggleTheme }
}
