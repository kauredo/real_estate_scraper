import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getListingComplexes } from "../services/api";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";
import Pagination from "../components/shared/Pagination";
import ListingComplexes from "../components/listingComplex/ListingComplexes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCalendarAlt,
  faHardHat,
  faMoneyBill,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

const ListingComplexesPage = () => {
  const { t } = useTranslation();
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

  const fetchListingComplexes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getListingComplexes({ page });
      setListingComplexes(response.data.listing_complexes);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching listing complexes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingComplexes();
  }, []);

  const handlePageChange = (page: number) => {
    fetchListingComplexes(page);
  };

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("enterprises.header")} />

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
          <ListingComplexes listingComplexes={listingComplexes} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}

      <section className="container mx-auto py-12 px-8">
        <div className="py-8 md:py-0 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p
                className="mt-2 text-3xl text-dark dark:text-light  sm:text-4xl"
                dangerouslySetInnerHTML={{ __html: t("enterprises.subheader") }}
              ></p>
            </div>
            <div className="my-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-dark dark:text-light  w-3/4">
                      {t("enterprises.list.own.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-dark dark:text-light  w-3/4">
                    {t("enterprises.list.own.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-dark dark:text-light  w-3/4">
                      {t("enterprises.list.invest.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-dark dark:text-light  w-3/4">
                    {t("enterprises.list.invest.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faHardHat} />
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-dark dark:text-light  w-3/4">
                      {t("enterprises.list.warranty.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-dark dark:text-light  w-3/4">
                    {t("enterprises.list.warranty.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faMoneyBill} />
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-dark dark:text-light  w-3/4">
                      {t("enterprises.list.perspective.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-dark dark:text-light  w-3/4">
                    {t("enterprises.list.perspective.description")}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faHouseUser} />
                    </div>
                    <p className="ml-4 text-lg font-bold font-medium text-dark dark:text-light  w-3/4">
                      {t("enterprises.list.yours.title")}
                    </p>
                  </dt>
                  <p className="text-lg pt-3 font-medium text-dark dark:text-light  w-3/4">
                    {t("enterprises.list.yours.description")}
                  </p>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingComplexesPage;
