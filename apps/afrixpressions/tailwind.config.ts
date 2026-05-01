import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:        '#F7941D',
          'orange-dark': '#D4780A',
          black:         '#0A0A0A',
          dark:          '#0D1008',
          'dark-card':   '#151A10',
          'dark-border': '#242E1C',
          cream:         '#F0EDE4',
          earth:         '#3A2810',
          gold:          '#D4A017',
          green:         '#2D7D32',
          'green-light': '#4CAF50',
          'text-light':  '#DDD8C8',
          'text-muted':  '#8A8470',
          tribal:        '#1C1C1C',
        },
      },
      fontFamily: {
        playfair:  ['var(--font-playfair)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
