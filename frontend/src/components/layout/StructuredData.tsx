import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface StructuredDataProps {
  type?:
    | "organization"
    | "listing"
    | "blog_post"
    | "breadcrumbs"
    | "listings_collection";
  id?: string; // Slug for listing or blog post
  data?: Record<string, unknown>; // Pre-fetched data to avoid extra API calls
}

/**
 * StructuredData component for adding JSON-LD structured data to pages
 * Integrates with API structured data endpoints for SEO and rich snippets
 */
export const StructuredData = ({ type, id, data }: StructuredDataProps) => {
  const location = useLocation();

  useEffect(() => {
    // If data is provided directly, inject it
    if (data) {
      injectStructuredData(data, type);
      return;
    }

    // Otherwise fetch from API
    if (type && id) {
      fetchAndInjectStructuredData(type, id);
    } else if (
      type === "organization" ||
      type === "listings_collection" ||
      type === "breadcrumbs"
    ) {
      // These don't need an ID
      fetchAndInjectStructuredData(type);
    }
  }, [type, id, data, location]);

  return null; // This component doesn't render anything
};

const fetchAndInjectStructuredData = async (type: string, id?: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    let endpoint = "";
    switch (type) {
      case "organization":
        endpoint = `${apiUrl}/structured_data/organization`;
        break;
      case "listing":
        endpoint = `${apiUrl}/structured_data/listing/${id}`;
        break;
      case "blog_post":
        endpoint = `${apiUrl}/structured_data/blog_post/${id}`;
        break;
      case "breadcrumbs":
        endpoint = `${apiUrl}/structured_data/breadcrumbs?path=${window.location.pathname}`;
        break;
      case "listings_collection":
        endpoint = `${apiUrl}/structured_data/listings_collection`;
        break;
      default:
        console.warn(`Unknown structured data type: ${type}`);
        return;
    }

    const response = await fetch(endpoint, {
      headers: {
        "X-API-KEY": apiKey || "",
      },
    });

    if (response.ok) {
      const jsonLd = await response.json();
      injectStructuredData(jsonLd, type);
    }
  } catch (error) {
    console.error(`Error fetching structured data for ${type}:`, error);
  }
};

const injectStructuredData = (data: Record<string, unknown>, type?: string) => {
  // Create or update script tag
  const scriptId = `structured-data-${type || "custom"}`;
  let script = document.getElementById(scriptId) as HTMLScriptElement;

  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

export default StructuredData;
