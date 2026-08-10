export const profile = {
  name: 'Victor Henrique Estrella Carracci',
  shortName: 'Victor Estrella',
  initials: 'VE',
  role: 'Desenvolvedor Front-End',
  headline: 'Desenvolvedor Front-End | React · React Native · Next.js · TypeScript',
  location: 'São Paulo — SP, Brasil',
  objective: 'Estágio / Desenvolvedor Júnior em Desenvolvimento de Software',

  /** PDF servido de `public/` — o link usa `download`, então o navegador baixa direto. */
  resumeUrl: '/curriculo-victor-carracci.pdf',
  resumeFileName: 'Curriculo-Victor-Carracci.pdf',

  /** Frases digitadas no Hero (componente TextType) */
  typewriter: [
    'Desenvolvedor Front-End | React · React Native · Next.js',
    'Interfaces responsivas e integração com APIs REST',
    'Clean Code, SOLID e foco na experiência do usuário',
  ] as string[],

  bio: [
    'Desenvolvedor Front-End com experiência profissional no desenvolvimento de aplicações web e mobile utilizando React, React Native, Next.js e TypeScript.',
    'Atuo na criação de interfaces responsivas e reutilizáveis, integração com APIs REST, desenvolvimento de novas funcionalidades e manutenção de sistemas — incluindo correção de bugs e otimização de performance.',
    'Tenho conhecimentos em JavaScript, Tailwind CSS, Git, Docker e boas práticas como Clean Code e SOLID. Busco contribuir com soluções escaláveis, de qualidade e com foco na experiência do usuário.',
  ],


  contact: {
    email: 'victorhcarracci@gmail.com',
    github: 'https://github.com/Victor-Estrella',
    linkedin: 'https://www.linkedin.com/in/victorcarracci/',
    whatsapp: 'https://wa.me/5511971478515',
    whatsappLabel: '+55 (11) 97147-8515',
  },
} as const

export const navLinks = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
] as const

export const stats = [
  { value: 6, suffix: '', label: 'Projetos entregues' },
  { value: 3, suffix: '', label: 'Apps mobile' },
  { value: 16, suffix: '+', label: 'Tecnologias' },
  { value: 2, suffix: '+', label: 'Anos codando' },
] as const
