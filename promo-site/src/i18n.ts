import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en';
import ptTranslations from './locales/pt';

// Detect language from localStorage, URL, or browser
const getInitialLanguage = (): string => {
  // 1. Check localStorage
  const savedLang = localStorage.getItem('language');
  if (savedLang && ['en', 'pt'].includes(savedLang)) {
    return savedLang;
  }

  // 2. Check URL path (e.g., /pt/features)
  const path = window.location.pathname;
  if (path.startsWith('/pt/') || path === '/pt') {
    return 'pt';
  }
  if (path.startsWith('/en/') || path === '/en') {
    return 'en';
  }

  // 3. Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'pt') {
    return 'pt';
  }

  // 4. Default to English
  return 'en';
};

const initialLanguage = getInitialLanguage();

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
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);

  // Update HTML lang attribute for accessibility and SEO
  document.documentElement.lang = lng;
});

// Set initial HTML lang attribute
document.documentElement.lang = initialLanguage;

export default i18n;
