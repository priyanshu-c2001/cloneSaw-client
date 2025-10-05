/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add 'Poppins' as a custom font
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}