import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getListings } from "../services/api";
import MetaTags from "../components/shared/MetaTags";
import Banner from "../components/shared/Banner";
import ListingSearch from "../components/shared/ListingSearch";
import Pagination from "../components/shared/Pagination";
import Listings from "../components/indexPage/Listings";
import ListingSkeleton from "../components/loading/ListingSkeleton";
import TopProgressBar from "../components/loading/TopProgressBar";
import { Listing } from "../utils/interfaces";
import { useNotifications } from "../context/NotificationContext";

const ListingsPage = () => {
  const { t, i18n } = useTranslation();
  const { showError } = useNotifications();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialData, setHasInitialData] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });
  const [statsKeys, setStatsKeys] = useState<string[]>([]);
  const [kinds, setKinds] = useState<Array<{ kind: string; index: number }>>(
    [],
  );
  const [objectives, setObjectives] = useState<
    Array<{ objective: string; index: number }>
  >([]);
  const [maxPrice, setMaxPrice] = useState(0);

  const fetchListings = async (params: Record<string, string>) => {
    try {
      setLoading(true);
      const response = await getListings(params);
      setListings(response.data.listings);
      setPagination(response.data.pagination);
      setStatsKeys(response.data.stats_keys || []);
      setKinds(response.data.kinds || []);
      setObjectives(response.data.objectives || []);
      setMaxPrice(response.data.max_price || 0);
      setHasInitialData(true);

      // Smooth scroll to top after data is loaded (for pagination)
      if (hasInitialData) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      showError(t("errors.fetch_listings"));
    } finally {
      setLoading(false);
    }
  };

  // Fetch listings whenever URL params or locale changes
  useEffect(() => {
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    fetchListings(params);
  }, [searchParams, i18n.language]);

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <MetaTags pageType="listings" url={window.location.href} />
      <Banner height="20vh" blurred={true} text={t("listing.header")} />

      <ListingSearch
        params={Object.fromEntries(searchParams.entries())}
        listingMaxPrice={maxPrice}
        statsKeys={statsKeys}
        kinds={kinds}
        objectives={objectives}
      />

      {/* Show progress bar when paginating (loading with existing data) */}
      {loading && hasInitialData && <TopProgressBar isLoading={loading} />}

      {/* Show skeleton loaders on initial load */}
      {loading && !hasInitialData ? (
        <div className="container mx-auto flex flex-wrap" id="listings">
          {Array.from({ length: 6 }).map((_, index) => (
            <ListingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
          <Listings listings={listings} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </>
  );
};

export default ListingsPage;
