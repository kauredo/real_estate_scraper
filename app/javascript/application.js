// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "./components";

try {
  var routes = require('./routes');
  console.log('Directory exists!')
  console.log(routes)
} catch (ex) {
  console.log('Directory not found.')
}
