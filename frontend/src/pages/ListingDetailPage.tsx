import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../services/api";
import ShowPage from "../components/showPage/Show";
import MetaTags from "../components/shared/MetaTags";
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
        setListing(response.data.listing);
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
      <MetaTags
        pageType="listings"
        listingMeta={{
          title: listing?.title,
          description: listing?.description,
          images: listing?.photos,
        }}
        type="article"
        url={window.location.href}
      />
      <ShowPage listing={listing} />
    </div>
  );
};

export default ListingDetailPage;
