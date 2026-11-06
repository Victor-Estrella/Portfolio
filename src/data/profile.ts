export const profile = {
  name: 'Victor Henrique Estrella Carracci',
  shortName: 'Victor Estrella Carracci',
  initials: 'VE',
  role: 'Desenvolvedor Front-End & Mobile',
  location: 'São Paulo — SP, Brasil',
  available: true,
  availability: 'Disponível para novas oportunidades',

  summary:
    'Desenvolvo interfaces web e aplicativos mobile com React, Next.js e React Native — com componentes reutilizáveis, código tipado e integração com APIs REST.',

  /** Stack principal exibida no Hero e em destaque nas Skills */
  coreStack: ['React', 'TypeScript', 'Next.js', 'React Native', 'Expo'],

  /** PDF servido de `public/` — o link usa `download`, então o navegador baixa direto. */
  resumeUrl: '/curriculo-victor-carracci.pdf',
  resumeFileName: 'Curriculo-Victor-Carracci.pdf',

  /** Frases digitadas no Hero (componente TextType) */
  typewriter: [
    'interfaces responsivas e componentizadas',
    'integração com APIs REST',
    'apps mobile com React Native + Expo',
    'Clean Code, SOLID e foco na experiência do usuário',
  ] as string[],

  bio: [
    'Sou desenvolvedor Front-End e Mobile na Noweb, onde participo do desenvolvimento e da evolução de produtos web e mobile.',
    'No dia a dia, construo interfaces responsivas e componentizadas, integro o front-end com APIs REST, implemento novas funcionalidades e cuido da manutenção das aplicações — da correção de bugs à otimização de performance.',
    'Sou formado em Análise e Desenvolvimento de Sistemas pela FIAP e curso Engenharia de Software. Sigo estudando de forma contínua e uso projetos próprios para experimentar novas tecnologias e evoluir tecnicamente.',
  ],

  education: [
    { course: 'Engenharia de Software', degree: 'Bacharelado', school: 'FIAP', status: 'Em andamento' },
    { course: 'Análise e Desenvolvimento de Sistemas', degree: 'Tecnólogo', school: 'FIAP', status: 'Concluído · Dez/2025' },
  ],

  languages: [
    { name: 'Inglês', level: 'Intermediário' },
    { name: 'Espanhol', level: 'Intermediário' },
  ],

  contact: {
    email: 'victorhcarracci@gmail.com',
    github: 'https://github.com/Victor-Estrella',
    githubHandle: 'Victor-Estrella',
    linkedin: 'https://www.linkedin.com/in/victorcarracci/',
    linkedinHandle: 'victorcarracci',
    whatsapp: 'https://wa.me/5511971478515',
    whatsappLabel: '+55 (11) 97147-8515',
  },
} as const

export const navLinks = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'skills', label: 'Skills' },
  { id: 'contato', label: 'Contato' },
] as const

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
