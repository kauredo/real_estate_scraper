import React, { useEffect, useState } from "react";
import { Colleague, Listing } from "../utils/Interfaces";
import { truncateText } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";

interface Props {
  listing: Listing;
  backoffice?: boolean;
  small?: boolean;
  colleague?: Colleague;
}

export default function LongCard(props: Props) {
  let { listing, backoffice, colleague, small } = props;
  const [isVisible, setIsVilible] = useState(true);
  const handleRemoveItem = e => {
    e.preventDefault();
    confirm("De certeza que queres apagar o imóvel?");

    fetch(window.Routes.backoffice_listing_path(listing.id), {
      method: "DELETE",
    }).then(res => {
      setIsVilible(false);
    });
  };

  return (
    isVisible && (
      <div
        className={
          small
            ? "scale-50 px-4 my-2 drop-shadow-sm hover:drop-shadow-lg relative"
            : "w-full max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg relative"
        }
      >
        <a
          href={
            backoffice
              ? window.Routes.edit_backoffice_listing_path(listing.id)
              : window.Routes.listing_path(listing.id)
          }
        >
          <div className="relative m-0 shadow-lg flex flex-col md:flex-row bg-white ">
            <div className="relative flex-no-shrink w-full md:w-1/3">
              {listing.status === "Reservado" && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-bordeaux text-bold text-white text-4xl opacity-50 flex items-center justify-center">
                  RESERVADO
                </div>
              )}
              {listing.status === "Vendido" && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black text-bold text-white text-4xl opacity-50 flex items-center justify-center">
                  VENDIDO
                </div>
              )}
              <img
                alt=""
                className="w-full md:w-128 h-full block mx-auto object-cover"
                src={listing.photos[0]}
              />
            </div>
            <div className="flex-1 card-block relative w-full md:w-2/3">
              <div className="p-6">
                <h4 className="font-medium text-2xl mb-3">
                  {listing.title}
                  {colleague && (
                    <>
                      <br />
                      <span className="font-bold text-beige">
                        {` (Imóvel de colega: ${colleague.name})`}
                      </span>
                    </>
                  )}
                </h4>
                <p className="leading-normal">
                  <span>
                    {truncateText(listing.description, window.innerWidth / 3)}
                  </span>
                </p>
                <ListingIcons listing={listing} />
                {backoffice && (
                  <span
                    className="inline-block px-5 py-2 my-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                    onClick={handleRemoveItem}
                  >
                    Apagar Imóvel 🗑️
                  </span>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  );
}
