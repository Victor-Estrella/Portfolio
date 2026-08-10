import enova from '@/assets/enova.png'
import porto from '@/assets/porto.png'
import smartmottu from '@/assets/smartmottu.png'
import safehub from '@/assets/safehub.png'
import soulbalance from '@/assets/soulbalance.png'
import gemini from '@/assets/gemini.webp'

export type StackItem = {
  name: string
  /** classe do devicon (ex.: `devicon-react-original colored`) */
  icon?: string
  /** imagem usada quando não existe ícone no devicon */
  image?: string
}

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  year: string
  type: 'web' | 'mobile'
  /** define o enquadramento da imagem no card/modal */
  shot: 'desktop' | 'mobile'
  image: string
  stacks: StackItem[]
  highlights: string[]
  links: {
    github?: string
    site?: string
  }
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'enova',
    name: 'Enova',
    tagline: 'Plataforma web para monitoramento de energia renovável',
    description:
      'Plataforma para monitoramento e gestão de sistemas de energia renovável, desenvolvida para a Global Solution da FIAP. Atuei como Desenvolvedor Front-End refatorando a SPA para SSR com Next.js, o que aumentou desempenho e SEO, além de construir a interface responsiva e integrar as APIs de análise de dados energéticos.',
    year: 'Dez/2024',
    type: 'web',
    shot: 'desktop',
    image: enova,
    featured: true,
    stacks: [
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' },
      { name: 'Python', icon: 'devicon-python-plain colored' },
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
    tagline: 'Proposta de inovação com dados em tempo real',
    description:
      'Desenvolvido como proposta de inovação para a Porto Seguro, esse projeto envolveu a construção de uma aplicação front-end com React e TypeScript, depois refatorada para Next.js. A solução consumia uma API Java e apresentava dados em tempo real, com foco em segurança e experiência do usuário.',
    year: '2024',
    type: 'web',
    shot: 'desktop',
    image: porto,
    featured: true,
    stacks: [
      { name: 'React.js', icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' },
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
    tagline: 'Mentora digital com IA Generativa para bem-estar',
    description:
      'Aplicativo mobile que utiliza IA Generativa para promover autoconsciência, equilíbrio entre performance e bem-estar, e desenvolvimento humano personalizado. A plataforma atua como uma mentora digital, interpretando dados diários do usuário e gerando recomendações, análises e experiências de autocuidado.',
    year: '2026',
    type: 'mobile',
    shot: 'mobile',
    image: soulbalance,
    featured: true,
    stacks: [
      { name: 'React Native (Expo)', icon: 'devicon-react-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored' },
      { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored' },
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
    tagline: 'Mapeamento inteligente de pátio com QR Code e visão computacional',
    description:
      'Aplicativo para mapeamento inteligente de pátio e gestão de motos, criado para resolver a dificuldade de localizar veículos sem placa ou com GPS inativo. Combina leitura de QR Code, visão computacional e mapa interativo, com backend próprio em Java Spring Boot e banco Oracle SQL.',
    year: 'Mai/2025',
    type: 'mobile',
    shot: 'mobile',
    image: smartmottu,
    stacks: [
      { name: 'React Native (Expo)', icon: 'devicon-react-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored' },
      { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored' },
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
    tagline: 'Cadastro e mapeamento de abrigos com geolocalização',
    description:
      'Aplicativo para cadastro e mapeamento de abrigos emergenciais em desastres naturais, com status de ocupação e controle de estoque. Inclui geocodificação de endereços em coordenadas, cálculo de rotas e alertas por cor de pino conforme a lotação de cada abrigo.',
    year: 'Jun/2025',
    type: 'mobile',
    shot: 'mobile',
    image: safehub,
    stacks: [
      { name: 'React Native (Expo)', icon: 'devicon-react-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Java (Spring Boot)', icon: 'devicon-java-plain colored' },
      { name: 'CSS-In-JS', icon: 'devicon-css3-plain colored' },
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
