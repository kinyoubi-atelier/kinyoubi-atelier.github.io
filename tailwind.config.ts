import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Brand accents — from design mark */
        navy: '#142850',
        gold: '#a08535',
        'gold-bright': '#D4AF61',
        burgundy: '#6B3E2E',

        /* Modern foundation palette */
        background: '#F8F7F4',
        'background-alt': '#F0EEEA',
        'surface-card': '#FFFFFF',
        'surface-dark': '#0E0D22',
        'surface-dark-alt': '#1E1D3A',

        /* Text hierarchy */
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
        'text-on-dark': '#F0EEEA',

        /* Semantic */
        success: '#4A9E6D',
        error: '#C75050',

        /* Legacy (kept for backward compat during transition) */
        cream: '#faf6ec',
        linen: '#f5f0e8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        kanji: ['var(--font-noto-serif-jp)', 'Noto Serif JP', 'serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section': ['1.5rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
        'soft': '0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config
