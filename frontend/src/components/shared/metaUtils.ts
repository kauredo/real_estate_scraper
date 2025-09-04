import { Listing } from "../../utils/interfaces";

/**
 * Utility functions for generating meta tag data from various content types
 */

/**
 * Generate meta tag data from a blog post
 */
export const getBlogMetaTags = (blogPost: any) => ({
  title: blogPost?.meta_title || blogPost?.title,
  description:
    blogPost?.meta_description ||
    (blogPost?.description ? blogPost.description.substring(0, 160) : ""),
  image: blogPost?.main_photo,
  type: "article" as const,
});

/**
 * Generate meta tag data from a property listing
 */
export const getListingMetaTags = (listing: Listing) => ({
  title: listing?.title || `Property in ${listing?.address}`,
  description: listing?.description
    ? listing.description.substring(0, 160)
    : `${listing?.kind} property for ${listing?.objective}. Price: €${listing?.price}`,
  image:
    listing?.photos && listing.photos.length > 0
      ? listing.photos[0]
      : undefined,
  type: "website" as const,
});

/**
 * Generate meta tag data from a listing complex
 */
export const getListingComplexMetaTags = (complex: any) => ({
  title: complex?.title || complex?.name,
  description: complex?.description
    ? complex.description.substring(0, 160)
    : `Luxury property development: ${complex?.name}`,
  image:
    complex?.photos && complex.photos.length > 0
      ? complex.photos[0]
      : undefined,
  type: "website" as const,
});

/**
 * Generate meta tag data from a club story
 */
export const getClubStoryMetaTags = (story: any) => ({
  title: story?.title,
  description: story?.description ? story.description.substring(0, 160) : "",
  image: story?.main_photo,
  type: "article" as const,
});

/**
 * Generate default meta tags for a page type with custom overrides
 */
export const getPageMetaTags = (
  pageType: string,
  overrides: {
    title?: string;
    description?: string;
    image?: string;
  } = {}
) => ({
  title: overrides.title,
  description: overrides.description,
  image: overrides.image,
  type: "website" as const,
  pageType,
});

export default {
  getBlogMetaTags,
  getListingMetaTags,
  getListingComplexMetaTags,
  getClubStoryMetaTags,
  getPageMetaTags,
};
