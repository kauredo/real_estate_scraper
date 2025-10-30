/**
 * Meta Tags Generator for Edge Middleware (Promo Site)
 *
 * Generates HTML meta tags for social media crawlers based on page URL.
 * Used by Vercel Edge Middleware to inject static meta tags before serving HTML.
 *
 * Loads translation data dynamically based on language.
 */

import enTranslations from '../src/locales/en/seo.json';
import ptTranslations from '../src/locales/pt/seo.json';

interface PageMetaData {
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string;
}

// Default OG image
const DEFAULT_OG_IMAGE = 'https://myagentwebsite.com/logo-200.png';

// Map of paths to translation keys
const PATH_TO_KEY_MAP: Record<string, string> = {
  '/': 'home',
  '/features': 'features',
  '/pricing': 'pricing',
  '/about': 'about',
  '/contact': 'contact',
  '/case-studies': 'caseStudies',
  '/help': 'help',
  '/privacy-policy': 'privacy',
  '/terms-of-service': 'terms',
};

// Map of keys to type
const KEY_TO_TYPE_MAP: Record<string, string> = {
  'home': 'website',
  'features': 'website',
  'pricing': 'website',
  'about': 'website',
  'contact': 'website',
  'caseStudies': 'website',
  'help': 'website',
  'privacy': 'article',
  'terms': 'article',
};

/**
 * Gets meta data for a page from translations
 */
function getPageMetaData(path: string, language: 'pt' | 'en'): PageMetaData {
  const key = PATH_TO_KEY_MAP[path] || 'home';
  const translations = language === 'pt' ? ptTranslations : enTranslations;
  const seoData = translations.seo[key as keyof typeof translations.seo];

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    type: KEY_TO_TYPE_MAP[key] || 'website',
  };
}

/**
 * Generates meta tags HTML from page URL
 */
export function generateMetaTags(
  pathname: string,
  url: string,
  language: 'pt' | 'en' = 'en'
): string {
  // Normalize pathname (remove trailing slash, remove language prefix)
  let normalizedPath = pathname.replace(/\/$/, '') || '/';
  normalizedPath = normalizedPath.replace(/^\/(en|pt)/, '') || '/';

  // Get meta data for the page from translations
  const metaData = getPageMetaData(normalizedPath, language);

  const { title, description, keywords, type = 'website', image = DEFAULT_OG_IMAGE } = metaData;

  // Ensure full title with branding
  const fullTitle = `${title} | MyAgentWebsite`;

  // Set locale based on language
  const locale = language === 'en' ? 'en_US' : 'pt_PT';

  // Generate URLs for both languages (for hreflang)
  const siteUrl = 'https://myagentwebsite.com';
  const enUrl = `${siteUrl}${normalizedPath}`;
  const ptUrl = `${siteUrl}/pt${normalizedPath}`;
  const currentUrl = language === 'pt' ? ptUrl : enUrl;

  // Build meta tags HTML
  const metaTags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  ];

  // Add keywords if present
  if (keywords) {
    metaTags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  }

  // Canonical link
  metaTags.push(`<link rel="canonical" href="${escapeHtml(currentUrl)}" />`);

  // Hreflang links for international SEO
  metaTags.push(
    `<link rel="alternate" hreflang="en" href="${escapeHtml(enUrl)}" />`,
    `<link rel="alternate" hreflang="pt" href="${escapeHtml(ptUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(enUrl)}" />`
  );

  // Open Graph / Facebook
  metaTags.push(
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${escapeHtml(currentUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:site_name" content="MyAgentWebsite" />`
  );

  // Twitter
  metaTags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escapeHtml(currentUrl)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`
  );

  return metaTags.join('\n    ');
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}
