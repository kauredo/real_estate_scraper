import { useEffect, useState } from "react";
import { i18n } from "../../languages/languages";
import { find_all_listings } from "../../utils/getters";
import Pagination from "../shared/Pagination";
import Listings from "./Listings";
import { Pagy } from "../utils/Interfaces";

export default function Buy() {
  const meta_title = i18n.t("buy.header");
  const meta_description = i18n.t("buy.meta_description");

  const [listings, setListings] = useState([]);
  const [pagy, setPagy] = useState<Pagy | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const tempListings = await find_all_listings(page);

      return { tempListings };
    };

    fetchData().then(data => {
      setListings(data.tempListings.listings);
      setPagy(data.tempListings.pagy);
    });
  }, [page]);

  return (
    <>
      <div className="pt-6 bg-white text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block md:hidden mt-2 text-3xl text-black sm:text-4xl px-4"
          >
            {meta_title}
          </h1>
        </div>
      </div>
      {pagy && <Pagination pagy={pagy} page={page} setPage={setPage} />}
      <Listings listings={listings} backoffice={false} />
      {pagy && <Pagination pagy={pagy} page={page} setPage={setPage} />}
    </>
  );
}
