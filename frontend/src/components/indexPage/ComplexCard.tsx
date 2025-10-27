import React from "react";
import { ListingComplex } from "../../utils/interfaces";
import { truncateText } from "../../utils/functions";
import Routes from "../../utils/routes";

interface Props {
  listing_complex: ListingComplex;
}

export default function ComplexCard(props: Props) {
  const { listing_complex } = props;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg">
      <a href={Routes.listing_complex_path(listing_complex.slug)}>
        <div className="relative m-0 shadow-lg flex flex-col md:flex-row bg-white dark:bg-dark">
          <div className="flex-no-shrink w-full md:w-1/3">
            <img
              loading="lazy"
              alt={listing_complex.name}
              className="w-full md:w-128 h-full block mx-auto object-cover dark:opacity-80"
              src={
                listing_complex.main_photo_medium ||
                (listing_complex.main_photo
                  ? listing_complex.main_photo.image.url
                  : listing_complex.listings?.length > 0
                    ? listing_complex.listings[0].photos[0]
                    : "")
              }
            />
          </div>
          <div className="flex-1 card-block relative w-full md:w-2/3 text-black dark:text-light">
            <div className="p-6">
              <h4 className="font-medium text-2xl mb-3">
                {listing_complex.name}
              </h4>
              <p className="leading-normal">
                <span>
                  {truncateText(
                    listing_complex.description,
                    window.innerWidth / 3,
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
