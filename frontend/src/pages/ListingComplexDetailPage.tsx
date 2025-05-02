import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getListingComplex } from "../services/api";
import { ListingComplex } from "../utils/interfaces";
import Show from "../components/listingComplex/Show";
import NewShow from "../components/listingComplex/NewShow";

const ListingComplexDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [listingComplex, setListingComplex] = useState<ListingComplex | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingComplex = async () => {
      try {
        setLoading(true);
        const response = await getListingComplex(slug);
        setListingComplex(response.data.listing_complex);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!listingComplex) {
    return null;
  }

  return listingComplex.new_format ? (
    <NewShow complex={listingComplex} />
  ) : (
    <Show complex={listingComplex} />
  );
};

export default ListingComplexDetailPage;
