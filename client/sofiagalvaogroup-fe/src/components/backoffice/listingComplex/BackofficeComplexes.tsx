import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { find_all_backoffice_listing_complexes } from "../../../utils/getters";
import { ListingComplex } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import Complexes from "../../listingComplex/Complexes";

const BackofficeComplexes = () => {
  // Assuming you have a way to fetch or manage the listings data here
  const [complexes, setComplexes] = useState<ListingComplex[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tempComplexes = await find_all_backoffice_listing_complexes();

      return { tempComplexes };
    };

    fetchData().then(data => {
      setComplexes(data.tempComplexes);
    });
  }, []);

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <div className="mt-6">
          <HashLink
            to="new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Novo Empreendimento
          </HashLink>
        </div>
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          {i18n.t("enterprises.header")}
        </h2>
        <p className="text-center text-gray-600 max-w-none">
          Total {complexes.length} {i18n.t("enterprises.header").toLowerCase()}
        </p>
        <Complexes listing_complexes={complexes} backoffice />
      </div>
    </div>
  );
};

export default BackofficeComplexes;
