/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "azul-cins": "#002060",
        "celeste-cins": "#009DDC"
      },
      boxShadow: {
        "inner-lg":"inset 0 4px 6px 4px 0 rgb(0 0 0 / 0.1)",
        "inner-xl":"inset 0 10px 15x 6px 0 rgb(0 0 0 / 0.1)",
      }
    },
  },
  plugins: [],
}