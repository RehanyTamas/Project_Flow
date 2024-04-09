/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#060719'
      },
      margin: {
        '22': '5.5rem', // Define your custom margin value for mt-22
      }
    },
  },
  plugins: [],
}
