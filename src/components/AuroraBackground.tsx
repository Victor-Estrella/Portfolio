import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  /**
   * `hero`   → luz forte vinda dos cantos superiores + feixe central
   * `top`    → brilho suave saindo do topo da seção
   * `bottom` → brilho saindo da base (seção de fechamento)
   */
  variant?: 'hero' | 'top' | 'bottom'
  className?: string
}

/**
 * Fundo de luz em camadas (gradientes radiais em movimento lento) + grão.
 * Só CSS: sem canvas, sem custo de JS. As cores vêm dos tokens `--aurora-*`,
 * então se adaptam aos temas claro e escuro.
 */
export default function AuroraBackground({ variant = 'top', className }: AuroraBackgroundProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {variant === 'hero' && (
        <>
          <div className="absolute -top-[35%] -left-[20%] h-[85%] w-[70%] rounded-full bg-[radial-gradient(closest-side,var(--aurora-cyan),transparent)] blur-2xl animate-aurora-a" />
          <div className="absolute -top-[30%] -right-[20%] h-[90%] w-[70%] rounded-full bg-[radial-gradient(closest-side,var(--aurora-violet),transparent)] blur-2xl animate-aurora-b" />
          <div className="absolute top-[-20%] left-1/2 h-[75%] w-[min(560px,80vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--aurora-beam),transparent)]" />
          <div className="absolute -bottom-[40%] left-1/2 h-[70%] w-[min(1100px,130vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side_at_35%_50%,var(--aurora-blue),transparent),radial-gradient(closest-side_at_68%_55%,var(--aurora-violet),transparent)] opacity-70 blur-2xl animate-aurora-a [animation-delay:-8s]" />
        </>
      )}

      {variant === 'top' && (
        <>
          <div className="absolute -top-[30%] left-[5%] h-[60%] w-[55%] rounded-full bg-[radial-gradient(closest-side,var(--aurora-blue),transparent)] opacity-70 blur-2xl animate-aurora-a" />
          <div className="absolute -top-[25%] right-[0%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(closest-side,var(--aurora-violet),transparent)] opacity-60 blur-2xl animate-aurora-b" />
        </>
      )}

      {variant === 'bottom' && (
        <div className="absolute -bottom-[25%] left-1/2 h-[75%] w-[min(1200px,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side_at_30%_55%,var(--aurora-cyan),transparent),radial-gradient(closest-side_at_52%_60%,var(--aurora-blue),transparent),radial-gradient(closest-side_at_72%_55%,var(--aurora-violet),transparent)] blur-2xl animate-aurora-b" />
      )}

      <div className="grain absolute inset-0" />
    </div>
  )
}
