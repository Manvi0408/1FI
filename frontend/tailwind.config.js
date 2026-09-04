/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#f3f1fd',
          100: '#e9e5fb',
          200: '#d6ccf7',
          300: '#b7a5ef',
          400: '#9575e6',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
        },
      },
    },
  },
  plugins: [],
};
