import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = '/logo-200.png',
  ogType = 'website',
  keywords,
}: SEOProps) {
  const fullTitle = `${title} | MyAgentWebsite`;
  const siteUrl = 'https://myagentwebsite.com';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

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

    // Update basic meta tags
    updateMeta('meta[name="description"]', 'content', description);
    if (keywords) {
      updateMeta('meta[name="keywords"]', 'content', keywords);
    }

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', 'content', fullTitle);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:type"]', 'content', ogType);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:image"]', 'content', `${siteUrl}${ogImage}`);

    // Update Twitter Card tags
    updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'content', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', `${siteUrl}${ogImage}`);

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, keywords]);

  return null;
}
