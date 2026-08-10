export const profile = {
  name: 'Victor Henrique Estrella Carracci',
  shortName: 'Victor Estrella',
  initials: 'VE',
  role: 'Desenvolvedor Full Stack',
  headline: 'Desenvolvedor Full Stack | React · React Native · Spring Boot · TypeScript',
  location: 'São Paulo — SP, Brasil',
  available: true,
  availableLabel: 'Disponível para oportunidades',

  /**
   * Coloque o PDF do currículo em `public/curriculo.pdf`.
   * Se ficar `null`, o botão de currículo some do header automaticamente.
   */
  resumeUrl: '/curriculo.pdf' as string | null,

  bio: [
    'Desenvolvedor Full Stack com foco em aplicações web e mobile utilizando React, React Native, TypeScript e Java com Spring Boot.',
    'Tenho experiência na construção de sistemas com integração completa entre front-end e back-end, consumo e criação de APIs REST, persistência de dados e arquitetura modular. Atuei em projetos envolvendo geolocalização, dashboards analíticos e integração com IA Generativa para recomendações personalizadas.',
    'Valorizo código limpo, boas práticas (SOLID, Clean Code) e desenvolvimento orientado à performance e escalabilidade.',
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
  { value: 5, suffix: '+', label: 'Projetos entregues' },
  { value: 2, suffix: '+', label: 'Anos codando' },
  { value: 15, suffix: '+', label: 'Tecnologias' },
  { value: 3, suffix: '', label: 'Apps mobile' },
] as const
