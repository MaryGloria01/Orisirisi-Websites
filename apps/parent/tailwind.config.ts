import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F7941D', 'orange-dark': '#D4780A', black: '#0A0A0A',
          dark: '#141414', 'dark-card': '#1C1C1C', 'dark-border': '#2A2A2A',
          cream: '#FDF6EC', 'cream-warm': '#F5E6D0', earth: '#5C3A1E',
          gold: '#D4A017', 'text-light': '#E8D5B7', 'text-muted': '#9A8B7A',
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
