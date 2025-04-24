import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import { getListings } from "../services/api";
import Banner from "../components/shared/Banner";
import ListingSearch from "../components/shared/ListingSearch";
import Pagination from "../components/shared/Pagination";
import Listings from "../components/indexPage/Listings";

const ListingsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagy, setPagy] = useState({ count: 0, page: 1, items: 12 });
  const [statsKeys, setStatsKeys] = useState([]);
  const [kinds, setKinds] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // Convert searchParams to object
        const params = {};
        for (const [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        const response = await getListings(params);
        setListings(response.data.listings);
        setPagy(response.data.pagy);
        setStatsKeys(response.data.stats_keys || []);
        setKinds(response.data.kinds || []);
        setObjectives(response.data.objectives || []);
        setMaxPrice(response.data.listings_max_price || 0);
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
      <Banner height="20vh" blurred={true} text={t("listings.header")} />

      <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block md:hidden mt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4"
          >
            {t("listings.header")}
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

      <Pagination pagy={pagy} />

      <Listings listings={listings} backoffice={false} />

      <Pagination pagy={pagy} />
    </>
  );
};

export default ListingsPage;
