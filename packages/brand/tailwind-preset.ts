import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange:       '#F7941D',
          'orange-dark':'#D4780A',
          'orange-light':'#FFA940',
          black:        '#0A0A0A',
          dark:         '#141414',
          'dark-card':  '#1C1C1C',
          'dark-border':'#2A2A2A',
          cream:        '#FDF6EC',
          'cream-warm': '#F5E6D0',
          earth:        '#5C3A1E',
          gold:         '#D4A017',
          'text-light': '#E8D5B7',
          'text-muted': '#9A8B7A',
          green:        '#2D7D32',
        },
      },
      fontFamily: {
        playfair:  ['var(--font-playfair)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        smooth:  'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
    },
  },
}

export default preset
