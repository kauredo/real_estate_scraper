import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faBed,
  faBath,
  faA,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { gsubMeterSquare } from "../../utils/functions";

export default function ListingIcons({ listing }) {
  return (
    <>
      <div className="flex flex-1 justify-between items-end mt-4 text-dark dark:text-beige-default">
        <div className="flex gap-2">
          {listing.stats && listing.stats["Quartos"] && (
            <div className="flex">
              <FontAwesomeIcon icon={faBed as IconProp} />
              <p className="px-2 text-sm pr-4">{listing.stats["Quartos"]}</p>
            </div>
          )}
          {listing.stats && listing.stats["Casas de Banho"] && (
            <div className="flex">
              <FontAwesomeIcon icon={faBath as IconProp} />
              <p className="px-2 text-sm">{listing.stats["Casas de Banho"]}</p>
            </div>
          )}
          {listing.stats && listing.stats["Área útil"] && (
            <div className="flex">
              <FontAwesomeIcon icon={faA as IconProp} />
              <p className="px-2 text-sm">
                {gsubMeterSquare(listing.stats["Área útil"])}
              </p>
            </div>
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
