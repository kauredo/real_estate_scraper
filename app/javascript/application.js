// Entry point for the build script in your package.json
//= require i18n
//= require i18n/translations
import "@hotwired/turbo-rails";
import "./controllers";
import "./components";
import "./languages/*";

try {
  var routes = require('./routes');
  window.Routes = routes;
} catch (ex) {
  console.log('Routes not found.')
}
