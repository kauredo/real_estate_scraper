import axios from "axios";
import { apiRoutes } from "../utils/routes";

// Create axios instance with default config
// Note: Backoffice uses JWT authentication, not API keys
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// We'll store notification functions that will be injected from the component tree
let notificationContext: {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
} | null = null;

export const setNotificationContext = (context: typeof notificationContext) => {
  notificationContext = context;
};

// Store selected tenant ID for super admin filtering
let selectedTenantId: number | null = null;

export const setSelectedTenantId = (tenantId: number | null) => {
  selectedTenantId = tenantId;
};

// Request interceptor for adding auth token and tenant filter
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Add tenant filter header for super admins
    if (selectedTenantId !== null) {
      config.headers["X-Tenant-Filter"] = selectedTenantId.toString();
    }

    return config;
  },
  (error) => Promise.reject(error),
);

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
      }
      // Add more specific success messages as needed
    }

    return response;
  },
  (error) => {
    // Skip error notifications for cancelled/aborted requests
    if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    // Handle common errors with user-friendly notifications
    if (error.response && notificationContext) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem("token");
        notificationContext.showError(
          "Your session has expired. Please log in again.",
        );
      } else if (status === 404) {
        notificationContext.showError("notifications.messages.data_load_error");
      } else if (status >= 500) {
        notificationContext.showError("notifications.messages.server_error");
      } else if (status === 422) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Please check your input and try again.";
        notificationContext.showError(errorMessage);
      } else if (status === 429) {
        notificationContext.showError("notifications.messages.server_error");
      }
    } else if (error.request && notificationContext) {
      // Actual network error (no response received)
      notificationContext.showError("notifications.messages.network_error");
    }

    return Promise.reject(error);
  },
);

