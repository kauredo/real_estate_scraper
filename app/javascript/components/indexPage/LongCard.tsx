import React, { useEffect, useState } from "react";
import { Listing } from "../utils/Interfaces";
import { truncateText, sanitizeURLWithParams } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";
import { i18n } from "../../languages/languages";

interface Props {
  listing: Listing;
  backoffice?: boolean;
  small?: boolean;
}

export default function LongCard(props: Props) {
  let { listing, backoffice, small } = props;
  const [isVisible, setIsVilible] = useState(true);
  const [checked, setChecked] = useState(false);
  const [checkbox, setCheckbox] = useState<HTMLElement | null>(null);
  const handleRemoveItem = e => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]').content;

    confirm("De certeza que queres apagar o imóvel?");

    fetch(
      sanitizeURLWithParams(window.Routes.backoffice_listing_path, listing.id),
      {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      setIsVilible(false);
    });
  };

  const clickId = () => {
    if (checkbox) {
      checkbox.click();
      setChecked(checkbox.checked);
    }
  };

  useEffect(() => {
    let box = document.getElementById(
      `listing_complex_listing_ids_${listing.id}`
    );
    if (box) {
      setCheckbox(box);
      setChecked(box.checked);
    }
  }, []);

  return isVisible ? (
    <div
      className={
        small
          ? "max-w-7xl px-4 my-2 drop-shadow-sm hover:drop-shadow-lg relative"
          : "w-full max-w-7xl mx-auto px-4 my-8 drop-shadow-sm hover:drop-shadow-lg relative"
      }
      onClick={() => clickId()}
    >
      <a
        className={small ? "cursor-not-allowed" : ""}
        href={
          small
            ? "#"
            : backoffice
            ? sanitizeURLWithParams(
                window.Routes.edit_backoffice_listing_path,
                listing.id
              )
            : sanitizeURLWithParams(window.Routes.listing_path, listing.id)
        }
        onClick={e => small && e.preventDefault()}
      >
        <div
          className={
            small
              ? "relative m-0 shadow-lg flex flex-row bg-white "
              : "relative m-0 shadow-lg flex flex-col md:flex-row bg-white "
          }
        >
          <div
            className={
              small
                ? "relative flex-no-shrink w-1/2 md:w-1/3"
                : "relative flex-no-shrink w-full md:w-1/3"
            }
          >
            {checked && (
              <div className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-green-500 font-bold text-white text-4xl opacity-50 flex items-center justify-center">
                ✓
              </div>
            )}
            {listing.status === "agreed" && (
              <div className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-beige font-bold text-white text-4xl opacity-50 flex items-center justify-center">
                {i18n.t("listing.status.agreed")}
              </div>
            )}
            {listing.status === "sold" && (
              <div className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-black font-bold text-white text-4xl opacity-50 flex items-center justify-center">
                {i18n.t("listing.status.sold")}
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
              <h4
                className={
                  small
                    ? "text-sm md:text-2xl mb-3"
                    : "font-medium text-2xl mb-3"
                }
              >
                {listing.title}
              </h4>
              {!small && (
                <>
                  <p className="leading-normal">
                    <span>
                      {truncateText(listing.description, window.innerWidth / 3)}
                    </span>
                  </p>
                  <ListingIcons listing={listing} />
                </>
              )}
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
  ) : (
    <></>
  );
}
