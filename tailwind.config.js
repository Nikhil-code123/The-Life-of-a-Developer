/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        void: '#03020a',
        navy: '#070718',
        electric: '#00d4ff',
        neon: '#7c3aed',
        plasma: '#a855f7',
        cyber: '#06ffa5',
        ember: '#ff6b35',
        starlight: '#e2e8f0',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glitch': 'glitch 0.3s steps(2) infinite',
        'typewriter': 'typewriter 3s steps(40) infinite',
        'scanline': 'scanline 8s linear infinite',
        'steam': 'steam 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 1px)' },
          '66%': { transform: 'translate(2px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        steam: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.8', transform: 'translateY(-10px) scaleX(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
