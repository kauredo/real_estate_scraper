import { useEffect, useState } from "react";
import { ListingComplex } from "../utils/Interfaces";
import { i18n } from "../../languages/languages";
import { find_listing_complex_by_id } from "../../utils/getters";
import NewShow from "./NewShow";
import Show from "./Show";

export default function ListingComplexShow() {
  const meta_title = i18n.t("buy.header");
  const meta_description = i18n.t("buy.meta_description");

  const [complex, setComplex] = useState<ListingComplex | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = window.location.pathname.split("/")[2];
      const tempComplex = await find_listing_complex_by_id(id);

      return { tempComplex };
    };

    fetchData().then(data => {
      setComplex(data.tempComplex.listing_complex);
    });
  }, []);

  if (!complex) {
    return <div>Loading...</div>;
  }

  if (complex.new_format) {
    return <NewShow complex={complex} />;
  } else {
    return <Show complex={complex} />;
  }
}
