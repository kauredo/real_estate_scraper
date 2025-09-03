import axios from "axios";
import { apiRoutes } from "../utils/routes";

// Create axios instance with default config
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Important for cookies/sessions if needed
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Handle unauthorized (redirect to login, clear token, etc.)
        localStorage.removeItem("token");
      }

      if (status === 404) {
        // Handle not found
        console.error("Resource not found");
      }

      if (status === 500) {
        // Handle server error
        console.error("Server error occurred");
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const login = async (email, password) => {
  try {
    const response = await api.post(apiRoutes.auth, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
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

  // Parse token if needed - usually JWT can be decoded client-side
  try {
    // For a simple implementation, return a boolean
    return { isAuthenticated: true };
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
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
export const submitContactForm = data => api.post(apiRoutes.contact, data);

// Blog posts API functions
export const getBlogPosts = (params = {}) =>
  api.get(apiRoutes.blogPosts, { params });
export const getBlogPost = slug => api.get(apiRoutes.blogPost(slug));

// Admin - Blog posts API functions
export const adminGetBlogPosts = (params = {}) =>
  api.get(apiRoutes.admin.blogPosts, { params });
export const adminGetBlogPost = id => api.get(apiRoutes.admin.blogPost(id));
export const adminCreateBlogPost = data => {
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
export const adminUpdateBlogPost = (id, data) => {
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

export const adminDeleteBlogPost = id =>
  api.delete(apiRoutes.admin.blogPost(id));

// Listings API functions
export const getListings = (params = {}) =>
  api.get(apiRoutes.listings, { params });
export const getListing = slug => api.get(apiRoutes.listing(slug));

// Listing complexes API functions
export const getListingComplexes = (params = {}) =>
  api.get(apiRoutes.listingComplexes, { params });
export const getListingComplex = slug =>
  api.get(apiRoutes.listingComplex(slug));

// Admin - Listings API functions
export const adminGetListings = (params = {}) =>
  api.get(apiRoutes.admin.listings, { params });
export const adminGetListing = id => api.get(apiRoutes.admin.listing(id));
export const adminCreateListing = data =>
  api.post(apiRoutes.admin.listings, { listing: data });
export const adminUpdateListing = (id, data) =>
  api.put(apiRoutes.admin.listing(id), { listing: data });
export const adminDeleteListing = id => api.delete(apiRoutes.admin.listing(id));
export const adminUpdateListingDetails = id =>
  api.post(apiRoutes.admin.updateDetailsListing(id));
export const adminRecoverListing = id =>
  api.post(apiRoutes.admin.recoverListing(id));
export const adminUpdateAllListings = () =>
  api.post(apiRoutes.admin.updateAllListings);

// Admin - Listing complexes API functions
export const adminGetListingComplexes = (params = {}) =>
  api.get(apiRoutes.admin.listingComplexes, { params });
export const adminGetListingComplex = id =>
  api.get(apiRoutes.admin.listingComplex(id));
export const adminCreateListingComplex = data =>
  api.post(apiRoutes.admin.listingComplexes, { listing_complex: data });
export const adminUpdateListingComplex = (id, data) =>
  api.put(apiRoutes.admin.listingComplex(id), { listing_complex: data });
export const adminDeleteListingComplex = id =>
  api.delete(apiRoutes.admin.listingComplex(id));
export const adminUpdateListingComplexDetails = id =>
  api.post(apiRoutes.admin.updateDetailsListingComplex(id));
export const adminUpdateListingComplexPhotos = (id, data) =>
  api.patch(apiRoutes.admin.photosListingComplex(id), data);
export const adminDeleteListingComplexPhoto = id =>
  api.delete(apiRoutes.admin.deletePhotoListingComplex(id));
export const adminFetchListingComplex = data =>
  api.post(apiRoutes.admin.fetchListingComplex, { listing_complex: data });

// Club API functions
export const getClub = () => api.get(apiRoutes.club);
export const getClubRules = () => api.get(apiRoutes.clubRules);
export const getClubStories = (params = {}) =>
  api.get(apiRoutes.clubStories, { params });
export const getClubStory = slug => api.get(apiRoutes.clubStory(slug));
export const joinClub = data => api.post(apiRoutes.clubJoin, data);

// Admin - Club stories API functions
export const adminGetClubStories = (params = {}) =>
  api.get(apiRoutes.admin.clubStories, { params });
export const adminGetClubStory = id => api.get(apiRoutes.admin.clubStory(id));
export const adminCreateClubStory = data =>
  api.post(apiRoutes.admin.clubStories, { club_story: data });
export const adminUpdateClubStory = (id, data) =>
  api.put(apiRoutes.admin.clubStory(id), { club_story: data });
export const adminDeleteClubStory = id =>
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
export const adminUploadBlogPhoto = (blogPostId, formData) =>
  api.post(apiRoutes.admin.blogPhotos, {
    ...formData,
    blog_post_id: blogPostId,
  });
export const adminDeleteBlogPhoto = id =>
  api.delete(apiRoutes.admin.blogPhoto(id));
export const adminDeletePhoto = id => api.delete(apiRoutes.admin.photo(id));
export const adminUploadClubStoryPhoto = (clubStoryId, formData) =>
  api.post(apiRoutes.admin.clubStoryPhotos, {
    ...formData,
    club_story_id: clubStoryId,
  });
export const adminDeleteClubStoryPhoto = id =>
  api.delete(apiRoutes.admin.clubStoryPhoto(id));

// Newsletter API functions
export const subscribeToNewsletter = data =>
  api.post(apiRoutes.newsletterSubscriptions, { newsletter: data });
export const unsubscribeFromNewsletter = id =>
  api.delete(apiRoutes.newsletterSubscription(id));
export const confirmNewsletterSubscription = (id, token) =>
  api.get(apiRoutes.confirmNewsletterSubscription(id, token));

// Admin - Newsletter Subscriptions API functions
export const adminGetNewsletterSubscriptions = () =>
  api.get(apiRoutes.admin.newsletterSubscriptions);

// Testimonials API functions
export const getTestimonials = () => api.get(apiRoutes.testimonials);

// Admin - Testimonials API functions
export const adminGetTestimonials = (params = {}) =>
  api.get(apiRoutes.admin.testimonials, { params });
export const adminGetTestimonial = id =>
  api.get(apiRoutes.admin.testimonial(id));
export const adminCreateTestimonial = data =>
  api.post(apiRoutes.admin.testimonials, { testimonial: data });
export const adminUpdateTestimonial = (id, data) =>
  api.put(apiRoutes.admin.testimonial(id), { testimonial: data });
export const adminDeleteTestimonial = id =>
  api.delete(apiRoutes.admin.testimonial(id));

// Variables API functions
export const getVariables = () => api.get(apiRoutes.variables);

// Admin - Variables API functions
export const adminGetVariables = () => api.get(apiRoutes.admin.variables);
export const adminCreateVariable = data =>
  api.post(apiRoutes.admin.variables, { variable: data });
export const adminUpdateVariable = (id, data) =>
  api.put(apiRoutes.admin.variable(id), { variable: data });
export const adminDeleteVariable = id =>
  api.delete(apiRoutes.admin.variable(id));

export default api;
