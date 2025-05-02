import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listing } from "../../utils/interfaces";
import { truncateText } from "../../utils/functions";
import ListingIcons from "../shared/ListingIcons";
import Overlay from "../shared/Overlay";
import Routes from "../../utils/routes";
import { adminDeleteListing, adminRecoverListing } from "../../services/api";

interface Props {
  listing: Listing;
  backoffice?: boolean;
  small?: boolean;
}

export default function LongCard(props: Props) {
  let { listing, backoffice, small } = props;
  const [checked, setChecked] = useState(false);
  const [checkbox, setCheckbox] = useState<HTMLElement | null>(null);
  const listingRef = useRef<HTMLDivElement>(null);

  const handleRemoveItem = async (e: React.MouseEvent) => {
    e.preventDefault();

    const confirmDelete = confirm("De certeza que queres apagar o imóvel?");
    if (!confirmDelete) return;

    try {
      await adminDeleteListing(slugOrId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleRecoverItem = async (e: React.MouseEvent) => {
    e.preventDefault();

    const confirmRecover = confirm("De certeza que queres restaurar o imóvel?");
    if (!confirmRecover) return;

    try {
      await adminRecoverListing(listing.id);
      window.location.reload();
    } catch (error) {
      console.error("Error recovering listing:", error);
    }
  };

  const clickId = () => {
    if (checkbox) {
      checkbox.click();
      setChecked((checkbox as HTMLInputElement).checked);
    }
  };
  const [listingRefWidth, setListingRefWidth] = useState(
    listingRef.current?.offsetWidth
  );

  const photo = listing.photos ? listing.photos[0] : "";

  const slugOrId = listing.slug || listing.id;

  const handleResize = () => {
    if (listingRef.current) {
      setListingRefWidth(listingRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    let box = document.getElementById(
      `listing_complex_listing_ids_${listing.id}`
    );

    if (box) {
      setCheckbox(box);
      setChecked((box as HTMLInputElement).checked);
    }
  }, []);

  useEffect(() => {
    handleResize();
  }, [listingRef.current]);

  if (!listing || !listing.title) return null;

  return (
    <div
      className={
        small
          ? "max-w-7xl px-4 my-2 drop-shadow-sm hover:drop-shadow-lg relative"
          : "w-full lg:w-1/2 max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg relative"
      }
      onClick={() => clickId()}
      ref={listingRef}
    >
      <a
        className={small ? "cursor-not-allowed" : ""}
        href={
          small
            ? "#"
            : backoffice
            ? Routes.edit_backoffice_listing_path(slugOrId)
            : Routes.listing_path(slugOrId)
        }
        onClick={e => small && e.preventDefault()}
      >
        <div
          className={
            small
              ? "h-48 relative m-0 shadow-lg flex flex-row bg-white dark:bg-dark dark:border-beige-medium dark:border-2"
              : "md:h-80 relative m-0 shadow-lg flex flex-col sm:flex-row bg-white dark:bg-dark dark:border-beige-medium dark:border-2"
          }
        >
          <div
            className={
              small
                ? "relative flex-no-shrink w-1/2 md:w-1/3"
                : "relative flex-no-shrink w-full sm:w-1/3"
            }
          >
            {checked && (
              <div className="absolute z-20 uppercase top-0 bottom-0 left-0 right-0 bg-green-500 font-bold text-white dark:text-dark text-4xl opacity-50 flex items-center justify-center">
                ✓
              </div>
            )}
            <Overlay status={listing.status} show />
            <div className="w-full md:w-128 h-full block mx-auto relative">
              {backoffice && (
                <div className="absolute top-0 left-0 w-20 p-2 bg-black text-white dark:text-light font-bold text-center z-10">
                  {listing.order || "N/A"}
                </div>
              )}
              <img
                loading="lazy"
                alt={listing.title}
                className="w-full md:w-128 h-56 max-h-full md:h-full block mx-auto object-cover"
                src={photo}
              />
            </div>
          </div>
          <div className="flex-1 card-block relative w-full md:w-2/3 p-6 flex flex-col">
            <h4
              className={
                small ? "text-sm md:text-2xl mb-3" : "font-medium text-2xl mb-3"
              }
            >
              {listing.title}
            </h4>
            {!small && (
              <>
                <p className="leading-normal">
                  <span>
                    {truncateText(
                      listing.description,
                      (listingRefWidth ?? window.innerWidth) / 4
                    )}
                  </span>
                </p>
                <ListingIcons listing={listing} />
              </>
            )}
            {backoffice && !listing.deleted_at && (
              <span
                className="inline-block px-5 py-2 my-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                onClick={handleRemoveItem}
              >
                Apagar Imóvel <FontAwesomeIcon icon="trash-alt" />
              </span>
            )}
            {backoffice && listing.deleted_at && (
              <span
                className="inline-block px-5 py-2 my-2 text-red-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                onClick={handleRecoverItem}
              >
                Restaurar Imóvel 🔄
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
