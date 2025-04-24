// src/pages/ListingDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../services/api";
import ShowPage from "../components/showPage/Show";

const ListingDetailPage = () => {
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await getListing(slug);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  // Set meta tags (title, description, image)
  useEffect(() => {
    if (listing) {
      document.title = listing.title;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = listing.description?.trim() || "";

      // Update meta image
      let metaImage = document.querySelector('meta[property="og:image"]');
      if (!metaImage) {
        metaImage = document.createElement("meta");
        metaImage.setAttribute("property", "og:image");
        document.head.appendChild(metaImage);
      }
      metaImage.content = listing.photos?.[0] || "";
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
