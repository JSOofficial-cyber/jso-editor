/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#D4A574',
        secondary: '#F5F1ED',
        accent: '#2D2D2D',
        beige: {
          50: '#FFFBF7',
          100: '#F5F1ED',
          200: '#EBE7E1',
          300: '#E0DCD5',
          400: '#D4A574',
          500: '#C8925C',
          600: '#B8845A',
          700: '#8B6F47',
          800: '#6B5634',
          900: '#4D3D25',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
