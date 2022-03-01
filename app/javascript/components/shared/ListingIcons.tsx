import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";

export default function ListingIcons({ listing }) {
  return (
    <>
      <div className="flex items-center mt-4 text-gray-700">
        <FontAwesomeIcon icon={faBed} />

        <h1 className="px-2 text-sm pr-4">{listing.stats.Quartos}</h1>
        <FontAwesomeIcon icon={faBath} />

        <h1 className="px-2 text-sm">{listing.stats["Casas de Banho"]}</h1>
      </div>
      <div className="flex items-center mt-4 text-gray-700">
        <FontAwesomeIcon icon={faEuroSign} />

        <h1 className="px-2 text-sm">{listing.price}</h1>
      </div>
    </>
  );
}
