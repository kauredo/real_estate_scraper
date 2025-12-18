/**
 * Optimizes image URLs for better performance
 * - For Cloudinary URLs: adds transformation parameters
 * - For external URLs: returns as-is (already optimized or not controllable)
 */

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "fill" | "fit" | "scale" | "thumb";
}

/**
 * Optimizes an image URL by adding transformation parameters
 * Currently only supports Cloudinary URLs. External URLs are returned unchanged.
 *
 * Note: Most scraped images come from external sources (soukwportugal.pt, kwportugal.pt)
 * and cannot be optimized without proxying through our CDN or Cloudinary fetch.
 *
 * @param url - Original image URL
 * @param options - Transformation options (only applies to Cloudinary URLs)
 * @returns Optimized URL or original URL if not optimizable
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: CloudinaryOptions = {},
): string {
  // Return original URL if empty or not a Cloudinary URL
  // Note: External URLs from scraped listings (soukwportugal.pt, kwportugal.pt)
  // are returned as-is since we can't optimize them without proxying
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
  } = options;

  try {
    // Parse the Cloudinary URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    // Find the upload index
    const uploadIndex = pathParts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return url;

    // Build transformation string
    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);

    // Add progressive loading for JPEGs
    transformations.push("fl_progressive");

    // Add fetch format for browser-specific format negotiation
    if (format === "auto") {
      transformations.push("fl_lossy");
    }

    const transformationString = transformations.join(",");

    // Insert transformation after 'upload'
    pathParts.splice(uploadIndex + 1, 0, transformationString);

    urlObj.pathname = pathParts.join("/");
    return urlObj.toString();
  } catch (error) {
    console.error("Error optimizing Cloudinary URL:", error);
    return url;
  }
}

/**
 * Generates a low-quality placeholder URL for progressive loading
 * @param url - Original Cloudinary image URL
 * @returns Low-quality placeholder URL
 */
export function getCloudinaryPlaceholder(url: string): string {
  return optimizeCloudinaryUrl(url, {
    width: 50,
    quality: 20,
    format: "auto",
  });
}

/**
 * Preloads images for better performance
 * @param urls - Array of image URLs to preload
 * @param limit - Maximum number of images to preload
 */
export function preloadImages(urls: string[], limit: number = 5): void {
  const imagesToPreload = urls.slice(0, limit);
  imagesToPreload.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
