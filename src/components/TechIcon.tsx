import type { CSSProperties } from 'react'

import react from 'devicon/icons/react/react-original.svg'
import nextjs from 'devicon/icons/nextjs/nextjs-plain.svg'
import typescript from 'devicon/icons/typescript/typescript-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import tailwind from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import vue from 'devicon/icons/vuejs/vuejs-original.svg'
import html from 'devicon/icons/html5/html5-original.svg'
import css from 'devicon/icons/css3/css3-original.svg'
import java from 'devicon/icons/java/java-original.svg'
import spring from 'devicon/icons/spring/spring-original.svg'
import python from 'devicon/icons/python/python-original.svg'
import oracle from 'devicon/icons/oracle/oracle-original.svg'
import git from 'devicon/icons/git/git-original.svg'
import expo from 'devicon/icons/expo/expo-original.svg'
import docker from 'devicon/icons/docker/docker-original.svg'
import figma from 'devicon/icons/figma/figma-original.svg'
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg'

import { cn } from '@/lib/utils'

/**
 * SVGs individuais do devicon: só os ícones usados entram no bundle
 * (em vez da fonte completa de ~1,5 MB). Ícones `mono` herdam a cor do texto,
 * então funcionam nos temas claro e escuro.
 */
const icons = {
  react: { src: react },
  nextjs: { src: nextjs, mono: true },
  typescript: { src: typescript },
  javascript: { src: javascript },
  tailwind: { src: tailwind },
  vue: { src: vue },
  html: { src: html },
  css: { src: css },
  java: { src: java },
  spring: { src: spring },
  python: { src: python },
  oracle: { src: oracle },
  git: { src: git },
  expo: { src: expo, mono: true },
  docker: { src: docker },
  figma: { src: figma },
  nodejs: { src: nodejs },
} satisfies Record<string, { src: string; mono?: boolean }>

export type TechIconName = keyof typeof icons

interface TechIconProps {
  name: TechIconName
  /** o tamanho segue o `font-size` (use classes `text-*`) */
  className?: string
}

export default function TechIcon({ name, className }: TechIconProps) {
  const icon: { src: string; mono?: boolean } = icons[name]

  if (icon.mono) {
    const mask = `url("${icon.src}") center / contain no-repeat`
    return (
      <span
        aria-hidden
        className={cn('inline-block size-[1em] shrink-0 bg-current align-[-0.125em]', className)}
        style={{ mask, WebkitMask: mask } as CSSProperties}
      />
    )
  }

  return (
    <img
      src={icon.src}
      alt=""
      aria-hidden
      decoding="async"
      className={cn('inline-block size-[1em] shrink-0 align-[-0.125em]', className)}
    />
  )
}
