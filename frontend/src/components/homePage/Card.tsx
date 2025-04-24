import React, { useState } from "react";
import { sanitizeURLWithParams, truncateText } from "../../utils/functions";
import ListingIcons from "../shared/ListingIcons";
import Overlay from "../shared/Overlay";
import Routes from "../../utils/routes";

export default function Card({ listing }) {
  return (
    <div className="card m-2 mx-auto max-w-sm flex-shrink-0 relative w-full h-full shadow-md sm:w-auto dark:opacity-80 dark:border-beige-medium dark:border-2">
      <a href={sanitizeURLWithParams(Routes.listing_path, listing.slug)}>
        <div
          className="ajustedBackground object-cover bg-center bg-no-repeat bg-cover object-center w-full h-2/3 min-h-[15rem] relative"
          style={{
            backgroundImage: `url(${listing.photos[0]})`,
            // backgroundImage: "url(/images/banner.webp)",
          }}
        >
          <Overlay status={listing.status} padding={true} show />
        </div>
        <div className="px-6 py-4 h-1/3 justify-between flex flex-col bg-white dark:bg-dark">
          <h2 className="text-l text-dark dark:text-light">
            <span>{truncateText(listing.title, 60)}</span>
          </h2>
          <ListingIcons listing={listing} />
        </div>
      </a>
    </div>
  );
}
