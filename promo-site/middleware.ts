/**
 * Vercel Edge Middleware for Social Media Crawlers (Promo Site)
 *
 * Uses standard Web APIs (no Next.js required)
 * Detects social media crawler requests and injects static meta tags
 * into the HTML before serving. Regular users bypass this entirely.
 *
 * Supported crawlers:
 * - Facebook (facebookexternalhit)
 * - Twitter/X (Twitterbot)
 * - LinkedIn (LinkedInBot)
 * - WhatsApp (WhatsApp)
 * - Slack (Slackbot)
 * - Pinterest (Pinterest)
 * - Telegram (TelegramBot)
 */

import { generateMetaTags } from './lib/metaTagsGenerator';

// Crawler user agents to detect
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'Pinterest',
  'TelegramBot',
  'Discordbot',
];

/**
 * Checks if the request is from a social media crawler
 */
function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;

  const lowerUserAgent = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((crawler) =>
    lowerUserAgent.includes(crawler.toLowerCase())
  );
}

/**
 * Detects language from URL pathname
 * - /pt or /pt/* → Portuguese
 * - All other paths → English (default)
 */
function detectLanguage(pathname: string): 'pt' | 'en' {
  if (pathname.startsWith('/pt/') || pathname === '/pt') {
    return 'pt';
  }
  return 'en';
}

/**
 * Injects meta tags into HTML
 */
function injectMetaTags(html: string, metaTagsHtml: string): string {
  // Find the closing </head> tag and inject meta tags before it
  const headCloseIndex = html.indexOf('</head>');

  if (headCloseIndex === -1) {
    console.error('Could not find </head> tag in HTML');
    return html;
  }

  // Remove existing dynamic meta tags to avoid duplicates
  const existingMetaRegex =
    /<meta\s+(?:name|property)=["'](?:description|keywords|og:|twitter:)[^>]*>/gi;
  let cleanedHtml = html.replace(existingMetaRegex, '');

  // Remove existing title if we're injecting a new one
  const titleRegex = /<title>[^<]*<\/title>/i;
  cleanedHtml = cleanedHtml.replace(titleRegex, '');

  // Remove existing canonical and hreflang links
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/gi;
  const hreflangRegex = /<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>/gi;
  cleanedHtml = cleanedHtml.replace(canonicalRegex, '');
  cleanedHtml = cleanedHtml.replace(hreflangRegex, '');

  // Find the new head close position after cleaning
  const newHeadCloseIndex = cleanedHtml.indexOf('</head>');

  return (
    cleanedHtml.slice(0, newHeadCloseIndex) +
    '\n    ' +
    metaTagsHtml +
    '\n  ' +
    cleanedHtml.slice(newHeadCloseIndex)
  );
}

/**
 * Main middleware function using standard Web APIs
 */
export default async function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const { pathname } = url;

  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/assets') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot|webp|gif|xml|txt|webmanifest)$/)
  ) {
    return; // Let Vercel handle these normally
  }

  // Check if request is from a crawler
  if (!isCrawler(userAgent)) {
    return; // Not a crawler, continue normally
  }

  console.log(`[Crawler detected] ${userAgent} - ${pathname}`);

  // Detect language from URL
  const language = detectLanguage(pathname);

  // Generate meta tags HTML based on pathname
  const fullUrl = request.url;
  const metaTagsHtml = generateMetaTags(pathname, fullUrl, language);

  // Fetch the original HTML from the index.html
  const origin = url.origin;
  const indexResponse = await fetch(`${origin}/index.html`);
  const html = await indexResponse.text();

  // Inject meta tags into HTML
  const modifiedHtml = injectMetaTags(html, metaTagsHtml);

  console.log(`[Crawler] Injected meta tags for page: ${pathname}`);

  // Return modified HTML
  return new Response(modifiedHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes
    },
  });
}

// Vercel Edge Runtime Configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Static assets
     * - API routes
     * - Image/font files
     */
    '/((?!_next|api|images|fonts|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|xml|txt|webmanifest)).*)',
  ],
};
