import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getListings } from "../services/api";
import MetaTags from "../components/shared/MetaTags";
import Banner from "../components/shared/Banner";
import ListingSearch from "../components/shared/ListingSearch";
import Pagination from "../components/shared/Pagination";
import Listings from "../components/indexPage/Listings";
import { Listing } from "../utils/interfaces";

const ListingsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch listings whenever URL params change (single source of truth)
  useEffect(() => {
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    fetchListings(params);
  }, [searchParams]);

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

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
          <Listings listings={listings} backoffice={false} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </>
  );
};

export default ListingsPage;
