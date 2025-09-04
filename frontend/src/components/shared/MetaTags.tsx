import { useMetaTags } from "../../hooks/useMetaTags";
import { useTranslation } from "react-i18next";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
  // Fallback props for when specific content isn't provided
  pageType?:
    | "home"
    | "blog"
    | "listings"
    | "about"
    | "contact"
    | "club"
    | "club_stories"
    | "club_rules"
    | "enterprises"
    | "faq"
    | "services"
    | "sell"
    | "kw"
    | "error"
    | "privacy"
    | "terms";
  // Blog post meta attributes
  blogMeta?: {
    meta_title?: string;
    meta_description?: string;
  };
  // Listing meta attributes (for future expansion)
  listingMeta?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  type = "website",
  url,
  pageType,
  blogMeta,
  listingMeta,
}) => {
  const { t } = useTranslation();

  // Determine final meta values with proper fallbacks
  const finalTitle = getFinalTitle(title, blogMeta, listingMeta, pageType, t);
  const finalDescription = getFinalDescription(
    description,
    blogMeta,
    listingMeta,
    pageType,
    t
  );
  const finalImage = getFinalImage(image, listingMeta);
  const finalUrl = url || window.location.href;

  useMetaTags({
    title: finalTitle,
    description: finalDescription,
    image: finalImage,
    type,
    url: finalUrl,
  });

  return null; // This component only manages meta tags, renders nothing
};

// Helper functions for meta tag fallbacks
const getFinalTitle = (
  title?: string,
  blogMeta?: { meta_title?: string },
  listingMeta?: { title?: string },
  pageType?:
    | "home"
    | "blog"
    | "listings"
    | "about"
    | "contact"
    | "club"
    | "club_stories"
    | "club_rules"
    | "enterprises"
    | "faq"
    | "services"
    | "sell"
    | "kw"
    | "error"
    | "privacy"
    | "terms",
  t?: any
): string => {
  // Priority: explicit title > blog meta_title > listing title > page type default > site default
  if (title) return title;
  if (blogMeta?.meta_title) return blogMeta.meta_title;
  if (listingMeta?.title) return listingMeta.title;

  // Default titles based on page type using existing structured format
  if (pageType && t) {
    const metaTitle = t(`meta.${pageType}.title`);
    if (metaTitle && metaTitle !== `meta.${pageType}.title`) return metaTitle;
  }

  return "Sofia Galvão Group - Luxury Real Estate in Portugal";
};

const getFinalDescription = (
  description?: string,
  blogMeta?: { meta_description?: string },
  listingMeta?: { description?: string },
  pageType?:
    | "home"
    | "blog"
    | "listings"
    | "about"
    | "contact"
    | "club"
    | "club_stories"
    | "club_rules"
    | "enterprises"
    | "faq"
    | "services"
    | "sell"
    | "kw"
    | "error"
    | "privacy"
    | "terms",
  t?: any
): string => {
  // Priority: explicit description > blog meta_description > listing description > page type default > site default
  if (description) return description;
  if (blogMeta?.meta_description) return blogMeta.meta_description;
  if (listingMeta?.description) return listingMeta.description;

  // Default descriptions based on page type using existing structured format
  if (pageType && t) {
    const metaDescription = t(`meta.${pageType}.description`);
    if (metaDescription && metaDescription !== `meta.${pageType}.description`)
      return metaDescription;
  }

  return "Your trusted real estate platform - Find luxury properties in Portugal with Sofia Galvão Group";
};

const getFinalImage = (
  image?: string,
  listingMeta?: { images?: string[] }
): string => {
  // Priority: explicit image > first listing image > default site image
  if (image) return image;
  if (listingMeta?.images && listingMeta.images.length > 0)
    return listingMeta.images[0];

  // Default site image (you should add this to your public folder)
  return "/images/default-og-image.jpg";
};

export default MetaTags;
