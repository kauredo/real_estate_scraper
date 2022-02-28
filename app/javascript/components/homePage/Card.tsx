import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";

export default function Card({ listing }) {
  return (
    <div
      style={{ marginTop: "-2rem" }}
      className="card mx-auto max-w-sm flex-shrink-0 relative w-full h-full shadow-md sm:w-auto"
    >
      <a href={window.Routes.listing_path(listing.id)}>
        <div
          className="object-cover bg-center bg-no-repeat bg-cover object-center w-full h-2/3"
          style={{
            backgroundImage: `url(${listing.photos[0]})`,
          }}
        ></div>
        <div className="px-6 py-4 h-1/3 justify-between flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-ellipsis">
            <TruncTitle title={listing.title} />
          </h1>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <FontAwesomeIcon icon={faBed} />

            <h1 className="px-2 text-sm pr-4">{listing.stats.Quartos}</h1>
            <FontAwesomeIcon icon={faBath} />

            <h1 className="px-2 text-sm">{listing.stats["Casas de Banho"]}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <FontAwesomeIcon icon={faEuroSign} />

            <h1 className="px-2 text-sm">{listing.price}</h1>
          </div>
        </div>
      </a>
    </div>
  );
}

function TruncTitle({ title }) {
  if (title.length > 90) {
    return <span>{title.substring(0, 90) + "..."}</span>;
  } else {
    return <span>{title}</span>;
  }
}
