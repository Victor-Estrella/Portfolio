/** Etapas da história "Do código à tela" — textos baseados no currículo. */

export const STORY_STEPS = [
  {
    id: 'web',
    tab: 'Web',
    title: 'Interfaces web componentizadas.',
    text: 'Sites e aplicações com React, Next.js e TypeScript — responsivos, com componentes reutilizáveis e tipagem do começo ao fim.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    cta: { label: 'Ver projetos', target: 'projetos' },
    bg: '#2563eb',
    /** progresso em que a etapa fica em foco (clique na aba) */
    focus: 0.3,
  },
  {
    id: 'mobile',
    tab: 'Mobile',
    title: 'Apps na mão de quem usa.',
    text: 'Aplicativos com React Native e Expo, usando a mesma base de componentes e tipagem da web.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    cta: { label: 'Ver experiência', target: 'experiencia' },
    bg: '#0b0d12',
    focus: 0.56,
  },
  {
    id: 'api',
    tab: 'Integrações',
    title: 'Front conectado ao back.',
    text: 'Consumo de APIs REST com estados de carregamento e erro tratados, em diálogo direto com o time de back-end.',
    stack: ['APIs REST', 'Git', 'Clean Code'],
    cta: { label: 'Ver skills', target: 'skills' },
    bg: '#5b21b6',
    focus: 0.83,
  },
] as const

/** Limites entre etapas (para a aba ativa) */
export const stepAt = (p: number) => (p < 0.44 ? 0 : p < 0.68 ? 1 : 2)
