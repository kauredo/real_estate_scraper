// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "./components";

try {
  var routes = require('./routes');
  window.Routes = routes;
} catch (ex) {
  console.log('Routes not found.')
}
