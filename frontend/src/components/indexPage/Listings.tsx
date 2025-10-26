import React from "react";
import { Listing } from "../../utils/interfaces";
import LongCard from "./LongCard";
import { useTranslation } from "react-i18next";
import Routes from "../../utils/routes";

interface Props {
  listings: Listing[];
  backoffice: boolean;
}

export default function Listings(props: Props) {
  const { t } = useTranslation();
  const { listings, backoffice } = props;

  if (listings.length === 0) {
    return (
      <div id="listings">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center pt-4">
            <p className="text-xl text-gray-500 dark:text-light text-center">
              {t("listing.no_listings")}
            </p>
            <a
              href={Routes.buy_path}
              className="text-beige-default dark:text-beige-medium text-xl font-bold underline ml-2"
            >
              {t("listing.reset_filters")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-wrap" id="listings">
      {listings?.map((listing) => {
        return (
          <LongCard
            backoffice={backoffice}
            listing={listing}
            key={listing.url}
          />
        );
      })}
    </div>
  );
}
