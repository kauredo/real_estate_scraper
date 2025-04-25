// src/pages/ListingDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../services/api";
import ShowPage from "../components/showPage/Show";
import { Listing } from "../utils/interfaces";
import { AxiosError } from "axios";

const ListingDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await getListing(slug);
        setListing(response.data);
      } catch (error) {
        console.error(
          "Error fetching listing:",
          error instanceof AxiosError ? error.message : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchListing();
    }
  }, [slug]);

  // Set meta tags (title, description, image)
  useEffect(() => {
    if (listing) {
      document.title = listing.title;

      // Update meta description
      let metaDescription = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement;
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        "content",
        listing.description?.trim() || ""
      );

      // Update meta image
      let metaImage = document.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement;
      if (!metaImage) {
        metaImage = document.createElement("meta");
        metaImage.setAttribute("property", "og:image");
        document.head.appendChild(metaImage);
      }
      metaImage.setAttribute("content", listing.photos?.[0] || "");
    }
  }, [listing]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl">Listing not found</h1>
      </div>
    );
  }

  return (
    <div id="show" className="relative">
      <ShowPage listing={listing} />
    </div>
  );
};

export default ListingDetailPage;
