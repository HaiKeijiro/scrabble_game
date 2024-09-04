/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "aptos-bold": ["aptos-bold", "sans-serif"],
        "aptos-semibold": ["aptos-semibold", "sans-serif"],
        "aptos-extrabold": ["aptos-extrabold", "sans-serif"],
        gotham: ["Gotham", "sans-serif"],
      },
      colors: {
        main: "#C29962",
        background: "#0E100F",
        complement: "#242424",
      },
    },
  },
  plugins: [],
};
