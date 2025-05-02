/// <reference types="vite/client" />
import i18n from "../i18n";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

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
  backoffice: "backoffice",
} as const;

// Function to translate route segments
export const translateRoute = (segment: string, toEnglish: boolean): string => {
  if (toEnglish) {
    const entry = Object.entries(routeMappings).find(
      ([pt, _]) => pt === segment
    );
    return entry ? entry[1] : segment;
  } else {
    const entry = Object.entries(routeMappings).find(
      ([_, en]) => en === segment
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
    const translatedSegments = segments.map(segment =>
      translateRoute(segment, true)
    );
    return `/${language}/${translatedSegments.join("/")}`;
  }

  // Remove 'en' prefix if present and translate to Portuguese
  const withoutPrefix = route.replace(/^\/en\//, "");
  const portugueseSegments = withoutPrefix
    .split("/")
    .filter(Boolean)
    .map(segment => translateRoute(segment, false));
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
  routes: T
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
  listing: (slug: string): string => `/comprar/${slug}`,
  sell: "/vender",

  // Listing complexes
  listingComplexes: "/empreendimentos",
  listingComplex: (slug: string): string => `/empreendimentos/${slug}`,

  // Blog
  blog: "/blog",
  blogPost: (slug: string): string => `/blog/${slug}`,

  // Club SGG
  club: "/clube-sgg",
  clubRules: "/clube-sgg/regulamento",
  clubStories: "/clube-sgg/historias",
  clubStory: (slug: string): string => `/clube-sgg/historias/${slug}`,

  // Backoffice
  backoffice: {
    root: "/backoffice",
    features: "/backoffice/features",

    // Variables
    variables: "/backoffice/variables",
    newVariable: "/backoffice/variables/new",
    editVariable: (id: string | number): string =>
      `/backoffice/variables/${id}/edit`,

    // Blog posts
    blogPosts: "/backoffice/blog_posts",
    newBlogPost: "/backoffice/blog_posts/new",
    editBlogPost: (id: string | number): string =>
      `/backoffice/blog_posts/${id}/edit`,
    showBlogPost: (id: string | number): string =>
      `/backoffice/blog_posts/${id}`,

    // Club stories
    clubStories: "/backoffice/club_stories",
    newClubStory: "/backoffice/club_stories/new",
    editClubStory: (id: string | number): string =>
      `/backoffice/club_stories/${id}/edit`,
    showClubStory: (id: string | number): string =>
      `/backoffice/club_stories/${id}`,

    // Listings
    listings: "/backoffice/listings",
    newListing: "/backoffice/listings/new",
    editListing: (id: string | number): string =>
      `/backoffice/listings/${id}/edit`,
    updateDetailsListing: (id: string | number): string =>
      `/backoffice/listings/${id}/update_details`,
    recoverListing: (id: string | number): string =>
      `/backoffice/listings/${id}/recover`,
    updateAllListings: "/backoffice/listings/update_all",

    // Listing complexes
    listingComplexes: "/backoffice/listing_complexes",
    newListingComplex: "/backoffice/listing_complexes/new",
    editListingComplex: (id: string | number): string =>
      `/backoffice/listing_complexes/${id}/edit`,
    showListingComplex: (id: string | number): string =>
      `/backoffice/listing_complexes/${id}`,
    updateDetailsListingComplex: (id: string | number): string =>
      `/backoffice/listing_complexes/${id}/update_details`,
    photosListingComplex: (id: string | number): string =>
      `/backoffice/listing_complexes/${id}/photos`,
    deletePhotoListingComplex: (id: string | number): string =>
      `/backoffice/listing_complexes/${id}/delete_photo`,
    fetchListingComplex: "/backoffice/listing_complexes/fetch",

    // Testimonials
    testimonials: "/backoffice/testimonials",
    newTestimonial: "/backoffice/testimonials/new",
    editTestimonial: (id: string | number): string =>
      `/backoffice/testimonials/${id}/edit`,
    showTestimonial: (id: string | number): string =>
      `/backoffice/testimonials/${id}`,
  },

  // Authentication
  adminSignIn: "/admins/sign_in",
  adminSignUp: "/admins/sign_up",
  adminSignOut: "/admins/sign_out",
  adminEditAccount: "/admins/edit",

  // Auth routes
  auth: {
    login: "/backoffice/login",
  },

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
  // Authentication
  auth: `${API_BASE_URL}/auth/login`,

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

  // Admin API endpoints
  admin: {
    // Blog posts
    blogPosts: `${API_BASE_URL}/admin/blog_posts`,
    blogPost: (id: string | number): string =>
      `${API_BASE_URL}/admin/blog_posts/${id}`,

    // Club stories
    clubStories: `${API_BASE_URL}/admin/club_stories`,
    clubStory: (id: string | number): string =>
      `${API_BASE_URL}/admin/club_stories/${id}`,

    // Listing complexes
    listingComplexes: `${API_BASE_URL}/admin/listing_complexes`,
    listingComplex: (id: string | number): string =>
      `${API_BASE_URL}/admin/listing_complexes/${id}`,
    updateDetailsListingComplex: (id: string | number): string =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/update_details`,
    photosListingComplex: (id: string | number): string =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/photos`,
    deletePhotoListingComplex: (id: string | number): string =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/delete_photo`,
    fetchListingComplex: `${API_BASE_URL}/admin/listing_complexes/fetch`,

    // Listings
    listings: `${API_BASE_URL}/admin/listings`,
    listing: (id: string | number): string =>
      `${API_BASE_URL}/admin/listings/${id}`,
    updateDetailsListing: (id: string | number): string =>
      `${API_BASE_URL}/admin/listings/${id}/update_details`,
    recoverListing: (id: string | number): string =>
      `${API_BASE_URL}/admin/listings/${id}/recover`,
    updateAllListings: `${API_BASE_URL}/admin/listings/update_all`,

    // Testimonials
    testimonials: `${API_BASE_URL}/admin/testimonials`,
    testimonial: (id: string | number): string =>
      `${API_BASE_URL}/admin/testimonials/${id}`,

    // Variables
    variables: `${API_BASE_URL}/admin/variables`,
    variable: (id: string | number): string =>
      `${API_BASE_URL}/admin/variables/${id}`,

    // Photos
    blogPhotos: `${API_BASE_URL}/admin/blog_photos`,
    blogPhoto: (id: string | number): string =>
      `${API_BASE_URL}/admin/blog_photos/${id}`,
    photos: `${API_BASE_URL}/admin/photos`,
    photo: (id: string | number): string =>
      `${API_BASE_URL}/admin/photos/${id}`,
    clubStoryPhotos: `${API_BASE_URL}/admin/club_story_photos`,
    clubStoryPhoto: (id: string | number): string =>
      `${API_BASE_URL}/admin/club_story_photos/${id}`,
  },
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

  // Backoffice
  backoffice_path: appRoutes.backoffice.root,
  backoffice_features_path: appRoutes.backoffice.features,

  // Variables
  backoffice_variables_path: appRoutes.backoffice.variables,
  new_backoffice_variable_path: appRoutes.backoffice.newVariable,
  edit_backoffice_variable_path: appRoutes.backoffice.editVariable,

  // Blog posts
  backoffice_blog_posts_path: appRoutes.backoffice.blogPosts,
  new_backoffice_blog_post_path: appRoutes.backoffice.newBlogPost,
  edit_backoffice_blog_post_path: appRoutes.backoffice.editBlogPost,
  backoffice_blog_post_path: appRoutes.backoffice.showBlogPost,

  // Club stories
  backoffice_club_stories_path: appRoutes.backoffice.clubStories,
  new_backoffice_club_story_path: appRoutes.backoffice.newClubStory,
  edit_backoffice_club_story_path: appRoutes.backoffice.editClubStory,
  backoffice_club_story_path: appRoutes.backoffice.showClubStory,

  // Listings
  backoffice_listings_path: appRoutes.backoffice.listings,
  new_backoffice_listing_path: appRoutes.backoffice.newListing,
  edit_backoffice_listing_path: appRoutes.backoffice.editListing,
  update_details_backoffice_listing_path:
    appRoutes.backoffice.updateDetailsListing,
  recover_backoffice_listing_path: appRoutes.backoffice.recoverListing,
  update_all_backoffice_listings_path: appRoutes.backoffice.updateAllListings,

  // Listing complexes
  backoffice_listing_complexes_path: appRoutes.backoffice.listingComplexes,
  new_backoffice_listing_complex_path: appRoutes.backoffice.newListingComplex,
  edit_backoffice_listing_complex_path: appRoutes.backoffice.editListingComplex,
  backoffice_listing_complex_path: appRoutes.backoffice.showListingComplex,
  update_details_backoffice_listing_complex_path:
    appRoutes.backoffice.updateDetailsListingComplex,
  photos_backoffice_listing_complex_path:
    appRoutes.backoffice.photosListingComplex,
  delete_photo_backoffice_listing_complex_path:
    appRoutes.backoffice.deletePhotoListingComplex,
  fetch_backoffice_listing_complexes_path:
    appRoutes.backoffice.fetchListingComplex,

  // Testimonials
  backoffice_testimonials_path: appRoutes.backoffice.testimonials,
  new_backoffice_testimonial_path: appRoutes.backoffice.newTestimonial,
  edit_backoffice_testimonial_path: appRoutes.backoffice.editTestimonial,
  backoffice_testimonial_path: appRoutes.backoffice.showTestimonial,

  // Authentication
  new_admin_session_path: appRoutes.adminSignIn,
  new_admin_registration_path: appRoutes.adminSignUp,
  destroy_admin_session_path: appRoutes.adminSignOut,
  edit_admin_registration_path: appRoutes.adminEditAccount,

  // Auth routes
  auth: {
    login: appRoutes.auth.login,
  },

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
