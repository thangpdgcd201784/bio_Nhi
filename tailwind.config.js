/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#7f1d1d',
          dark: '#450a0a',
          light: '#991b1b',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0d78c',
          dark: '#b8860b',
        },
        cream: '#faf8f5',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.06)', opacity: '0.25' },
        },
        'fab-enter': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'border-shine': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'fab-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        'loader-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s ease-out forwards',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'pulse-soft': 'pulse-soft 2.8s ease-in-out infinite',
        'fab-enter': 'fab-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'gradient-shift': 'gradient-shift 10s ease infinite',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'border-shine': 'border-shine 3s linear infinite',
        'fab-ring': 'fab-ring 2s ease-out infinite',
        'loader-spin': 'loader-spin 1s linear infinite',
      },
      backgroundSize: {
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
}
