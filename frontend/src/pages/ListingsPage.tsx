import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getListings } from "../services/api";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";
import ListingSearch from "../components/shared/ListingSearch";
import Pagination from "../components/shared/Pagination";
import Listings from "../components/indexPage/Listings";

const ListingsPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });
  const [statsKeys, setStatsKeys] = useState([]);
  const [kinds, setKinds] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);

  useMetaTags({
    title: t("meta.listings.title"),
    description: t("meta.listings.description"),
    url: window.location.href,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        const response = await getListings(params);
        setListings(response.data.listings);
        setPagination(response.data.pagination);
        setStatsKeys(response.data.stats_keys || []);
        setKinds(response.data.kinds || []);
        setObjectives(response.data.objectives || []);
        setMaxPrice(response.data.max_price || 0);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("listing.header")} />

      <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block md:hidden mt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4"
          >
            {t("listing.header")}
          </h1>
        </div>
      </div>

      <ListingSearch
        params={Object.fromEntries(searchParams.entries())}
        listingMaxPrice={maxPrice}
        statsKeys={statsKeys}
        kinds={kinds}
        objectives={objectives}
      />

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Pagination pagination={pagination} />
          <Listings listings={listings} backoffice={false} />
          <Pagination pagination={pagination} />
        </>
      )}
    </>
  );
};

export default ListingsPage;
