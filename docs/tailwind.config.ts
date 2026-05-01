import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './registry/**/*.{js,ts,jsx,tsx}',
    '../components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#005fdb',
          hover: '#0047a3',
          active: '#003580',
        },
        surface: {
          DEFAULT: '#f8fafc',
          white: '#ffffff',
        },
        'border-subtle': 'rgba(11,18,14,0.14)',
        'border-default': 'rgba(5,21,36,0.06)',
        'text-primary': '#020618',
        'text-subtle': '#314158',
        'text-muted': '#62748e',
        'text-inverse': '#f8fafc',
        'success-border': '#5ea500',
        'success-text': '#3c6300',
        'error-border': '#cf121f',
        'error-text': '#6f040c',
      },
      borderRadius: {
        sm: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
}

export default config
