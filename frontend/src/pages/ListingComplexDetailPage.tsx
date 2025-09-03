import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingComplex } from "../services/api";
import { ListingComplex } from "../utils/interfaces";
import Show from "../components/listingComplex/Show";
import NewShow from "../components/listingComplex/NewShow";
import { useMetaTags } from "../hooks/useMetaTags";

const ListingComplexDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [listingComplex, setListingComplex] = useState<ListingComplex | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingComplex = async () => {
      try {
        setLoading(true);
        const response = await getListingComplex(slug);
        console.log(response.data);
        setListingComplex(response.data);
      } catch (error) {
        console.error("Error fetching listing complex:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchListingComplex();
    }
  }, [slug]);

  useMetaTags({
    title: listingComplex?.name,
    description: listingComplex?.description?.trim(),
    image: listingComplex?.photos?.[0]?.image?.url,
    type: "article",
    url: window.location.href,
  });

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (!listingComplex) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl">Listing complex not found</h1>
      </div>
    );
  }

  return listingComplex.new_format ? (
    <NewShow complex={listingComplex} />
  ) : (
    <Show complex={listingComplex} />
  );
};

export default ListingComplexDetailPage;
