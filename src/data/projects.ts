import enova from '@/assets/enova.webp'
import porto from '@/assets/porto.webp'
import smartmottu from '@/assets/smartmottu.webp'
import safehub from '@/assets/safehub.webp'
import soulbalance from '@/assets/soulbalance.webp'
import gemini from '@/assets/gemini.webp'
import desenrola from '@/assets/desenrola.webp'
import bitsbyte from '@/assets/bitsbyte.webp'
import type { TechIconName } from '@/components/TechIcon'

export type StackItem = {
  name: string
  icon?: TechIconName
  /** imagem usada quando não existe ícone no devicon */
  image?: string
}

/**
 * `own`       → projeto próprio
 * `collab`    → colaboração
 * `academic`  → projeto acadêmico / challenge
 */
export type ProjectKind = 'own' | 'collab' | 'academic'

export type Project = {
  slug: string
  name: string
  kind: ProjectKind
  /** rótulo exibido no card (ex.: "Projeto acadêmico · FIAP") */
  category: string
  tagline: string
  description: string
  year?: string
  platform: 'web' | 'mobile'
  /** prévia do projeto; sem ela o card mostra uma capa com monograma */
  image?: string
  /** define o enquadramento da imagem no card/modal */
  shot?: 'desktop' | 'mobile'
  monogram?: string
  /** escopo do trabalho realizado (usado quando não há stack confirmada) */
  scope?: string[]
  /** só tecnologias efetivamente usadas por mim no projeto */
  stacks?: StackItem[]
  /** entregas — quando presentes, habilitam o "estudo de caso" */
  highlights?: string[]
  links: {
    github?: string
    site?: string
  }
}

