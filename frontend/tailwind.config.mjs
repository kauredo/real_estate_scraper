/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    extend: {
      colors: {
        beige: {
          default: "#d3af79",
          medium: "#b08e5e",
          dark: "#775727",
        },
        chocolate: "#141301",
        grey: "#dbdbdb",
        indigo: "#083D77",
        white: "#F9F9F9",
        dark: "#1B1E1F",
        light: "#D6D2CD",
      },
      screens: {
        tablet: "900px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
