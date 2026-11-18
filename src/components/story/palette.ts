/** Paleta e conteúdo fixos da história "Do código à tela" (iguais nos dois temas). */

export const INK = '#0b1226'
export const PAPER = '#f4f8ff'
export const BLUE = '#2563eb'
export const NAVY = '#1e40af'
export const SKY = '#38bdf8'

export const C = {
  kw: '#93c5fd',
  fn: '#60a5fa',
  str: '#a5f3fc',
  tag: '#7dd3fc',
  attr: '#bfdbfe',
  txt: '#e4edfb',
  pun: '#67e8f9',
  dim: '#64748b',
}

/** Linhas do `Portfolio.tsx` (tokens: [texto, cor]) */
export const CODE_LINES: [string, string][][] = [
  [['import', C.kw], [' { Screen } ', C.txt], ['from', C.kw], [" './ui'", C.str]],
  [],
  [['export function ', C.kw], ['Portfolio', C.fn], ['() {', C.pun]],
  [['  const ', C.kw], ['{ data } = ', C.txt], ['useProjects', C.fn], ['()', C.pun]],
  [['  return', C.kw], [' (', C.pun]],
  [['    <', C.pun], ['Screen', C.tag], [' platform', C.attr], ['=', C.pun], ['"web"', C.str], ['>', C.pun]],
  [['      <', C.pun], ['Hero', C.tag], [' name', C.attr], ['=', C.pun], ['"Victor"', C.str], [' />', C.pun]],
  [['      <', C.pun], ['Projects', C.tag], [' items', C.attr], ['={', C.pun], ['data', C.txt], ['} />', C.pun]],
  [['    </', C.pun], ['Screen', C.tag], ['>', C.pun]],
  [['  )', C.pun]],
  [['}', C.pun]],
]

