/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "beige-default": "#d3af79",
        "beige-medium": "#c19b65",
        dark: "#1a1a1a",
        light: "#f5f5f5",
      },
      screens: {
        tablet: "640px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
