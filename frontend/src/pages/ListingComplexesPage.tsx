import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getListingComplexes } from "../services/api";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";
import Pagination from "../components/shared/Pagination";
import ListingComplexes from "../components/listingComplex/ListingComplexes";

const ListingComplexesPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [listingComplexes, setListingComplexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });

  useMetaTags({
    title: t("meta.listing_complexes.title"),
    description: t("meta.listing_complexes.description"),
    url: window.location.href,
  });

  useEffect(() => {
    const fetchListingComplexes = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        const response = await getListingComplexes(params);
        setListingComplexes(response.data.listing_complexes);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching listing complexes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingComplexes();
  }, [searchParams]);

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("listing_complex.header")} />

      <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1 className="relative block md:hidden mt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4">
            {t("listing_complex.header")}
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Pagination pagination={pagination} />
          <ListingComplexes listingComplexes={listingComplexes} />
          <Pagination pagination={pagination} />
        </>
      )}
    </>
  );
};

export default ListingComplexesPage;
