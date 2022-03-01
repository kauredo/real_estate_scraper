module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#d3af79",
        bordeaux: "#680934",
        chocoleate: "#141301",
        grey: "#9d9d9c",
        indigo: "#083D77",
        white: "#F9F9F9",
      },
      screens: {
        tablet: "980px",
      },
    },
  },
};
