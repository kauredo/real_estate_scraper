/**
 * Meta Tags Generator for Edge Middleware (Promo Site)
 *
 * Generates HTML meta tags for social media crawlers based on page URL.
 * Used by Vercel Edge Middleware to inject static meta tags before serving HTML.
 */

interface PageMetaData {
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string;
}

// Default OG image
const DEFAULT_OG_IMAGE = 'https://myagentwebsite.com/logo-200.png';

// Static meta data for each page
const PAGE_META_DATA: Record<string, PageMetaData> = {
  '/': {
    title: 'Real Estate Agent Websites Made Simple',
    description: 'Create your professional real estate website in minutes. Showcase properties, manage listings, and grow your business with MyAgentWebsite.',
    keywords: 'real estate website, agent website builder, property listings, real estate marketing',
    type: 'website',
  },
  '/features': {
    title: 'Features - Everything You Need to Succeed',
    description: 'Discover powerful features designed for real estate agents: property showcases, lead capture, mobile optimization, SEO tools, and more.',
    keywords: 'real estate features, property management, lead generation, mobile website, SEO',
    type: 'website',
  },
  '/pricing': {
    title: 'Pricing - Simple, Transparent Plans',
    description: 'Choose the perfect plan for your real estate business. Start free, upgrade as you grow. No hidden fees, cancel anytime.',
    keywords: 'real estate pricing, website plans, affordable website, subscription',
    type: 'website',
  },
  '/about': {
    title: 'About Us - Building Success for Real Estate Agents',
    description: 'Learn about MyAgentWebsite and our mission to empower real estate agents with professional, easy-to-use websites.',
    keywords: 'about myagentwebsite, real estate technology, agent tools',
    type: 'website',
  },
  '/contact': {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions? Contact our team for support, demos, or partnership opportunities. We\'re here to help you succeed.',
    keywords: 'contact, support, real estate help, customer service',
    type: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - How We Protect Your Data',
    description: 'Learn how MyAgentWebsite collects, uses, and protects your personal information. We are committed to your privacy and data security.',
    keywords: 'privacy policy, data protection, GDPR, personal information',
    type: 'article',
  },
  '/terms-of-service': {
    title: 'Terms of Service - User Agreement',
    description: 'Read our terms of service to understand the rules and guidelines for using MyAgentWebsite. Clear, transparent terms for all users.',
    keywords: 'terms of service, user agreement, terms and conditions, legal',
    type: 'article',
  },
};

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

  // Get meta data for the page
  const metaData = PAGE_META_DATA[normalizedPath] || PAGE_META_DATA['/'];

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