export const projects: Project[] = [
  /* ---------------- Projetos próprios e colaborações ---------------- */
  {
    slug: 'desenrola',
    name: 'Desenrola',
    kind: 'own',
    category: 'Projeto próprio · Software house',
    tagline: 'Software house própria — site institucional e presença digital',
    description:
      'Projeto próprio de software house. Desenvolvi o site institucional, a identidade digital e a experiência de navegação da marca.',
    platform: 'web',
    shot: 'desktop',
    image: desenrola,
    monogram: 'D',
    scope: ['Site institucional', 'Identidade digital', 'Experiência de navegação'],
    links: {
      site: 'https://desenrola.sh',
    },
  },
  {
    slug: 'bitsbyte',
    name: 'BitsByte',
    kind: 'collab',
    category: 'Colaboração · Web',
    tagline: 'Desenvolvimento web e presença digital',
    description:
      'Projeto de desenvolvimento web e presença digital, no qual trabalhei no site institucional.',
    platform: 'web',
    shot: 'desktop',
    image: bitsbyte,
    monogram: 'B',
    scope: ['Site institucional', 'Presença digital'],
    links: {
      site: 'https://bitsbyte.com.br',
    },
  },

  /* ---------------- Projetos acadêmicos e pessoais ---------------- */
  {
    slug: 'enova',
    name: 'Enova',
    kind: 'academic',
    category: 'Projeto acadêmico · FIAP',
    tagline: 'Plataforma web para monitoramento de energia renovável',
    description:
      'Plataforma para monitoramento e gestão de sistemas de energia renovável, desenvolvida para a Global Solution da FIAP. Atuei como Desenvolvedor Front-End refatorando a SPA para SSR com Next.js, o que aumentou desempenho e SEO, além de construir a interface responsiva e integrar as APIs de análise de dados energéticos.',
    year: 'Dez/2024',
    platform: 'web',
    shot: 'desktop',
    image: enova,
    stacks: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
    ],
    highlights: [
      'Refatoração de SPA para SSR (Next.js), melhorando desempenho e SEO',
      'Interface responsiva com Next.js e Tailwind CSS',
      'Cálculos de eficiência energética com Python e Java + dashboard de métricas',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/Enova',
      site: 'https://enova-omega.vercel.app',
    },
  },
  {
    slug: 'porto-seguro',
    name: 'Porto Seguro',
    kind: 'academic',
    category: 'Challenge · Porto Seguro',
    tagline: 'Proposta de inovação com dados em tempo real',
    description:
      'Desenvolvido como proposta de inovação para a Porto Seguro, esse projeto envolveu a construção de uma aplicação front-end com React e TypeScript, depois refatorada para Next.js. A solução consumia uma API Java e apresentava dados em tempo real, com foco em segurança e experiência do usuário.',
    year: '2024',
    platform: 'web',
    shot: 'desktop',
    image: porto,
    stacks: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java', icon: 'java' },
    ],
    highlights: [
      'Migração de React + TypeScript para Next.js',
      'Consumo de API Java com dados em tempo real',
      'Foco em segurança e experiência do usuário',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/Porto-Seguro-Challenge',
      site: 'https://challengeporto.vercel.app',
    },
  },
  {
    slug: 'soulbalance',
    name: 'SoulBalance',
    kind: 'academic',
    category: 'App mobile · IA generativa',
    tagline: 'Mentora digital com IA Generativa para bem-estar',
    description:
      'Aplicativo mobile que utiliza IA Generativa para promover autoconsciência, equilíbrio entre performance e bem-estar, e desenvolvimento humano personalizado. A plataforma atua como uma mentora digital, interpretando dados diários do usuário e gerando recomendações, análises e experiências de autocuidado.',
    year: '2026',
    platform: 'mobile',
    shot: 'mobile',
    image: soulbalance,
    stacks: [
      { name: 'React Native (Expo)', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java (Spring Boot)', icon: 'java' },
      { name: 'CSS-in-JS', icon: 'css' },
      { name: 'Gemini 2.5 Flash', image: gemini },
    ],
    highlights: [
      'Recomendações personalizadas geradas pelo Gemini 2.5 Flash',
      'Leitura de dados diários do usuário para análises de bem-estar',
      'API própria em Spring Boot com persistência de histórico',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/SoulBalance-Mobile',
    },
  },
  {
    slug: 'smartmottu',
    name: 'SmartMottu',
    kind: 'academic',
    category: 'Projeto acadêmico · FIAP',
    tagline: 'Mapeamento inteligente de pátio com QR Code e visão computacional',
    description:
      'Aplicativo para mapeamento inteligente de pátio e gestão de motos, criado para resolver a dificuldade de localizar veículos sem placa ou com GPS inativo. Combina leitura de QR Code, visão computacional e mapa interativo, com backend próprio em Java Spring Boot e banco Oracle SQL.',
    year: 'Mai/2025',
    platform: 'mobile',
    shot: 'mobile',
    image: smartmottu,
    stacks: [
      { name: 'React Native (Expo)', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java (Spring Boot)', icon: 'java' },
      { name: 'CSS-in-JS', icon: 'css' },
    ],
    highlights: [
      'Gestão de motos com QR Code, visão computacional e mapa interativo',
      'Formulários com estado e armazenamento local via AsyncStorage',
      'Integração com backend Java Spring Boot e banco Oracle SQL',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/SmartMottu-Mobile',
    },
  },
  {
    slug: 'safehub',
    name: 'SafeHub',
    kind: 'academic',
    category: 'Projeto acadêmico · FIAP',
    tagline: 'Cadastro e mapeamento de abrigos com geolocalização',
    description:
      'Aplicativo para cadastro e mapeamento de abrigos emergenciais em desastres naturais, com status de ocupação e controle de estoque. Inclui geocodificação de endereços em coordenadas, cálculo de rotas e alertas por cor de pino conforme a lotação de cada abrigo.',
    year: 'Jun/2025',
    platform: 'mobile',
    shot: 'mobile',
    image: safehub,
    stacks: [
      { name: 'React Native (Expo)', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java (Spring Boot)', icon: 'java' },
      { name: 'CSS-in-JS', icon: 'css' },
    ],
    highlights: [
      'Geocodificação de endereços em coordenadas para o mapa',
      'Integração com OpenStreetMap, Nominatim e OpenRouteService para rotas',
      'Controle de estoque e status de ocupação com alertas por cor de pino',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/SafeHub-Mobile',
    },
  },
]

export const ownProjects = projects.filter((p) => p.kind !== 'academic')
export const studyProjects = projects.filter((p) => p.kind === 'academic')

export const hasCaseStudy = (project: Project) => (project.highlights?.length ?? 0) > 0
