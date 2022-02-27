import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";

export default function Card({ listing }) {
  return (
    <div className="card max-w-sm min-h-max flex-shrink-0 relative w-full h-full shadow-md sm:w-auto">
      {/* <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"> */}
      <img
        className="object-cover object-center w-full h-56"
        src={listing.photos[0]}
        alt={listing.title}
      />

      <div className="px-6 py-4 min-h-[10rem]">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-ellipsis">
          {listing.title}
        </h1>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <FontAwesomeIcon icon={faEuroSign} />

          <h1 className="px-2 text-sm">{listing.price}</h1>
        </div>
      </div>
    </div>
  );
}
