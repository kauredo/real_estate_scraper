const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

// Helper to handle language prefix
export const getLocalizedRoute = (route, language = "pt") => {
  if (language === "en" && !route.startsWith("/en")) {
    return `/en${route}`;
  }
  return route;
};

// Frontend routes (these would be handled by your frontend routing system)
export const appRoutes = {
  // Main pages
  root: "/",
  services: "/servicos",
  about: "/kw",
  privacy: "/privacidade",
  terms: "/termos_e_condicoes",
  contact: "/contactos",
  faq: "/faq",

  // Listings
  buy: "/comprar",
  listing: slug => `/comprar/${slug}`,
  sell: "/vender",

  // Listing complexes
  listingComplexes: "/empreendimentos",
  listingComplex: slug => `/empreendimentos/${slug}`,

  // Blog
  blog: "/blog",
  blogPost: slug => `/blog/${slug}`,

  // Club SGG
  club: "/clube-sgg",
  clubRules: "/clube-sgg/regulamento",
  clubStories: "/clube-sgg/historias",
  clubStory: slug => `/clube-sgg/historias/${slug}`,

  // Backoffice
  backoffice: {
    root: "/backoffice",
    features: "/backoffice/features",

    // Variables
    variables: "/backoffice/variables",
    newVariable: "/backoffice/variables/new",
    editVariable: id => `/backoffice/variables/${id}/edit`,

    // Blog posts
    blogPosts: "/backoffice/blog_posts",
    newBlogPost: "/backoffice/blog_posts/new",
    editBlogPost: id => `/backoffice/blog_posts/${id}/edit`,
    showBlogPost: id => `/backoffice/blog_posts/${id}`,

    // Club stories
    clubStories: "/backoffice/club_stories",
    newClubStory: "/backoffice/club_stories/new",
    editClubStory: id => `/backoffice/club_stories/${id}/edit`,
    showClubStory: id => `/backoffice/club_stories/${id}`,

    // Listings
    listings: "/backoffice/listings",
    newListing: "/backoffice/listings/new",
    editListing: id => `/backoffice/listings/${id}/edit`,
    updateDetailsListing: id => `/backoffice/listings/${id}/update_details`,
    recoverListing: id => `/backoffice/listings/${id}/recover`,
    updateAllListings: "/backoffice/listings/update_all",

    // Listing complexes
    listingComplexes: "/backoffice/listing_complexes",
    newListingComplex: "/backoffice/listing_complexes/new",
    editListingComplex: id => `/backoffice/listing_complexes/${id}/edit`,
    showListingComplex: id => `/backoffice/listing_complexes/${id}`,
    updateDetailsListingComplex: id =>
      `/backoffice/listing_complexes/${id}/update_details`,
    photosListingComplex: id => `/backoffice/listing_complexes/${id}/photos`,
    deletePhotoListingComplex: id =>
      `/backoffice/listing_complexes/${id}/delete_photo`,
    fetchListingComplex: "/backoffice/listing_complexes/fetch",

    // Testimonials
    testimonials: "/backoffice/testimonials",
    newTestimonial: "/backoffice/testimonials/new",
    editTestimonial: id => `/backoffice/testimonials/${id}/edit`,
    showTestimonial: id => `/backoffice/testimonials/${id}`,
  },

  // Authentication
  adminSignIn: "/admins/sign_in",
  adminSignUp: "/admins/sign_up",
  adminSignOut: "/admins/sign_out",
  adminEditAccount: "/admins/edit",

  // Newsletter
  confirmNewsletter: (id, token) =>
    `/newsletter_subscriptions/${id}/confirm?token=${token}`,

  // Misc
  toggleDarkMode: "/toggle_dark_mode",

  // Good Job dashboard
  goodJob: "/good_job",

  // Sitemap
  sitemap: "/sitemap",
};

