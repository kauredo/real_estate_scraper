import React, { useState } from "react";
import { truncateText } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";

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
        <div className="px-6 py-4 h-1/3 justify-between flex flex-col bg-white">
          <h3 className="text-l grow  text-gray-800">
            <span>{truncateText(listing.title, 80)}</span>
          </h3>
          <ListingIcons listing={listing} />
        </div>
      </a>
    </div>
  );
}
