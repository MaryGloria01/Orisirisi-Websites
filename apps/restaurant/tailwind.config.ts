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
        /* ── Brand ── */
        brand: {
          orange:        '#F7941D',
          'orange-dark': '#D4780A',
          'orange-light':'#FFF0D6',
          gold:          '#D4A017',
          earth:         '#3A1A06',
          'earth-mid':   '#7A4A20',
          'earth-light': '#B07840',
          green:         '#2D7D32',
        },
        /* ── Surfaces (light theme) ── */
        surface:        '#FFFDF8',
        'surface-mid':  '#FDF4E7',
        'surface-warm': '#F9EDD4',
        'surface-tint': '#FFF4E0',
        /* ── Text (light theme) ── */
        'text-head':    '#1A0800',
        'text-body':    '#4A2E10',
        'text-muted':   '#7A6050',
        'text-light':   '#B07840',
        /* ── Borders ── */
        'border-warm':  'rgba(92,58,30,0.14)',
      },
      fontFamily: {
        playfair:  ['var(--font-playfair)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,8vw,7.5rem)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem,6vw,5.5rem)',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem,4vw,3.5rem)',     { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        smooth:  'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
      backgroundImage: {
        /* Hero warm light gradient */
        'hero-light': `
          radial-gradient(ellipse 700px 500px at 85% 20%, rgba(247,148,29,0.15) 0%, transparent 55%),
          radial-gradient(ellipse 500px 400px at 10% 70%, rgba(212,160,23,0.1) 0%, transparent 50%),
          linear-gradient(160deg, #FFFDF8 0%, #FDF4E7 60%, #FFFDF8 100%)
        `,
        /* Kente CSS */
        'kente': `repeating-linear-gradient(
          90deg,
          #F7941D 0px, #F7941D 30px,
          #D4A017 30px,#D4A017 60px,
          #3A1A06 60px,#3A1A06 90px,
          #B07840 90px,#B07840 120px
        )`,
        /* Woven pattern overlay */
        'weave': `
          repeating-linear-gradient(0deg, rgba(247,148,29,0.06) 0px, rgba(247,148,29,0.06) 2px, transparent 2px, transparent 22px),
          repeating-linear-gradient(90deg, rgba(247,148,29,0.04) 0px, rgba(247,148,29,0.04) 2px, transparent 2px, transparent 22px)
        `,
      },
      boxShadow: {
        'card':        '0 2px 24px rgba(92,58,30,0.08)',
        'card-hover':  '0 8px 48px rgba(247,148,29,0.18)',
        'orange-glow': '0 4px 20px rgba(247,148,29,0.35)',
        'orange-lg':   '0 8px 40px rgba(247,148,29,0.3)',
        'warm':        '0 4px 32px rgba(92,58,30,0.12)',
      },
      animation: {
        'float':        'floatY 5s ease-in-out infinite',
        'kente-slide':  'kenteSlide 7s linear infinite',
        'pulse-ring':   'pulseRing 2.5s ease-in-out infinite',
        'shimmer':      'shimmer 3.5s linear infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        kenteSlide: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '120px 0' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(247,148,29,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(247,148,29,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
