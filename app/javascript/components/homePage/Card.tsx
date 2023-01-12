import React, { useState } from "react";
import { sanitizeURLWithParams, truncateText } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";
import { i18n } from "../../languages/languages";

export default function Card({ listing }) {
  return (
    <div
      style={{ marginTop: "-2rem" }}
      className="card mx-auto max-w-sm flex-shrink-0 relative w-full h-full shadow-md sm:w-auto"
    >
      <a href={sanitizeURLWithParams(window.Routes.listing_path, listing.id)}>
        <div
          className="object-cover bg-center bg-no-repeat bg-cover object-center w-full h-2/3 relative"
          style={{
            backgroundImage: `url(${listing.photos[0]})`,
          }}
        >
          {["Reservado", "Sales Agreed"].includes(listing.status) && (
            <div className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-beige font-bold text-white text-4xl opacity-50 flex items-center justify-center pt-12">
              {i18n.t("listing.status.agreed")}
            </div>
          )}
          {["Vendido", "Sold"].includes(listing.status) && (
            <div className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-black font-bold text-white text-4xl opacity-50 flex items-center justify-center pt-12">
              {i18n.t("listing.status.sold")}
            </div>
          )}
        </div>
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
