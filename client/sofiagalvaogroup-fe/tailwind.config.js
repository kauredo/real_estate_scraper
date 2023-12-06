module.exports = {
  content: ["./src/**/*.{scss,css,sass}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    extend: {
      colors: {
        beige: "#d3af79",
        chocolate: "#141301",
        grey: "#9d9d9c",
        indigo: "#083D77",
        white: "#F9F9F9",
      },
      screens: {
        tablet: "900px",
      },
    },
  },
};
