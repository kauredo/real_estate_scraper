import React from "react";
import { Listing } from "../utils/Interfaces";
import LongCard from "./LongCard";
import { i18n } from "../../languages/languages";
import { sanitizeURL } from "../utils/Functions";

interface Props {
  listings: Listing[];
  backoffice: boolean;
}

export default function Listings(props: Props) {
  const { listings, backoffice } = props;

  if (listings.length === 0) {
    return (
      <div id="listings">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center pt-4">
            <p className="text-xl text-gray-500 text-center">
              {i18n.t("listing.no_listings")}
            </p>
            <a
              href={sanitizeURL(window.Routes.buy_path)}
              className="text-beige text-xl font-bold underline ml-2"
            >
              {i18n.t("listing.reset_filters")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto" id="listings">
      {listings?.map(listing => {
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
