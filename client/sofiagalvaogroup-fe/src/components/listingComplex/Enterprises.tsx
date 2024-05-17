import { useEffect, useState } from "react";
import { i18n } from "../../languages/languages";
import Complexes from "./Complexes";
import Banner from "../shared/Banner";
import Pagination from "../shared/Pagination";
import { Pagy } from "../utils/Interfaces";
import { find_all_listing_complexes } from "../../utils/getters";

export default function Enterprises() {
  const meta_title = i18n.t("enterprises.header");
  const meta_description = i18n.t("enterprises.meta_description");

  const [listing_complexes, setListingComplexes] = useState([]);
  const [pagy, setPagy] = useState<Pagy | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const tempListings = await find_all_listing_complexes(page);

      return { tempListings };
    };

    fetchData().then(data => {
      setListingComplexes(data.tempListings.listing_complexes);
      setPagy(data.tempListings.pagy);
    });
  }, [page]);

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>
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
      <Complexes listing_complexes={listing_complexes} backoffice={false} />
      {pagy && <Pagination pagy={pagy} page={page} setPage={setPage} />}
      <section className="container mx-auto py-12 px-8">
        <div className="py-8 md:py-0 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p
                className="mt-2 text-3xl text-black sm:text-4xl decoration-beige"
                dangerouslySetInnerHTML={{
                  __html: i18n.t("enterprises.subheader"),
                }}
              ></p>
            </div>
            <div className="my-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-trophy" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-black w-3/4">
                      {i18n.t("enterprises.list.own.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-gray-800 w-3/4">
                    {i18n.t("enterprises.list.own.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-black w-3/4">
                      {i18n.t("enterprises.list.invest.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-gray-800 w-3/4">
                    {i18n.t("enterprises.list.invest.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-hard-hat" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-black w-3/4">
                      {i18n.t("enterprises.list.warranty.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-gray-800 w-3/4">
                    {i18n.t("enterprises.list.warranty.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-black w-3/4">
                      {i18n.t("enterprises.list.perspective.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-gray-800 w-3/4">
                    {i18n.t("enterprises.list.perspective.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-house-user" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-black w-3/4">
                      {i18n.t("enterprises.list.yours.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-gray-800 w-3/4">
                    {i18n.t("enterprises.list.yours.description")}
                  </p>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
