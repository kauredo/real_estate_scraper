/**
 * Vercel Edge Middleware for Social Media Crawlers (Vite/SPA)
 *
 * Uses standard Web APIs (no Next.js required)
 * Detects social media crawler requests and injects dynamic meta tags
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

// API configuration
const API_BASE_URL = process.env.VITE_API_URL || 'https://api.sofiagalvaogroup.com/api/v1';
const API_KEY = process.env.VITE_API_KEY || '';
const API_TIMEOUT = 3000; // 3 seconds

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
 * Parses URL to extract content type and slug
 */
function parseContentUrl(pathname: string): {
  type: 'listing' | 'blog' | 'complex' | null;
  slug: string | null;
} {
  // Remove language prefix if exists (e.g., /en/)
  const cleanPath = pathname.replace(/^\/(?:en|pt)\//, '/');

  // Match listing URL: /comprar/:slug or /buy/:slug
  const listingMatch = cleanPath.match(/^\/(?:comprar|buy)\/([^\/]+)$/);
  if (listingMatch) {
    return { type: 'listing', slug: listingMatch[1] };
  }

  // Match blog post URL: /blog/:slug
  const blogMatch = cleanPath.match(/^\/blog\/([^\/]+)$/);
  if (blogMatch) {
    return { type: 'blog', slug: blogMatch[1] };
  }

  // Match listing complex URL: /empreendimentos/:slug or /enterprises/:slug
  const complexMatch = cleanPath.match(
    /^\/(?:empreendimentos|enterprises)\/([^\/]+)$/
  );
  if (complexMatch) {
    return { type: 'complex', slug: complexMatch[1] };
  }

  return { type: null, slug: null };
}

/**
 * Fetches content data from the Rails API
 */
async function fetchContentData(
  type: 'listing' | 'blog' | 'complex',
  slug: string
): Promise<any> {
  let endpoint = '';

  switch (type) {
    case 'listing':
      endpoint = `${API_BASE_URL}/listings/${slug}`;
      break;
    case 'blog':
      endpoint = `${API_BASE_URL}/blog_posts/${slug}`;
      break;
    case 'complex':
      endpoint = `${API_BASE_URL}/listing_complexes/${slug}`;
      break;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`API error: ${response.status} for ${endpoint}`);
      return null;
    }

    const data = await response.json();

    // Extract the relevant data based on type
    if (type === 'listing') {
      return data.listing || data;
    } else if (type === 'blog') {
      return data.blog_post || data;
    } else if (type === 'complex') {
      return data.listing_complex || data;
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error fetching content data:', error);
    return null;
  }
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
    /<meta\s+(?:name|property)=["'](?:description|og:|twitter:)[^>]*>/gi;
  const cleanedHtml = html.replace(existingMetaRegex, '');

  // Also remove existing title if we're injecting a new one
  const titleRegex = /<title>[^<]*<\/title>/i;
  const htmlWithoutTitle = cleanedHtml.replace(titleRegex, '');

  // Find the new head close position after cleaning
  const newHeadCloseIndex = htmlWithoutTitle.indexOf('</head>');

  return (
    htmlWithoutTitle.slice(0, newHeadCloseIndex) +
    '\n    ' +
    metaTagsHtml +
    '\n  ' +
    htmlWithoutTitle.slice(newHeadCloseIndex)
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
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot|webp|gif)$/)
  ) {
    return; // Let Vercel handle these normally
  }

  // Check if request is from a crawler
  if (!isCrawler(userAgent)) {
    return; // Not a crawler, continue normally
  }

  console.log(`[Crawler detected] ${userAgent} - ${pathname}`);

  // Parse URL to get content type and slug
  const { type, slug } = parseContentUrl(pathname);

  // If not a content page, continue
  if (!type || !slug) {
    console.log(`[Crawler] Not a content page, passing through`);
    return;
  }

  console.log(`[Crawler] Fetching ${type} data for slug: ${slug}`);

  // Fetch content data from API
  const contentData = await fetchContentData(type, slug);

  if (!contentData) {
    console.log(`[Crawler] Failed to fetch data, using default meta tags`);
    return;
  }

  // Generate meta tags HTML
  const fullUrl = request.url;
  const metaTagsHtml = generateMetaTags(contentData, fullUrl);

  // Fetch the original HTML from the index.html
  const origin = url.origin;
  const indexResponse = await fetch(`${origin}/index.html`);
  const html = await indexResponse.text();

  // Inject meta tags into HTML
  const modifiedHtml = injectMetaTags(html, metaTagsHtml);

  console.log(`[Crawler] Injected meta tags for ${type}: ${slug}`);

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
    '/((?!_next|api|images|fonts|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
