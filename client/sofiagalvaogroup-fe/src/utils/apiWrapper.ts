// apiWrapper.ts
import axios from "axios";
import { API_URL } from "./getters"; // Adjust the import path as necessary

/**
 * Executes an API call with a specified HTTP method and sets flash messages based on the response.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} data - The data to send with the request.
 * @param {'post'|'patch'|'put'|'delete'|'get'} method - The HTTP method to use.
 * @param {Function} setFlashMessage - Function to set flash messages.
 * @returns {Promise<any>} The promise returned by the API call.
 */
export const executeApiCall = async (
  endpoint,
  data,
  method,
  setFlashMessage,
  type = "application/json"
) => {
  try {
    const response = await axios[method](`${API_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": type,
      },
    });
    // Assuming the response contains a type and message
    setFlashMessage({
      type: response.data.type || "success",
      message: response.data.message || "Operation completed successfully.",
    });

    return response.data;
  } catch (error) {
    // Handle error case
    setFlashMessage({
      type: "error",
      message:
        (error as any).response?.data?.errors ||
        "An unexpected error occurred.",
    });

    // throw error; // Rethrow the error if further handling is required
  }
};
