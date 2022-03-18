import React from "react";
import { Listing } from "../utils/Interfaces";
import { truncateText } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";

interface Props {
  listing: Listing;
}

export default function LongCard(props: Props) {
  const { listing } = props;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg">
      <a href={window.Routes.listing_path(listing.id)}>
        <div className="relative m-0 shadow-lg flex flex-col md:flex-row bg-white">
          <div className="flex-no-shrink w-full md:w-1/3">
            <img
              alt=""
              className="w-full md:w-128 h-full block mx-auto object-cover"
              src={listing.photos[0]}
            />
          </div>
          <div className="flex-1 card-block relative w-full md:w-2/3">
            <div className="p-6">
              <h4 className="font-medium text-2xl mb-3">{listing.title}</h4>
              <p className="leading-normal">
                <span>
                  {truncateText(listing.description, window.innerWidth / 3)}
                </span>
              </p>
              <ListingIcons listing={listing} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
