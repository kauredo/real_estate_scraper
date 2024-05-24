import { executeApiCall } from "./apiWrapper";

/**
 * Creates a new listing.
 * @param {Object} postData - The data for the new listing.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const createListing = async (postData, setFlashMessage) => {
  return executeApiCall(
    "/backoffice/listings",
    postData,
    "post",
    setFlashMessage
  );
};

/**
 * Updates an existing listing.
 * @param {number} id - The ID of the listing to update.
 * @param {Object} updatedData - The updated data for the listing.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateListing = async (id, updatedData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/listings/${id}`,
    updatedData,
    "put",
    setFlashMessage
  );
};

/**
 * Updates all listings.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateAllListings = async setFlashMessage => {
  return executeApiCall(
    "/backoffice/listings/update_all",
    null,
    "post",
    setFlashMessage
  );
};

/**
 * Update listing details from website.
 * @param {number} id - The ID of the listing to update.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateListingDetails = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/listings/${id}/update_details`,
    null,
    "post",
    setFlashMessage
  );
};

/**
 * Deletes a listing.
 * @param {number} id - The ID of the listing to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deleteListing = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/listings/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};

/**
 * Creates a new listing complex.
 * @param {Object} postData - The data for the new listing complex.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const createListingComplex = async (postData, setFlashMessage) => {
  return executeApiCall(
    "/backoffice/listing_complexes",
    postData,
    "post",
    setFlashMessage
  );
};

/**
 * Updates an existing listing complex.
 * @param {number} id - The ID of the listing complex to update.
 * @param {Object} updatedData - The updated data for the listing complex.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateListingComplex = async (
  id,
  updatedData,
  setFlashMessage
) => {
  return executeApiCall(
    `/backoffice/listing_complexes/${id}`,
    updatedData,
    "put",
    setFlashMessage
  );
};

/**
 * Updates an existing listing complex with photos.
 * @param {number} id - The ID of the listing complex to update.
 * @param {Object} updatedData - The updated data for the listing complex.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updatePhotosListingComplex = async (
  id,
  updatedData,
  setFlashMessage
) => {
  return executeApiCall(
    `/backoffice/listing_complexes/${id}`,
    updatedData,
    "put",
    setFlashMessage,
    "multipart/form-data"
  );
};

/**
 * Deletes a photo.
 * @param {number} id - The ID of the photo to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deletePhoto = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/photos/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};

/**
 * Deletes a listing complex.
 * @param {number} id - The ID of the listing complex to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deleteListingComplex = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/listing_complexes/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};

/**
 * Creates a new blog post.
 * @param {Object} postData - The data for the new blog post.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const createBlogPost = async (postData, setFlashMessage) => {
  return executeApiCall(
    "/backoffice/blog_posts",
    postData,
    "post",
    setFlashMessage
  );
};

/**
 * Updates an existing blog post.
 * @param {number} id - The ID of the blog post to update.
 * @param {Object} updatedData - The updated data for the blog post.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateBlogPost = async (id, updatedData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/blog_posts/${id}`,
    updatedData,
    "put",
    setFlashMessage
  );
};

/**
 * Deletes a blog post.
 * @param {number} id - The ID of the blog post to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deleteBlogPost = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/blog_posts/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};

/**
 * Creates a new Variable.
 * @param {Object} postData - The data for the new Variable.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const createVariable = async (postData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/variables`,
    postData,
    "post",
    setFlashMessage
  );
};

/**
 * Updates an existing Variable.
 * @param {number} id - The ID of the Variable to update.
 * @param {Object} updatedData - The updated data for the Variable.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateVariable = async (id, updatedData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/variables/${id}`,
    updatedData,
    "put",
    setFlashMessage
  );
};

/**
 * Deletes a Variable.
 * @param {number} id - The ID of the Variable to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deleteVariable = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/variables/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};

/**
 * Creates a new Testimonial.
 * @param {Object} postData - The data for the new Testimonial.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const createTestimonial = async (postData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/testimonials`,
    postData,
    "post",
    setFlashMessage
  );
};

/**
 * Updates an existing Testimonial.
 * @param {number} id - The ID of the Testimonial to update.
 * @param {Object} updatedData - The updated data for the Testimonial.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const updateTestimonial = async (id, updatedData, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/testimonials/${id}`,
    updatedData,
    "put",
    setFlashMessage
  );
};

/**
 * Deletes a Testimonial.
 * @param {number} id - The ID of the Testimonial to delete.
 * @param {Function} setFlashMessage - Function to set flash messages.
 */
export const deleteTestimonial = async (id, setFlashMessage) => {
  return executeApiCall(
    `/backoffice/testimonials/${id}`,
    null,
    "delete",
    setFlashMessage
  );
};
