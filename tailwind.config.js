/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#1F1B2E',
        canvas: '#FBF8F3',
        'alert-600': '#C62F3B',
        'sun-300': '#FFD56A',
        'mint-300': '#8FE3C0',
        'coral-400': '#FF7A6B',
        'violet-600': '#6D3FD6',
        'violet-100': '#EDE6FB',
        brand: {
          violet: '#7956E8',
          'violet-light': '#9B7BF7',
          'violet-dark': '#5D3AC2',
          coral: '#FF8B70',
          'coral-light': '#FFA894',
          yellow: '#FFC857',
          'yellow-light': '#FFE08A',
          mint: '#55C9B5',
          'mint-light': '#7DE0CE',
          'mint-dark': '#389B8A',
          warmWhite: '#FAF9F6',
          charcoal: '#24212D',
          'charcoal-light': '#322E3E',
          'charcoal-dark': '#191720',
          card: 'rgba(255, 255, 255, 0.85)',
          glass: 'rgba(255, 255, 255, 0.7)',
          'glass-border': 'rgba(255, 255, 255, 0.3)',
          'dark-glass': 'rgba(36, 33, 45, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(121, 86, 232, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(255, 139, 112, 0.7))' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(36, 33, 45, 0.08)',
        'glass-glow': '0 0 25px -5px rgba(121, 86, 232, 0.25)',
        'coral-glow': '0 0 25px -5px rgba(255, 139, 112, 0.35)',
        'mint-glow': '0 0 25px -5px rgba(85, 201, 181, 0.35)',
        'card-hover': '0 20px 40px -15px rgba(36, 33, 45, 0.12)',
        'neon': '0 0 15px rgba(255, 200, 87, 0.5)',
      }
    },
  },
  plugins: [],
}
