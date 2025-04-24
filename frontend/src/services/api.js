import axios from "axios";

// Base URL changes based on environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Blog posts
export const getBlogPosts = () => api.get("/blog_posts");
export const getBlogPost = slug => api.get(`/blog_posts/${slug}`);

// Listings
export const getListings = params => api.get("/listings", { params });
export const getListing = slug => api.get(`/listings/${slug}`);

// Listing Complexes
export const getListingComplexes = () => api.get("/listing_complexes");
export const getListingComplex = slug => api.get(`/listing_complexes/${slug}`);

// Club Stories
export const getClubStories = () => api.get("/club_stories");
export const getClubStory = slug => api.get(`/club_stories/${slug}`);

// Contact Form
export const submitContactForm = data => api.post("/contact", data);

export default api;
