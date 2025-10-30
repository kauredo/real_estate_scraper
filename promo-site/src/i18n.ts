import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en';
import ptTranslations from './locales/pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
