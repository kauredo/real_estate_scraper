module.exports = {
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
        beige: "#d3af79",
        chocolate: "#141301",
        grey: "#dbdbdb",
        indigo: "#083D77",
        white: "#F9F9F9",
      },
      screens: {
        tablet: "900px",
      },
    },
  },
};
