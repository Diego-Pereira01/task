/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#191919",
      textPrimary: "#D3D3D3",
      textSecondary: "#7D7D7D",
      buttonPrimary: "#0077D4",
      buttonLow: "#2B593F",
      buttonMedium: "#89632A",
      buttonHigh: "#854C1D",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}