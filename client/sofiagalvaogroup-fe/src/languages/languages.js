import { I18n } from "i18n-js";
import * as en from "./en.json";
import * as pt from "./pt.json";

export const i18n = new I18n({
  ...pt,
  ...en,
});

const allowed_locales = ["pt", "en"];
const default_locale = "pt";
i18n.defaultLocale = default_locale;

let current_locale = window.location.pathname.split("/")[1];
i18n.locale = allowed_locales.includes(current_locale)
  ? current_locale
  : default_locale;
