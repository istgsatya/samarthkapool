/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: '#1C3A52',
        turquoise: '#43C6BB',
        sunset: '#F08A5D',
        beige: '#F6F1E9',
      },
      boxShadow: {
        glow: '0 14px 28px rgba(46, 196, 182, 0.22)',
      },
      backgroundImage: {
        'sunset-ocean': 'linear-gradient(135deg, #1C3A52 0%, #2F6C88 34%, #43C6BB 65%, #F08A5D 100%)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 9s ease-out infinite',
        pulseSoft: 'pulseSoft 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
}
