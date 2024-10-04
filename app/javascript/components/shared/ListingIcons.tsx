import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function ListingIcons({ listing }) {
  return (
    <>
      <div className="flex justify-between items-center mt-4 text-gray-700">
        <div className="flex">
          {listing.stats && listing.stats["Quartos"] && (
            <>
              <FontAwesomeIcon icon={faBed as IconProp} />
              <p className="px-2 text-sm pr-4">{listing.stats["Quartos"]}</p>
            </>
          )}
          {listing.stats && listing.stats["Casas de Banho"] && (
            <>
              <FontAwesomeIcon icon={faBath as IconProp} />
              <p className="px-2 text-sm">{listing.stats["Casas de Banho"]}</p>
            </>
          )}
        </div>
        <div className="flex">
          <FontAwesomeIcon icon={faEuroSign as IconProp} />

          <p className="px-2 text-sm">{listing.price}</p>
        </div>
      </div>
    </>
  );
}
