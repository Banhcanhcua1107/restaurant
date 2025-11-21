/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Quan trọng: Chế độ dark mode kích hoạt bằng class
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9", // sky-500
          600: "#0284c7"      // sky-600
        },
        "background-light": "#f0f9ff", // sky-50
        "background-dark": "#0c1429",  // dark blue
        "slate-850": "#16223b"
      },
      fontFamily: {
        "display": ["Be Vietnam Pro", "sans-serif"]
      },
    },
  },
  plugins: [],
}