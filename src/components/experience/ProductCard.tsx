import { motion } from 'motion/react'
import { ArrowUpRight, Briefcase } from 'lucide-react'

import BrandMark from '@/components/BrandMark'
import { PRODUCT_FALLBACK_DESCRIPTION, type Product } from '@/data/experience'

interface ProductCardProps {
  product: Product
  company: string
  index: number
}

export default function ProductCard({ product, company, index }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="surface group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* linha de brilho no topo ao passar o mouse */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-center gap-3.5">
        <BrandMark
          name={product.name}
          monogram={product.monogram}
          logo={product.logo}
          hue={product.hue}
          className="size-11 text-base transition-transform duration-300 group-hover:scale-105"
        />
        <h4 className="min-w-0 truncate font-display text-base font-bold tracking-tight">{product.name}</h4>
      </div>

      <p className="mt-4 mb-4 text-[0.8rem] leading-relaxed text-muted-foreground text-pretty">
        {product.description ?? PRODUCT_FALLBACK_DESCRIPTION}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
        <span className="inline-flex items-center gap-1.5 text-[11px] whitespace-nowrap text-muted-foreground">
          <Briefcase className="size-3 text-primary" />
          Experiência profissional · {company}
        </span>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Acessar
            <ArrowUpRight className="size-3.5" />
            <span className="sr-only"> {product.name} (abre em nova aba)</span>
          </a>
        )}
      </div>
    </motion.article>
  )
}
