import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:        '#F7941D',
          'orange-dark': '#D4780A',
          'orange-light':'#FFA940',
          black:         '#0A0A0A',
          dark:          '#141414',
          'dark-card':   '#1C1C1C',
          'dark-border': '#2A2A2A',
          cream:         '#FDF6EC',
          'cream-warm':  '#F5E6D0',
          earth:         '#5C3A1E',
          gold:          '#D4A017',
          'text-light':  '#E8D5B7',
          'text-muted':  '#9A8B7A',
          green:         '#2D7D32',
        },
      },
      fontFamily: {
        playfair:  ['var(--font-playfair)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,8vw,7.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem,6vw,5.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem,4vw,3.5rem)',    { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem,3vw,2.5rem)',  { lineHeight: '1.2' }],
      },
      letterSpacing: {
        eyebrow: '0.25em',
        wide2:   '0.15em',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        smooth:  'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
        spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'float-slow':    'floatY 6s ease-in-out infinite',
        'float-medium':  'floatY 4s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'spin-slow':     'spin 20s linear infinite',
        'kente-slide':   'kenteSlide 8s linear infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(247,148,29,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(247,148,29,0.6)' },
        },
        kenteSlide: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '120px 0' },
        },
      },
      backgroundImage: {
        'kente': `repeating-linear-gradient(
          90deg,
          #F7941D 0px, #F7941D 30px,
          #D4A017 30px, #D4A017 60px,
          #1C1C1C 60px, #1C1C1C 90px,
          #F7941D 90px, #F7941D 120px
        )`,
        'kente-thin': `repeating-linear-gradient(
          90deg,
          #F7941D 0px, #F7941D 15px,
          #D4A017 15px, #D4A017 30px,
          #141414 30px, #141414 45px,
          #5C3A1E 45px, #5C3A1E 60px
        )`,
        'hero-gradient': `
          radial-gradient(ellipse 800px 500px at 15% 40%, rgba(247,148,29,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 500px 400px at 85% 20%, rgba(212,160,23,0.12) 0%, transparent 50%),
          radial-gradient(ellipse 600px 600px at 60% 80%, rgba(92,58,30,0.25) 0%, transparent 60%),
          linear-gradient(160deg, #1C0A00 0%, #0D0D0D 35%, #0A0A0A 70%, #080808 100%)
        `,
        'section-dark': `linear-gradient(180deg, #141414 0%, #0A0A0A 100%)`,
        'card-glow': `radial-gradient(ellipse at 50% 0%, rgba(247,148,29,0.12) 0%, transparent 60%)`,
      },
      boxShadow: {
        'orange-sm': '0 0 20px rgba(247,148,29,0.25)',
        'orange-md': '0 0 40px rgba(247,148,29,0.35)',
        'orange-lg': '0 0 80px rgba(247,148,29,0.25)',
        'card':      '0 4px 40px rgba(0,0,0,0.4)',
        'card-hover':'0 8px 60px rgba(0,0,0,0.6), 0 0 30px rgba(247,148,29,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
