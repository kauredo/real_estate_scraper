import axios from "axios";

import { API_URL } from "./getters";

/**
 * Creates a new listing.
 * @param {Object} postData - The data for the new listing.
 */
export const createListing = async postData => {
  try {
    const response = await axios.post(
      `${API_URL}/backoffice/listings`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Creates a new blog post.
 * @param {Object} postData - The data for the new blog post.
 */
export const createBlogPost = async postData => {
  try {
    const response = await axios.post(
      `${API_URL}/backoffice/blog_posts`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates an existing blog post.
 * @param {number} id - The ID of the blog post to update.
 * @param {Object} updatedData - The updated data for the blog post.
 */
export const updateBlogPost = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/backoffice/blog_posts/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Creates a new Variable.
 * @param {Object} postData - The data for the new Variable.
 */
export const createVariable = async postData => {
  try {
    const response = await axios.post(
      `${API_URL}/backoffice/variables`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates an existing Variable.
 * @param {number} id - The ID of the Variable to update.
 * @param {Object} updatedData - The updated data for the Variable.
 */
export const updateVariable = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/backoffice/variables/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Deletes a Variable.
 * @param {number} id - The ID of the Variable to delete.
 */
export const deleteVariable = async id => {
  try {
    await axios.delete(`${API_URL}/backoffice/variables/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
