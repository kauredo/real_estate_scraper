import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  page: 'home' | 'features' | 'pricing' | 'about' | 'contact' | 'privacy' | 'terms' | 'caseStudies' | 'help';
  ogImage?: string;
  ogType?: string;
}

export function SEO({
  page,
  ogImage = '/logo-200.png',
  ogType = 'website',
}: SEOProps) {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  // Get SEO data from translations
  const title = t(`seo.${page}.title`);
  const description = t(`seo.${page}.description`);
  const keywords = t(`seo.${page}.keywords`);

  const fullTitle = `${title} | MyAgentWebsite`;
  const siteUrl = 'https://myagentwebsite.com';

  // Get the base path without language prefix
  const basePath = location.pathname.replace(/^\/(en|pt)(\/|$)/, '/');

  // Generate URLs for both languages
  const enUrl = `${siteUrl}${basePath}`;
  const ptUrl = `${siteUrl}/pt${basePath}`;
  const currentUrl = i18n.language === 'pt' ? ptUrl : enUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMeta = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.split('"')[1]);
        } else {
          element.setAttribute('name', selector.split('"')[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Helper function to update or create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        if (hreflang) {
          element.hreflang = hreflang;
        }
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Update basic meta tags
    updateMeta('meta[name="description"]', 'content', description);
    if (keywords) {
      updateMeta('meta[name="keywords"]', 'content', keywords);
    }

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', 'content', fullTitle);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:type"]', 'content', ogType);
    updateMeta('meta[property="og:url"]', 'content', currentUrl);
    updateMeta('meta[property="og:image"]', 'content', `${siteUrl}${ogImage}`);
    updateMeta('meta[property="og:locale"]', 'content', i18n.language === 'pt' ? 'pt_PT' : 'en_US');

    // Update Twitter Card tags
    updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'content', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', `${siteUrl}${ogImage}`);

    // Update canonical link
    updateLink('canonical', currentUrl);

    // Add hreflang links for international SEO
    updateLink('alternate', enUrl, 'en');
    updateLink('alternate', ptUrl, 'pt');
    updateLink('alternate', enUrl, 'x-default'); // Default to English
  }, [fullTitle, description, currentUrl, enUrl, ptUrl, ogImage, ogType, keywords, i18n.language]);

  return null;
}