// Auth API functions
export const login = async (email: string, password: string) => {
  const response = await api.post(apiRoutes.auth, {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    return { success: true };
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Parse JWT token - decode the payload (middle part of JWT)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      localStorage.removeItem("token");
      return null;
    }

    // Return user information from token
    return {
      id: payload.admin_id || payload.user_id,
      email: payload.email,
      isSuperAdmin: payload.super_admin === true,
      tenantId: payload.tenant_id,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

export const getCurrentTenant = async () => {
  return api.get(apiRoutes.currentTenant);
};

export const getTenants = async () => {
  return api.get(apiRoutes.tenants);
};

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
export const getBlogPost = (slug: string) => api.get(apiRoutes.blogPost(slug));

// Admin - Blog posts API functions
export const adminGetBlogPosts = (params = {}) =>
  api.get(apiRoutes.admin.blogPosts, { params });
export const adminGetBlogPost = (id: number) =>
  api.get(apiRoutes.admin.blogPost(id));
export const adminCreateBlogPost = (
  data: FormData | Record<string, unknown>,
) => {
  if (data instanceof FormData) {
    return api.post(apiRoutes.admin.blogPosts, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return api.post(apiRoutes.admin.blogPosts, { blog_post: data });
  }
};
export const adminUpdateBlogPost = (
  id: number,
  data: FormData | Record<string, unknown>,
) => {
  if (data instanceof FormData) {
    return api.put(apiRoutes.admin.blogPost(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return api.put(apiRoutes.admin.blogPost(id), { blog_post: data });
  }
};

export const adminDeleteBlogPost = (id: number) =>
  api.delete(apiRoutes.admin.blogPost(id));

// Listings API functions
export const getListings = (params = {}) =>
  api.get(apiRoutes.listings, { params });
export const getListing = (slug: string) => api.get(apiRoutes.listing(slug));

// Listing complexes API functions
export const getListingComplexes = (params = {}) =>
  api.get(apiRoutes.listingComplexes, { params });
export const getListingComplex = (slug: string) =>
  api.get(apiRoutes.listingComplex(slug));

// Admin - Listings API functions
export const adminGetListings = (params = {}) =>
  api.get(apiRoutes.admin.listings, { params });
export const adminGetListing = (id: number) =>
  api.get(apiRoutes.admin.listing(id));
export const adminCreateListing = (
  data: Record<string, unknown> | { [key: string]: unknown },
) => api.post(apiRoutes.admin.listings, { listing: data });
export const adminUpdateListing = (
  id: number,
  data: Record<string, unknown> | { [key: string]: unknown },
) => api.put(apiRoutes.admin.listing(id), { listing: data });
export const adminDeleteListing = (id: number) =>
  api.delete(apiRoutes.admin.listing(id));
export const adminUpdateListingDetails = (id: number) =>
  api.post(apiRoutes.admin.updateDetailsListing(id));
export const adminRecoverListing = (id: number) =>
  api.post(apiRoutes.admin.recoverListing(id));
export const adminUpdateAllListings = () =>
  api.post(apiRoutes.admin.updateAllListings);

// Admin - Listing complexes API functions
export const adminGetListingComplexes = (params = {}) =>
  api.get(apiRoutes.admin.listingComplexes, { params });
export const adminGetListingComplex = (id: number) =>
  api.get(apiRoutes.admin.listingComplex(id));
export const adminCreateListingComplex = (
  data: Record<string, unknown> | { [key: string]: unknown },
) => api.post(apiRoutes.admin.listingComplexes, { listing_complex: data });
export const adminUpdateListingComplex = (
  id: number,
  data: Record<string, unknown> | { [key: string]: unknown },
) => api.put(apiRoutes.admin.listingComplex(id), { listing_complex: data });
export const adminDeleteListingComplex = (id: number) =>
  api.delete(apiRoutes.admin.listingComplex(id));
export const adminUpdateListingComplexDetails = (id: number) =>
  api.post(apiRoutes.admin.updateDetailsListingComplex(id));
export const adminUpdateListingComplexPhotos = (
  id: number,
  data: Record<string, unknown>,
) => api.patch(apiRoutes.admin.photosListingComplex(id), data);
export const adminUploadListingComplexPhotos = (
  id: number,
  formData: FormData,
) =>
  api.post(apiRoutes.admin.photosListingComplex(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const adminDeleteListingComplexPhoto = (id: number) =>
  api.delete(apiRoutes.admin.deletePhotoListingComplex(id));
export const adminFetchListingComplex = (data: Record<string, unknown>) =>
  api.post(apiRoutes.admin.fetchListingComplex, { listing_complex: data });

// Club API functions
export const getClub = () => api.get(apiRoutes.club);
export const getClubRules = () => api.get(apiRoutes.clubRules);
export const getClubStories = (params = {}) =>
  api.get(apiRoutes.clubStories, { params });
export const getClubStory = (slug: string) =>
  api.get(apiRoutes.clubStory(slug));
export const joinClub = (data: Record<string, unknown>) =>
  api.post(apiRoutes.clubJoin, data);

// Admin - Club stories API functions
export const adminGetClubStories = (params = {}) =>
  api.get(apiRoutes.admin.clubStories, { params });
export const adminGetClubStory = (id: number) =>
  api.get(apiRoutes.admin.clubStory(id));
export const adminCreateClubStory = (
  data: FormData | Record<string, unknown>,
) =>
  data instanceof FormData
    ? api.post(apiRoutes.admin.clubStories, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    : api.post(apiRoutes.admin.clubStories, { club_story: data });
export const adminUpdateClubStory = (
  id: number,
  data: FormData | Record<string, unknown>,
) =>
  data instanceof FormData
    ? api.put(apiRoutes.admin.clubStory(id), data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    : api.put(apiRoutes.admin.clubStory(id), { club_story: data });
export const adminDeleteClubStory = (id: number) =>
  api.delete(apiRoutes.admin.clubStory(id));

// Admin - Club Users API functions
export const adminGetClubUsers = () => api.get(apiRoutes.admin.clubUsers);
export const adminExportClubUsers = () =>
  api.get(apiRoutes.admin.exportClubUsers, {
    responseType: "blob", // Important for file downloads
  });

// Admin - Photos API functions
export const adminGetPhotos = (params = {}) =>
  api.get(apiRoutes.admin.photos, { params });
export const adminUploadBlogPhoto = (
  blogPostId: number,
  formData: Record<string, unknown>,
) =>
  api.post(apiRoutes.admin.blogPhotos, {
    ...formData,
    blog_post_id: blogPostId,
  });
export const adminDeleteBlogPhoto = (id: number) =>
  api.delete(apiRoutes.admin.blogPhoto(id));
export const adminDeletePhoto = (id: number) =>
  api.delete(apiRoutes.admin.photo(id));
export const adminUploadClubStoryPhoto = (
  clubStoryId: number,
  formData: FormData | Record<string, unknown>,
) =>
  formData instanceof FormData
    ? api.post(apiRoutes.admin.clubStoryPhotos, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    : api.post(apiRoutes.admin.clubStoryPhotos, {
        ...formData,
        club_story_id: clubStoryId,
      });
export const adminDeleteClubStoryPhoto = (id: number) =>
  api.delete(apiRoutes.admin.clubStoryPhoto(id));

// Admin - Newsletter Subscriptions API functions
export const adminGetNewsletterSubscriptions = () =>
  api.get(apiRoutes.admin.newsletterSubscriptions);

// Testimonials API functions
export const getTestimonials = () => api.get(apiRoutes.testimonials);

// Admin - Testimonials API functions
export const adminGetTestimonials = (params = {}) =>
  api.get(apiRoutes.admin.testimonials, { params });
export const adminGetTestimonial = (id: number) =>
  api.get(apiRoutes.admin.testimonial(id));
export const adminCreateTestimonial = (data: Record<string, unknown>) =>
  api.post(apiRoutes.admin.testimonials, { testimonial: data });
export const adminUpdateTestimonial = (
  id: number,
  data: Record<string, unknown>,
) => api.put(apiRoutes.admin.testimonial(id), { testimonial: data });
export const adminDeleteTestimonial = (id: number) =>
  api.delete(apiRoutes.admin.testimonial(id));

// Variables API functions
export const getVariables = () => api.get(apiRoutes.variables);

// Admin - Variables API functions
export const adminGetVariables = () => api.get(apiRoutes.admin.variables);
export const adminCreateVariable = (data: Record<string, unknown>) =>
  api.post(apiRoutes.admin.variables, { variable: data });
export const adminUpdateVariable = (
  id: number,
  data: Record<string, unknown>,
) => api.put(apiRoutes.admin.variable(id), { variable: data });
export const adminDeleteVariable = (id: number) =>
  api.delete(apiRoutes.admin.variable(id));

// Super Admin - Admins Management API functions
export const superAdminGetAdmins = (params = {}) =>
  api.get(apiRoutes.superAdmin.admins, { params });
export const superAdminGetAdmin = (id: number) =>
  api.get(apiRoutes.superAdmin.admin(id));
export const superAdminCreateAdmin = (data: Record<string, unknown>) =>
  api.post(apiRoutes.superAdmin.admins, { admin: data });
export const superAdminUpdateAdmin = (
  id: number,
  data: Record<string, unknown>,
) => api.put(apiRoutes.superAdmin.admin(id), { admin: data });
export const superAdminDeleteAdmin = (id: number) =>
  api.delete(apiRoutes.superAdmin.admin(id));
export const superAdminConfirmAdmin = (id: number) =>
  api.post(apiRoutes.superAdmin.confirmAdmin(id));
export const superAdminUnconfirmAdmin = (id: number) =>
  api.post(apiRoutes.superAdmin.unconfirmAdmin(id));
export const superAdminResetAdminPassword = (
  id: number,
  password: string,
  passwordConfirmation: string,
) =>
  api.post(apiRoutes.superAdmin.resetPasswordAdmin(id), {
    password,
    password_confirmation: passwordConfirmation,
  });

// Super Admin - Tenants Management API functions
export const superAdminGetTenants = () => api.get(apiRoutes.superAdmin.tenants);
export const superAdminGetTenant = (id: number) =>
  api.get(apiRoutes.superAdmin.tenant(id));
export const superAdminCreateTenant = (data: Record<string, unknown>) =>
  api.post(apiRoutes.superAdmin.tenants, { tenant: data });
export const superAdminUpdateTenant = (
  id: number,
  data: Record<string, unknown>,
) => api.put(apiRoutes.superAdmin.tenant(id), { tenant: data });
export const superAdminDeleteTenant = (id: number) =>
  api.delete(apiRoutes.superAdmin.tenant(id));
export const superAdminToggleActiveTenant = (id: number) =>
  api.post(apiRoutes.superAdmin.toggleActiveTenant(id));
export const superAdminRotateApiKey = (id: number) =>
  api.post(apiRoutes.superAdmin.rotateApiKeyTenant(id));
export const superAdminUpdateTenantFeatures = (
  id: number,
  features: Record<string, unknown>,
) => api.patch(apiRoutes.superAdmin.updateFeaturesTenant(id), { features });

// Preview Tokens API functions
export const generatePreviewToken = (contentType: string, contentId: number) =>
  api.post(apiRoutes.admin.previewTokens, {
    content_type: contentType,
    content_id: contentId,
  });

export default api;
