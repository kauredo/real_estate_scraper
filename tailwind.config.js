module.exports = {
  darkMode: "class",
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.tsx",
  ],
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
};