// API routes
export const apiRoutes = {
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
  listing: slug => `${API_BASE_URL}/listings/${slug}`,

  // Listing complexes
  listingComplexes: `${API_BASE_URL}/listing_complexes`,
  listingComplex: slug => `${API_BASE_URL}/listing_complexes/${slug}`,

  // Blog
  blogPosts: `${API_BASE_URL}/blog_posts`,
  blogPost: slug => `${API_BASE_URL}/blog_posts/${slug}`,

  // Club
  club: `${API_BASE_URL}/club`,
  clubJoin: `${API_BASE_URL}/club/join`,
  clubRules: `${API_BASE_URL}/club/rules`,
  clubStories: `${API_BASE_URL}/club_stories`,
  clubStory: slug => `${API_BASE_URL}/club_stories/${slug}`,

  // Testimonials
  testimonials: `${API_BASE_URL}/testimonials`,

  // Variables
  variables: `${API_BASE_URL}/variables`,

  // Newsletter
  newsletterSubscriptions: `${API_BASE_URL}/newsletter_subscriptions`,
  newsletterSubscription: id =>
    `${API_BASE_URL}/newsletter_subscriptions/${id}`,
  confirmNewsletterSubscription: (id, token) =>
    `${API_BASE_URL}/newsletter_subscriptions/${id}/confirm?token=${token}`,

  // Admin API endpoints
  admin: {
    // Blog posts
    blogPosts: `${API_BASE_URL}/admin/blog_posts`,
    blogPost: id => `${API_BASE_URL}/admin/blog_posts/${id}`,

    // Club stories
    clubStories: `${API_BASE_URL}/admin/club_stories`,
    clubStory: id => `${API_BASE_URL}/admin/club_stories/${id}`,

    // Listing complexes
    listingComplexes: `${API_BASE_URL}/admin/listing_complexes`,
    listingComplex: id => `${API_BASE_URL}/admin/listing_complexes/${id}`,
    updateDetailsListingComplex: id =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/update_details`,
    photosListingComplex: id =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/photos`,
    deletePhotoListingComplex: id =>
      `${API_BASE_URL}/admin/listing_complexes/${id}/delete_photo`,
    fetchListingComplex: `${API_BASE_URL}/admin/listing_complexes/fetch`,

    // Listings
    listings: `${API_BASE_URL}/admin/listings`,
    listing: id => `${API_BASE_URL}/admin/listings/${id}`,
    updateDetailsListing: id =>
      `${API_BASE_URL}/admin/listings/${id}/update_details`,
    recoverListing: id => `${API_BASE_URL}/admin/listings/${id}/recover`,
    updateAllListings: `${API_BASE_URL}/admin/listings/update_all`,

    // Testimonials
    testimonials: `${API_BASE_URL}/admin/testimonials`,
    testimonial: id => `${API_BASE_URL}/admin/testimonials/${id}`,

    // Variables
    variables: `${API_BASE_URL}/admin/variables`,
    variable: id => `${API_BASE_URL}/admin/variables/${id}`,

    // Photos
    blogPhotos: `${API_BASE_URL}/admin/blog_photos`,
    blogPhoto: id => `${API_BASE_URL}/admin/blog_photos/${id}`,
    photos: `${API_BASE_URL}/admin/photos`,
    photo: id => `${API_BASE_URL}/admin/photos/${id}`,
    clubStoryPhotos: `${API_BASE_URL}/admin/club_story_photos`,
    clubStoryPhoto: id => `${API_BASE_URL}/admin/club_story_photos/${id}`,
  },
};

// Helper function to replicate the sanitizeURLWithParams functionality
export const sanitizeURLWithParams = (routeFn, ...params) => {
  if (typeof routeFn === "function") {
    return routeFn(...params);
  }
  return routeFn;
};

// For backward compatibility with window.Routes
export const Routes = {
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

  // Newsletter
  confirm_newsletter_subscription_path: appRoutes.confirmNewsletter,

  // Misc
  toggle_dark_mode_path: appRoutes.toggleDarkMode,

  // Good Job dashboard
  good_job_path: appRoutes.goodJob,

  // Sitemap
  sitemap_path: appRoutes.sitemap,
};

export default Routes;
