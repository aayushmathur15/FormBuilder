/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f5ff',
          100: '#f0ecff',
          200: '#d9d0ff',
          300: '#bfaaff',
          400: '#9f7dff',
          500: '#835cff',
          600: '#6733ff',
          700: '#4e1ae6',
          800: '#4115b4',
          900: '#38108f',
        },
      },
    },
  },
  plugins: [],
}

