/// <reference types="vite/client" />
import i18n from "../i18n";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Route translations between Portuguese and English
export const routeMappings = {
  // Main pages
  servicos: "services",
  kw: "kw",
  privacidade: "privacy",
  "termos-e-condicoes": "terms-and-conditions",
  contactos: "contact",
  faq: "faq",

  // Listings
  comprar: "buy",
  vender: "sell",
  empreendimentos: "enterprises",

  // Other
  "clube-sgg": "club",
  regulamento: "rules",
  historias: "stories",
  blog: "blog",
} as const;

// Function to translate route segments
export const translateRoute = (segment: string, toEnglish: boolean): string => {
  if (toEnglish) {
    const entry = Object.entries(routeMappings).find(
      ([pt, _]) => pt === segment,
    );
    return entry ? entry[1] : segment;
  } else {
    const entry = Object.entries(routeMappings).find(
      ([_, en]) => en === segment,
    );
    return entry ? entry[0] : segment;
  }
};

// Helper to handle language prefix
export const getLocalizedRoute = (route: string): string => {
  // Don't add /en prefix to API routes or absolute URLs
  if (route.startsWith("http") || route.startsWith(API_BASE_URL)) {
    return route;
  }

  const language = i18n.language;
  const segments = route.split("/").filter(Boolean);

  if (language === "en") {
    const translatedSegments = segments.map((segment) =>
      translateRoute(segment, true),
    );
    return `/${language}/${translatedSegments.join("/")}`;
  }

  // Remove 'en' prefix if present and translate to Portuguese
  const withoutPrefix = route.replace(/^\/en\//, "");
  const portugueseSegments = withoutPrefix
    .split("/")
    .filter(Boolean)
    .map((segment) => translateRoute(segment, false));
  return `/${portugueseSegments.join("/")}`;
};

// Type for route parameters
type RouteParam = string | number;

// Type for route functions with proper parameter handling
type RouteFn = (...params: RouteParam[]) => string;

// Create a wrapper for route functions to automatically localize them
const createLocalizedRouteFn = (fn: RouteFn): RouteFn => {
  return (...params: RouteParam[]) => {
    const route = fn(...params);
    return getLocalizedRoute(route);
  };
};

// Create a proxy to automatically localize all routes
const createLocalizedRoutes = <T extends Record<string, unknown>>(
  routes: T,
): T => {
  return new Proxy(routes, {
    get: (target: T, prop: string | symbol): unknown => {
      const value = Reflect.get(target, prop);
      if (typeof value === "function") {
        return createLocalizedRouteFn(value as RouteFn);
      }
      if (typeof value === "string") {
        return getLocalizedRoute(value);
      }
      if (typeof value === "object" && value !== null) {
        return createLocalizedRoutes(value as Record<string, unknown>);
      }
      return value;
    },
  }) as T;
};

// Frontend routes (these would be handled by your frontend routing system)
const baseAppRoutes = {
  // Main pages
  root: "/",
  services: "/servicos",
  about: "/kw",
  privacy: "/privacidade",
  terms: "/termos-e-condicoes",
  contact: "/contactos",
  faq: "/faq",

  // Listings
  buy: "/comprar",
  listing: (slug: string | number) => `/comprar/${slug}`,
  sell: "/vender",

  // Listing complexes
  listingComplexes: "/empreendimentos",
  listingComplex: (slug: string | number) => `/empreendimentos/${slug}`,

  // Blog
  blog: "/blog",
  blogPost: (slug: string): string => `/blog/${slug}`,

  // Club SGG
  club: "/clube-sgg",
  clubRules: "/clube-sgg/regulamento",
  clubStories: "/clube-sgg/historias",
  clubStory: (slug: string): string => `/clube-sgg/historias/${slug}`,

  // Newsletter
  confirmNewsletter: (id: string | number, token: string): string =>
    `/newsletter_subscriptions/${id}/confirm?token=${token}`,

  // Misc
  toggleDarkMode: "/toggle_dark_mode",

  // Good Job dashboard
  goodJob: "/good_job",

  // Sitemap
  sitemap: "/sitemap",
};

export const appRoutes = createLocalizedRoutes(baseAppRoutes);

// API routes
const baseApiRoutes = {
  // Documentation
  docs: `${API_BASE_URL}/docs`,

  // Pages and general endpoints
  home: `${API_BASE_URL}/home`,
  about: `${API_BASE_URL}/about`,
  services: `${API_BASE_URL}/services`,
  contact: `${API_BASE_URL}/contact`,
  contact_page: `${API_BASE_URL}/contact`, // GET endpoint to get contact page data
  privacy: `${API_BASE_URL}/privacy`,
  terms: `${API_BASE_URL}/terms_and_conditions`,
  faq: `${API_BASE_URL}/faq`,
  buy: `${API_BASE_URL}/buy`,
  sell: `${API_BASE_URL}/sell`,
  toggleDarkMode: `${API_BASE_URL}/toggle_dark_mode`,

  // Listings
  listings: `${API_BASE_URL}/listings`,
  listing: (slug: string): string => `${API_BASE_URL}/listings/${slug}`,

  // Listing complexes
  listingComplexes: `${API_BASE_URL}/listing_complexes`,
  listingComplex: (slug: string): string =>
    `${API_BASE_URL}/listing_complexes/${slug}`,

  // Blog
  blogPosts: `${API_BASE_URL}/blog_posts`,
  blogPost: (slug: string): string => `${API_BASE_URL}/blog_posts/${slug}`,

  // Club
  club: `${API_BASE_URL}/club`,
  clubJoin: `${API_BASE_URL}/club/join`,
  clubRules: `${API_BASE_URL}/club/rules`,
  clubStories: `${API_BASE_URL}/club_stories`,
  clubStory: (slug: string): string => `${API_BASE_URL}/club_stories/${slug}`,

  // Testimonials
  testimonials: `${API_BASE_URL}/testimonials`,

  // Variables
  variables: `${API_BASE_URL}/variables`,

  // Newsletter
  newsletterSubscriptions: `${API_BASE_URL}/newsletter_subscriptions`,
  newsletterSubscription: (id: string | number): string =>
    `${API_BASE_URL}/newsletter_subscriptions/${id}`,
  confirmNewsletterSubscription: (id: string | number, token: string): string =>
    `${API_BASE_URL}/newsletter_subscriptions/${id}/confirm?token=${token}`,
};

export const apiRoutes = baseApiRoutes; // Don't localize API routes

// For backward compatibility with window.Routes
export const Routes = createLocalizedRoutes({
  // Main routes
  root_path: appRoutes.root,
  services_path: appRoutes.services,
  about_path: appRoutes.about,
  privacy_path: appRoutes.privacy,
  terms_and_conditions_path: appRoutes.terms,
  contact_path: appRoutes.contact,
  faq_path: appRoutes.faq,

  // Listings
  buy_path: appRoutes.buy,
  listing_path: appRoutes.listing,
  sell_path: appRoutes.sell,

  // Listing complexes
  listing_complexes_path: appRoutes.listingComplexes,
  listing_complex_path: appRoutes.listingComplex,

  // Blog
  blog_path: appRoutes.blog,
  blog_post_path: appRoutes.blogPost,

  // Club SGG
  club_path: appRoutes.club,
  club_rules_path: appRoutes.clubRules,
  club_stories_path: appRoutes.clubStories,
  club_story_path: appRoutes.clubStory,

  // Newsletter
  confirm_newsletter_subscription_path: appRoutes.confirmNewsletter,

  // Misc
  toggle_dark_mode_path: appRoutes.toggleDarkMode,

  // Good Job dashboard
  good_job_path: appRoutes.goodJob,

  // Sitemap
  sitemap_path: appRoutes.sitemap,
});

export default Routes;
