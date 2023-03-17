// Entry point for the build script in your package.json
//= require i18n
//= require i18n/translations
import "@hotwired/turbo-rails";
import "./controllers";
import "./components";
import "./languages/*";
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://911aa27c80984fffb27b216d67025ce9@o4504853415919616.ingest.sentry.io/4504853445214208",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

try {
  var routes = require("./routes");
  window.Routes = routes;
} catch (ex) {
  console.log("Routes not found.");
}
