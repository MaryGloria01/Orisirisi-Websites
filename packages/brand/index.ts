export const colors = {
  orange:      '#F7941D',
  orangeDark:  '#D4780A',
  orangeLight: '#FFA940',
  orangeGlow:  'rgba(247,148,29,0.18)',
  black:       '#0A0A0A',
  dark:        '#141414',
  darkCard:    '#1C1C1C',
  darkBorder:  '#2A2A2A',
  cream:       '#FDF6EC',
  creamWarm:   '#F5E6D0',
  earth:       '#5C3A1E',
  gold:        '#D4A017',
  textLight:   '#E8D5B7',
  textMuted:   '#9A8B7A',
  green:       '#2D7D32',
} as const

export const fonts = {
  playfair:   'var(--font-playfair)',
  cormorant:  'var(--font-cormorant)',
  inter:      'var(--font-inter)',
} as const

export const easing = {
  smooth:  [0.43, 0.13, 0.23, 0.96] as const,
  spring:  { type: 'spring', stiffness: 100, damping: 20 },
  elegant: [0.25, 0.46, 0.45, 0.94] as const,
} as const

export const durations = {
  fast:   0.3,
  normal: 0.6,
  slow:   1.0,
  cinematic: 1.4,
} as const
