/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./App.{js,jsx,ts,tsx}','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#3896ff', dark: '#1e5fb3' } },
      borderRadius: { '2xl': '1.5rem' },
    },
  },
  plugins: [],
};
