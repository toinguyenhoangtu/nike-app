/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      oswald: "Oswald, sans-serif",
      urbanist: "Urbanist, sans-serif",
    },
    boxShadow:{
      dropdownShadow: 'shadow-[0px_0px_3px_1px_#cbd5e0]'
    },
    extend: {},
  },
  plugins: [],
}