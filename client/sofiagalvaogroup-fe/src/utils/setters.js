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
