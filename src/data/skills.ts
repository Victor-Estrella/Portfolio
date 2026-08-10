export type Skill = {
  name: string
  icon: string
  category: 'front' | 'back' | 'tools'
}

/** Competências técnicas conforme o currículo */
export const skills: Skill[] = [
  { name: 'React', icon: 'devicon-react-original colored', category: 'front' },
  { name: 'React Native', icon: 'devicon-react-original colored', category: 'front' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', category: 'front' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', category: 'front' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', category: 'front' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', category: 'front' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain colored', category: 'front' },
  { name: 'HTML5', icon: 'devicon-html5-plain colored', category: 'front' },
  { name: 'CSS3', icon: 'devicon-css3-plain colored', category: 'front' },
  { name: 'Java', icon: 'devicon-java-plain colored', category: 'back' },
  { name: 'Spring Boot', icon: 'devicon-spring-plain colored', category: 'back' },
  { name: 'Python', icon: 'devicon-python-plain colored', category: 'back' },
  { name: 'Oracle SQL', icon: 'devicon-oracle-original colored', category: 'back' },
  { name: 'Git', icon: 'devicon-git-plain colored', category: 'tools' },
  { name: 'Expo', icon: 'devicon-expo-original', category: 'tools' },
  { name: 'Docker', icon: 'devicon-docker-plain colored', category: 'tools' },
  { name: 'Figma', icon: 'devicon-figma-plain colored', category: 'tools' },
]

export const skillCategories = [
  { id: 'all', label: 'Tudo' },
  { id: 'front', label: 'Front-end' },
  { id: 'back', label: 'Back-end' },
  { id: 'tools', label: 'Ferramentas' },
] as const

export type SkillCategory = (typeof skillCategories)[number]['id']
