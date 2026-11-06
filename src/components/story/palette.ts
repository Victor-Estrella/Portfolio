/** Paleta e conteúdo fixos da história "Do código à tela" (iguais nos dois temas). */

export const INK = '#12141a'
export const PAPER = '#fbfaf6'
export const BLUE = '#2563eb'
export const VIOLET = '#7c3aed'
export const SKY = '#38bdf8'

export const C = {
  kw: '#c792ea',
  fn: '#82aaff',
  str: '#c3e88d',
  tag: '#f78c6c',
  attr: '#ffcb6b',
  txt: '#e9e7e1',
  pun: '#89ddff',
  dim: '#6b7280',
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

