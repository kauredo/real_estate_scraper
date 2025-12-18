import axios from "axios";
import { apiRoutes } from "../utils/routes";
import i18n from "../i18n";

// Create axios instance with default config
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": import.meta.env.VITE_API_KEY || "",
  },
  withCredentials: true, // Important for cookies/sessions if needed
});

// Request interceptor to add locale parameter to all requests
api.interceptors.request.use(
  (config) => {
    // Get current locale from i18n
    const currentLocale = i18n.language || "pt";

    // Add locale to query parameters
    if (!config.params) {
      config.params = {};
    }
    config.params.locale = currentLocale;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// We'll store notification functions that will be injected from the component tree
let notificationContext: {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
} | null = null;

export const setNotificationContext = (context: typeof notificationContext) => {
  notificationContext = context;
};

// Response interceptor for handling errors and success notifications
api.interceptors.response.use(
  (response) => {
    // Handle success responses that might need user feedback
    const method = response.config.method?.toUpperCase();
    const showSuccessForMethods = ["POST", "PUT", "DELETE", "PATCH"];

    if (
      method &&
      showSuccessForMethods.includes(method) &&
      notificationContext
    ) {
      // Check if it's a form submission or important update
      const url = response.config.url || "";

      if (url.includes("/contact")) {
        notificationContext.showSuccess("notifications.messages.contact_sent");
      } else if (url.includes("/newsletter_subscriptions")) {
        notificationContext.showSuccess(
          "notifications.messages.newsletter_subscribed",
        );
      }
      // Add more specific success messages as needed
    }

    return response;
  },
  (error) => {
    // Handle common errors with user-friendly notifications
    if (error.response && notificationContext) {
      const { status } = error.response;

      if (status === 404) {
        // Handle not found
        notificationContext.showError("notifications.messages.data_load_error");
      } else if (status === 500) {
        // Handle server error
        notificationContext.showError("notifications.messages.server_error");
      } else if (status === 422) {
        // Validation errors
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Please check your input and try again.";
        notificationContext.showError(errorMessage);
      } else {
        // Generic error
        notificationContext.showError("notifications.messages.network_error");
      }
    } else if (error.request && notificationContext) {
      // Network error
      notificationContext.showError("notifications.messages.network_error");
    }

    return Promise.reject(error);
  },
);

// API Documentation
export const getApiDocs = () => api.get(apiRoutes.docs);

// General page API functions
export const getHomePage = () => api.get(apiRoutes.home);
export const getAboutPage = () => api.get(apiRoutes.about);
export const getServicesPage = () => api.get(apiRoutes.services);
export const getContactPage = () => api.get(apiRoutes.contact_page);
export const getPrivacyPage = () => api.get(apiRoutes.privacy);
export const getTermsPage = () => api.get(apiRoutes.terms);
export const getFaqPage = () => api.get(apiRoutes.faq);
export const getBuyPage = () => api.get(apiRoutes.buy);
export const getSellPage = () => api.get(apiRoutes.sell);
export const toggleDarkMode = () => api.post(apiRoutes.toggleDarkMode);

// Contact API functions
export const submitContactForm = (data: Record<string, unknown>) =>
  api.post(apiRoutes.contact, data);

// Blog posts API functions
export const getBlogPosts = (params = {}) =>
  api.get(apiRoutes.blogPosts, { params });
export const getBlogPost = (slug: string, previewToken?: string) =>
  api.get(apiRoutes.blogPost(slug), {
    params: previewToken ? { preview_token: previewToken } : {},
  });

// Listings API functions
export const getListings = (params = {}) =>
  api.get(apiRoutes.listings, { params });
export const getListing = (slug: string, previewToken?: string) =>
  api.get(apiRoutes.listing(slug), {
    params: previewToken ? { preview_token: previewToken } : {},
  });

// Listing complexes API functions
export const getListingComplexes = (params = {}) =>
  api.get(apiRoutes.listingComplexes, { params });
export const getListingComplex = (slug: string, previewToken?: string) =>
  api.get(apiRoutes.listingComplex(slug), {
    params: previewToken ? { preview_token: previewToken } : {},
  });

// Club API functions
export const getClub = () => api.get(apiRoutes.club);
export const getClubRules = () => api.get(apiRoutes.clubRules);
export const getClubStories = (params = {}) =>
  api.get(apiRoutes.clubStories, { params });
export const getClubStory = (slug: string, previewToken?: string) =>
  api.get(apiRoutes.clubStory(slug), {
    params: previewToken ? { preview_token: previewToken } : {},
  });
export const joinClub = (data: Record<string, unknown>) =>
  api.post(apiRoutes.clubJoin, data);

// Newsletter API functions
export const subscribeToNewsletter = (data: Record<string, unknown>) =>
  api.post(apiRoutes.newsletterSubscriptions, { newsletter: data });
export const unsubscribeFromNewsletter = (id: string) =>
  api.delete(apiRoutes.newsletterSubscription(id));
export const confirmNewsletterSubscription = (id: string, token: string) =>
  api.get(apiRoutes.confirmNewsletterSubscription(id, token));

// Testimonials API functions
export const getTestimonials = () => api.get(apiRoutes.testimonials);

// Variables API functions
export const getVariables = () => api.get(apiRoutes.variables);

export default api;
