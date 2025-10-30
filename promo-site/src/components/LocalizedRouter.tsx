import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * LocalizedRouter - Syncs URL with i18n language
 *
 * Handles:
 * - Detecting language from URL path (/en/*, /pt/*)
 * - Updating i18n when URL changes
 * - Updating URL when language changes
 */
export function LocalizedRouter({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect language from URL on mount and route changes
  useEffect(() => {
    const path = location.pathname;
    let urlLang: string | null = null;

    if (path.startsWith('/pt/') || path === '/pt') {
      urlLang = 'pt';
    } else if (path.startsWith('/en/') || path === '/en') {
      urlLang = 'en';
    }

    // If URL has language prefix different from current i18n language, update i18n
    if (urlLang && urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
  }, [location.pathname, i18n]);

  // When language changes, update URL if needed
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const currentPath = location.pathname;
      let newPath: string;

      // Remove existing language prefix
      const pathWithoutLang = currentPath.replace(/^\/(en|pt)(\/|$)/, '/');

      // Add new language prefix (default to no prefix for English)
      if (lng === 'pt') {
        newPath = `/pt${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      } else {
        // English uses no prefix (or /en/ if you prefer)
        newPath = pathWithoutLang;
      }

      // Only navigate if path actually changed
      if (newPath !== currentPath) {
        navigate(newPath, { replace: true });
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [location.pathname, navigate, i18n]);

  return <>{children}</>;
}
