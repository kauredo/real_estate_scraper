import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * LocalizedRouter - Syncs URL with i18n language
 *
 * Handles:
 * - Detecting language from URL path (/pt/* = Portuguese, no prefix = English)
 * - Updating i18n when URL changes
 * - Updating URL when language changes
 *
 * Note: /en/* paths are 301-redirected to /* by the Edge Middleware
 */
export function LocalizedRouter({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect language from URL on mount and route changes
  // Note: /en/* paths are 301-redirected to /* by the Edge Middleware
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/pt/') || path === '/pt') {
      if (i18n.language !== 'pt') {
        i18n.changeLanguage('pt');
      }
    } else if (i18n.language !== 'en') {
      // No prefix = English (default)
      i18n.changeLanguage('en');
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
