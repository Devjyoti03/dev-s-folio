/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'carousel': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shadow-pulse': 'shadowPulse 3s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shadowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px 5px rgba(139, 92, 246, 0.2)' },
          '50%': { boxShadow: '0 0 25px 10px rgba(139, 92, 246, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};