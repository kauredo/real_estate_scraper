import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/index.js";
import ptTranslation from "./locales/pt/index.js";

// Force load translations
const resources = {
  en: {
    translation: JSON.parse(JSON.stringify(enTranslation)),
  },
  pt: {
    translation: JSON.parse(JSON.stringify(ptTranslation)),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
