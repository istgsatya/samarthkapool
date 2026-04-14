/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: '#D6E5F7',
        turquoise: '#4BD7C8',
        sunset: '#FF9A6A',
        beige: '#0B1220',
      },
      boxShadow: {
        glow: '0 14px 28px rgba(46, 196, 182, 0.22)',
      },
      backgroundImage: {
        'sunset-ocean': 'linear-gradient(135deg, #0B1220 0%, #11223A 34%, #1A3A5A 65%, #2B4A6C 100%)',
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
