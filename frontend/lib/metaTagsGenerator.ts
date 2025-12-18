/**
 * Meta Tags Generator for Edge Middleware
 *
 * Generates HTML meta tags for social media crawlers based on content type.
 * Used by Vercel Edge Middleware to inject dynamic meta tags before serving HTML.
 */

interface ListingData {
  title: string;
  description?: string;
  photos?: string[];
}

interface BlogPostData {
  title: string;
  meta_title?: string;
  meta_description?: string;
  description?: string;
  featured_image?: string;
}

interface ListingComplexData {
  name: string;
  description?: string;
  photos?: string[];
}

interface ClubStoryData {
  title: string;
  description?: string;
  featured_image?: string;
}

type ContentData =
  | ListingData
  | BlogPostData
  | ListingComplexData
  | ClubStoryData;

/**
 * Extracts a clean description (max 160 chars for OG)
 */
function getCleanDescription(text?: string): string {
  if (!text) return "";

  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, "");

  // Truncate to 160 chars
  if (withoutHtml.length <= 160) return withoutHtml;

  return withoutHtml.substring(0, 157) + "...";
}

/**
 * Checks if data is a blog post
 */
function isBlogPost(data: ContentData): data is BlogPostData {
  return "meta_title" in data || "featured_image" in data;
}

/**
 * Checks if data is a listing
 */
function isListing(data: ContentData): data is ListingData {
  return "photos" in data && !("name" in data);
}

/**
 * Checks if data is a listing complex
 */
function isListingComplex(data: ContentData): data is ListingComplexData {
  return "name" in data && "photos" in data;
}

/**
 * Checks if data is a club story
 */
function isClubStory(data: ContentData): data is ClubStoryData {
  return (
    "featured_image" in data && !("meta_title" in data) && !("photos" in data)
  );
}

/**
 * Generates meta tags HTML from content data
 */
export function generateMetaTags(
  data: ContentData,
  url: string,
  language: "pt" | "en" = "pt",
  defaultImageUrl: string = "https://sofiagalvaogroup.com/images/default-og-image.jpg",
): string {
  let title = "";
  let description = "";
  let image = defaultImageUrl;
  let type = "website";

  if (isBlogPost(data)) {
    // Blog post
    title = data.meta_title || data.title;
    description = getCleanDescription(
      data.meta_description || data.description,
    );
    image = data.featured_image || defaultImageUrl;
    type = "article";
  } else if (isClubStory(data)) {
    // Club story
    title = data.title;
    description = getCleanDescription(data.description);
    image = data.featured_image || defaultImageUrl;
    type = "article";
  } else if (isListingComplex(data)) {
    // Listing complex
    title = data.name;
    description = getCleanDescription(data.description);
    image =
      data.photos && data.photos.length > 0 ? data.photos[0] : defaultImageUrl;
    type = "article";
  } else if (isListing(data)) {
    // Listing
    title = data.title;
    description = getCleanDescription(data.description);
    image =
      data.photos && data.photos.length > 0 ? data.photos[0] : defaultImageUrl;
    type = "article";
  }

  // Ensure full title with branding
  const fullTitle = title.includes("Sofia Galvão")
    ? title
    : `${title} | Sofia Galvão Group`;

  // Set locale based on language
  const locale = language === "en" ? "en_US" : "pt_PT";

  return `
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:site_name" content="Sofia Galvão Group" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(url)}" />
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  `.trim();
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}
