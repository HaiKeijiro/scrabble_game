/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        uptos: ["Uptos", "sans-serif"],
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
