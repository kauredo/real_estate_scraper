import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getListing } from "../services/api";
import ShowPage from "../components/showPage/Show";
import MetaTags from "../components/shared/MetaTags";
import StructuredData from "../components/shared/StructuredData";
import DetailPageSkeleton from "../components/loading/DetailPageSkeleton";
import { Listing } from "../utils/interfaces";
import { AxiosError } from "axios";

const ListingDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const previewToken = searchParams.get("preview_token");
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await getListing(slug, previewToken || undefined);
        setListing(response.data.listing);
      } catch (error) {
        console.error(
          "Error fetching listing:",
          error instanceof AxiosError ? error.message : "Unknown error",
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchListing();
    }
  }, [slug, previewToken]);

  if (loading) {
    return <DetailPageSkeleton />;
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
      <StructuredData type="listing" id={slug} />
      <StructuredData type="breadcrumbs" />
      <ShowPage listing={listing} />
    </div>
  );
};

export default ListingDetailPage;
