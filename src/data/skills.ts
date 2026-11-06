/** Competências técnicas — conforme o currículo, sem itens só "para enfeitar". */
import type { TechIconName } from '@/components/TechIcon'

export type Skill = {
  name: string
  /** ícone de tecnologia; ausente em práticas (ex.: Clean Code) */
  icon?: TechIconName
}

const icon = {
  react: 'react',
  next: 'nextjs',
  ts: 'typescript',
  js: 'javascript',
  tailwind: 'tailwind',
  vue: 'vue',
  html: 'html',
  css: 'css',
  java: 'java',
  spring: 'spring',
  python: 'python',
  oracle: 'oracle',
  git: 'git',
  expo: 'expo',
  docker: 'docker',
  figma: 'figma',
} as const satisfies Record<string, TechIconName>

/** Stack principal — mesma ordem de `profile.coreStack` */
export const coreSkills: (Required<Skill> & { context: string })[] = [
  { name: 'React', icon: icon.react, context: 'Web' },
  { name: 'TypeScript', icon: icon.ts, context: 'Linguagem' },
  { name: 'Next.js', icon: icon.next, context: 'Web' },
  { name: 'React Native', icon: icon.react, context: 'Mobile' },
  { name: 'Expo', icon: icon.expo, context: 'Mobile' },
]

/** Áreas de atuação */
export const focusAreas = [
  {
    id: 'front',
    title: 'Front-End',
    text: 'Interfaces web responsivas e componentizadas, com tipagem forte e integração com APIs REST.',
    skills: [
      { name: 'React', icon: icon.react },
      { name: 'Next.js', icon: icon.next },
      { name: 'TypeScript', icon: icon.ts },
      { name: 'Tailwind CSS', icon: icon.tailwind },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    text: 'Aplicativos com React Native e Expo, do layout das telas à integração com o back-end.',
    skills: [
      { name: 'React Native', icon: icon.react },
      { name: 'Expo', icon: icon.expo },
      { name: 'TypeScript', icon: icon.ts },
    ],
  },
] as const

/** Inventário organizado */
export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: 'Linguagens',
    skills: [
      { name: 'TypeScript', icon: icon.ts },
      { name: 'JavaScript', icon: icon.js },
      { name: 'HTML', icon: icon.html },
      { name: 'CSS', icon: icon.css },
      { name: 'Java', icon: icon.java },
      { name: 'Python', icon: icon.python },
      { name: 'SQL (Oracle)', icon: icon.oracle },
    ],
  },
  {
    title: 'Frameworks e bibliotecas',
    skills: [
      { name: 'React', icon: icon.react },
      { name: 'Next.js', icon: icon.next },
      { name: 'React Native', icon: icon.react },
      { name: 'Tailwind CSS', icon: icon.tailwind },
      { name: 'Vue.js', icon: icon.vue },
      { name: 'Spring Boot', icon: icon.spring },
    ],
  },
  {
    title: 'Ferramentas e práticas',
    skills: [
      { name: 'Git', icon: icon.git },
      { name: 'Expo', icon: icon.expo },
      { name: 'Docker', icon: icon.docker },
      { name: 'Figma', icon: icon.figma },
      { name: 'Clean Code' },
      { name: 'SOLID' },
    ],
  },
]
