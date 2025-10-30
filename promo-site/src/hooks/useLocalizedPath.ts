import { useTranslation } from 'react-i18next';

/**
 * Hook that returns a function to generate localized paths
 *
 * Usage:
 *   const localizedPath = useLocalizedPath();
 *   <Link to={localizedPath('/features')}>Features</Link>
 *
 * Results:
 *   - If language is 'en': '/features'
 *   - If language is 'pt': '/pt/features'
 */
export function useLocalizedPath() {
  const { i18n } = useTranslation();

  return (path: string): string => {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // English uses no prefix
    if (i18n.language === 'en') {
      return normalizedPath;
    }

    // Portuguese uses /pt prefix
    if (i18n.language === 'pt') {
      return `/pt${normalizedPath}`;
    }

    // Fallback to English (no prefix)
    return normalizedPath;
  };
}
