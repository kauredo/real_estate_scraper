import React from "react";
import { Listing, ListingComplex } from "../utils/Interfaces";
import { truncateText } from "../utils/Functions";

interface Props {
  listingComplex: ListingComplex;
  listings: Listing[];
  backoffice?: boolean;
}

export default function ComplexCard(props: Props) {
  const { listingComplex, listings, backoffice } = props;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg">
      <a
        href={
          backoffice
            ? window.Routes.edit_backoffice_listing_complex_path(
                listingComplex.id
              )
            : window.Routes.listing_complex_path(listingComplex.id)
        }
      >
        <div className="relative m-0 shadow-lg flex flex-col md:flex-row bg-white">
          <div className="flex-no-shrink w-full md:w-1/3">
            <img
              alt=""
              className="w-full md:w-128 h-full block mx-auto object-cover"
              src={listings.length > 0 ? listings[0].photos[0] : ""}
            />
          </div>
          <div className="flex-1 card-block relative w-full md:w-2/3">
            <div className="p-6">
              <h4 className="font-medium text-2xl mb-3">
                {listingComplex.name}
              </h4>
              <p className="leading-normal">
                <span>
                  {truncateText(
                    listingComplex.description,
                    window.innerWidth / 3
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
