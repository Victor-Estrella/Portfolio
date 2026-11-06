import cageLogo from '@/assets/products/cage.webp'
import pulsoLogo from '@/assets/products/pulso.webp'
import ponticLogo from '@/assets/products/pontic.webp'

/**
 * Experiência profissional.
 *
 * Os produtos NÃO têm stack nem detalhes de funcionalidades de propósito:
 * a ideia é mostrar participação no desenvolvimento e evolução, sem atribuir
 * tecnologias ou contribuições específicas.
 *
 * Para usar a logo oficial de um produto, coloque o arquivo em
 * `src/assets/products/`, importe aqui e preencha `logo`.
 * Descrição e link só devem ser preenchidos com informações públicas e autorizadas.
 */

export type Product = {
  name: string
  /** imagem da logo oficial (opcional) — sem ela é exibido um monograma */
  logo?: string
  /** monograma exibido quando não há logo */
  monogram: string
  /** matiz (0–360) do monograma — apenas visual, não é a cor oficial da marca */
  hue: number
  /** descrição pública e geral do produto */
  description?: string
  /** endereço público do produto */
  url?: string
}

export type Role = {
  company: string
  title: string
  area: string
  period: { start: string; end: string }
  current: boolean
  summary: string
  /** atividades conforme o currículo */
  activities: string[]
  products: Product[]
}

export const experience: Role[] = [
  {
    company: 'Noweb',
    title: 'Desenvolvedor Júnior',
    area: 'Front-End & Mobile',
    period: { start: 'Abr 2026', end: 'Atual' },
    current: true,
    summary:
      'Desenvolvimento e manutenção de aplicações web e mobile, em colaboração com o time de back-end e com foco na evolução contínua dos sistemas.',
    activities: [
      'Desenvolvimento e manutenção de aplicações web e mobile',
      'Interfaces modernas, responsivas e reutilizáveis',
      'Integração com APIs REST entre front-end e back-end',
      'Implementação de novas funcionalidades',
      'Correção de bugs e otimização de performance',
      'Versionamento com Git no fluxo de desenvolvimento do time',
    ],
    products: [
      { name: 'Cage CRM', logo: cageLogo, monogram: 'C', hue: 290 },
      { name: 'Cage Mobile', logo: cageLogo, monogram: 'C', hue: 290 },
      { name: 'Pulso', logo: pulsoLogo, monogram: 'P', hue: 120 },
      { name: 'Pontic', logo: ponticLogo, monogram: 'P', hue: 350 },
      { name: 'Pontic Mobile', logo: ponticLogo, monogram: 'P', hue: 350 },
    ],
  },
]

export const PRODUCT_FALLBACK_DESCRIPTION = 'Participação no desenvolvimento e na evolução do produto.'
