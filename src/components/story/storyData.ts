/**
 * "Anatomia de uma interface": a tela do Hero se separa em camadas, uma por etapa.
 * Textos baseados no currículo (sem atribuir nada que não foi feito).
 */

export const LAYERS = [
  {
    id: 'layout',
    label: 'Layout',
    tag: '<Grid />',
    text: 'Grid, espaçamento e responsividade: a estrutura que segura tudo, do desktop ao celular.',
  },
  {
    id: 'components',
    label: 'Componentes',
    tag: '<Card />',
    text: 'Peças reutilizáveis e tipadas em React + TypeScript, prontas para crescer sem retrabalho.',
  },
  {
    id: 'content',
    label: 'Conteúdo',
    tag: '<Hero />',
    text: 'Hierarquia visual e tipografia para a informação certa aparecer primeiro.',
  },
  {
    id: 'interaction',
    label: 'Interação',
    tag: 'onClick()',
    text: 'Estados de hover, foco e carregamento — feedback claro em cada ação.',
  },
  {
    id: 'data',
    label: 'Dados',
    tag: 'useQuery()',
    text: 'Integração com APIs REST, com estados de carregamento e erro tratados.',
  },
] as const

export const FINALE = {
  label: 'Web + Mobile',
  text: 'A mesma base em React e React Native: site e app com a mesma qualidade.',
}

/** Momentos-chave do progresso (0 → 1) */
export const K = {
  start: 0.04, // a tela começa a girar
  exploded: 0.15, // camadas separadas
  firstFocus: 0.23,
  step: 0.09, // intervalo entre camadas
  collapse: 0.74, // camadas se juntam de novo
  finale: 0.84, // web + mobile lado a lado
}

/** progresso em que a camada `i` está em foco */
export const focusAt = (i: number) => K.firstFocus + i * K.step

/** etapa ativa: -1 (Hero), 0..4 (camadas), 5 (final) */
export const stepAt = (p: number) => {
  if (p < K.exploded) return -1
  if (p >= K.collapse) return LAYERS.length
  return Math.max(0, Math.min(LAYERS.length - 1, Math.round((p - K.firstFocus) / K.step)))
}
