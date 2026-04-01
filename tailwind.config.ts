import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#070708',
        graphite: '#121212',
        card: '#161616',
        gold: '#D4AF37',
        'gold-dark': '#A67C15',
        muted: '#BFC3C6'
      },
      fontFamily: {
        display: ['var(--font-mono)'],
        sans: ['var(--font-inter)'],
      },
      boxShadow: {
        gold: '0 20px 40px rgba(201,149,50,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
