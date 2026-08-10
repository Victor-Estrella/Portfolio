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
    tagline: 'Plataforma de dados ambientais para a Global Solution da FIAP',
    description:
      'Solução desenvolvida para a Global Solutions da FIAP com foco em sustentabilidade e impacto social. O projeto integrou frontend em Next.js com backend em Java e APIs Python para análise e visualização de dados ambientais. Participação em time multidisciplinar com foco em automação e acessibilidade.',
    year: '2025',
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
      'Integração de front-end Next.js com back-end Java e APIs Python',
      'Visualização de dados ambientais com foco em acessibilidade',
      'Trabalho em time multidisciplinar com automação de processos',
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
    tagline: 'Localização de motos em pátios com mapa interativo',
    description:
      'Aplicativo mobile criado para solucionar o principal problema interno da Mottu: a dificuldade de localizar motos nos pátios, especialmente quando não possuem placas ou quando o GPS está inativo. O app conta com um mapa interativo e integração futura com modelos de IA para reconhecimento visual, otimizando a rotina dos operadores.',
    year: '2025',
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
      'Mapa interativo para rastrear motos sem placa ou GPS',
      'Arquitetura preparada para reconhecimento visual por IA',
      'Fluxo desenhado a partir da rotina real dos operadores',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/SmartMottu-Mobile',
    },
  },
  {
    slug: 'safehub',
    name: 'SafeHub',
    tagline: 'Gestão de abrigos emergenciais em situações de crise',
    description:
      'Aplicativo desenvolvido para facilitar a gestão de abrigos emergenciais em situações de crise. Com funcionalidades como cadastro de abrigo, controle de estoque, dashboard, mapa com geolocalização e sistema de alertas por cor de pino (baseado na ocupação), o SafeHub ajuda na organização e monitoramento eficiente de recursos.',
    year: '2025',
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
      'Dashboard com controle de estoque e ocupação em tempo real',
      'Mapa com geolocalização e alertas por cor de pino',
      'Cadastro completo de abrigos e recursos disponíveis',
    ],
    links: {
      github: 'https://github.com/Victor-Estrella/SafeHub-Mobile',
    },
  },
]
