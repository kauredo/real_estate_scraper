import components from "./**/*.tsx";

let componentsContext = {};
components.forEach(component => {
  componentsContext[component.name.replace(".tsx", "")] =
    component.module.default;
});

const ReactRailsUJS = require("react_ujs");

ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
ReactRailsUJS.handleEvent("turbo:load", ReactRailsUJS.handleMount, false);
ReactRailsUJS.handleEvent("turbo:frame-load", ReactRailsUJS.handleMount, false);
ReactRailsUJS.handleEvent(
  "turbo:before-render",
  ReactRailsUJS.handleUnmount,
  false
);
