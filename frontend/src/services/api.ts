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
    const response = await api.post(apiRoutes.adminSession, {
      admin: { email, password },
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
    await api.delete(apiRoutes.adminSession);
    localStorage.removeItem("token");
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

// General API functions
export const toggleDarkMode = () => api.post(apiRoutes.toggleDarkMode);

// Contact API functions
export const submitContactForm = data => api.post(apiRoutes.newContact, data);

// Blog posts API functions
export const getBlogPosts = params => api.get(apiRoutes.blogPosts, { params });
export const getBlogPost = slug => api.get(apiRoutes.blogPost(slug));
export const createBlogPost = data =>
  api.post(apiRoutes.backoffice.blogPosts, { blog_post: data });
export const updateBlogPost = (id, data) =>
  api.put(apiRoutes.backoffice.blogPost(id), { blog_post: data });
export const deleteBlogPost = id =>
  api.delete(apiRoutes.backoffice.blogPost(id));

// Listings API functions
export const getListings = params => api.get(apiRoutes.listings, { params });
export const getListing = slug => api.get(apiRoutes.listing(slug));
export const createListing = data =>
  api.post(apiRoutes.backoffice.listings, { listing: data });
export const updateListing = (id, data) =>
  api.put(apiRoutes.backoffice.listing(id), { listing: data });
export const deleteListing = id => api.delete(apiRoutes.backoffice.listing(id));
export const updateListingDetails = id =>
  api.post(apiRoutes.backoffice.updateDetailsListing(id));
export const recoverListing = id =>
  api.post(apiRoutes.backoffice.recoverListing(id));
export const updateAllListings = () =>
  api.post(apiRoutes.backoffice.updateAllListings);

// Listing complexes API functions
export const getListingComplexes = params =>
  api.get(apiRoutes.listingComplexes, { params });
export const getListingComplex = slug =>
  api.get(apiRoutes.listingComplex(slug));
export const createListingComplex = data =>
  api.post(apiRoutes.backoffice.listingComplexes, { listing_complex: data });
export const updateListingComplex = (id, data) =>
  api.put(apiRoutes.backoffice.listingComplex(id), { listing_complex: data });
export const deleteListingComplex = id =>
  api.delete(apiRoutes.backoffice.listingComplex(id));
export const updateListingComplexDetails = id =>
  api.post(apiRoutes.backoffice.updateDetailsListingComplex(id));
export const updateListingComplexPhotos = (id, data) =>
  api.patch(apiRoutes.backoffice.photosListingComplex(id), data);
export const deleteListingComplexPhoto = id =>
  api.delete(apiRoutes.backoffice.deletePhotoListingComplex(id));
export const fetchListingComplex = data =>
  api.post(apiRoutes.backoffice.fetchListingComplex, { listing_complex: data });

// Club API functions
export const getClubStories = params =>
  api.get(apiRoutes.clubStories, { params });
export const getClubStory = slug => api.get(apiRoutes.clubStory(slug));
export const joinClub = data => api.post(apiRoutes.clubJoin, data);
export const createClubStory = data =>
  api.post(apiRoutes.backoffice.clubStories, { club_story: data });
export const updateClubStory = (id, data) =>
  api.put(apiRoutes.backoffice.clubStory(id), { club_story: data });
export const deleteClubStory = id =>
  api.delete(apiRoutes.backoffice.clubStory(id));

// Photos API functions
export const uploadTinymceAsset = formData =>
  api.post(apiRoutes.tinymceAssets, formData);
export const uploadBlogPhoto = formData =>
  api.post(apiRoutes.blogPhotos, formData);
export const deleteBlogPhoto = id => api.delete(apiRoutes.blogPhoto(id));
export const deletePhoto = id => api.delete(apiRoutes.photo(id));
export const uploadClubStoryPhoto = formData =>
  api.post(apiRoutes.clubStoryPhotos, formData);
export const deleteClubStoryPhoto = id =>
  api.delete(apiRoutes.clubStoryPhoto(id));

// Newsletter API functions
export const subscribeToNewsletter = data =>
  api.post(apiRoutes.newsletterSubscriptions, {
    newsletter_subscription: data,
  });
export const unsubscribeFromNewsletter = id =>
  api.delete(apiRoutes.newsletterSubscription(id));
export const confirmNewsletterSubscription = (id, token) =>
  api.get(apiRoutes.confirmNewsletterSubscription(id, token));

// Variables API functions
export const getVariables = () => api.get(apiRoutes.backoffice.variables);
export const createVariable = data =>
  api.post(apiRoutes.backoffice.variables, { variable: data });
export const updateVariable = (id, data) =>
  api.put(apiRoutes.backoffice.variable(id), { variable: data });
export const deleteVariable = id =>
  api.delete(apiRoutes.backoffice.variable(id));

// Testimonials API functions
export const getTestimonials = () => api.get(apiRoutes.backoffice.testimonials);
export const getTestimonial = id =>
  api.get(apiRoutes.backoffice.testimonial(id));
export const createTestimonial = data =>
  api.post(apiRoutes.backoffice.testimonials, { testimonial: data });
export const updateTestimonial = (id, data) =>
  api.put(apiRoutes.backoffice.testimonial(id), { testimonial: data });
export const deleteTestimonial = id =>
  api.delete(apiRoutes.backoffice.testimonial(id));

export default api;
