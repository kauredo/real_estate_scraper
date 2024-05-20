import { useEffect, useState } from "react";
import { Listing } from "../utils/Interfaces";
import { truncateText, sanitizeURLWithParams } from "../utils/Functions";
import ListingIcons from "../shared/ListingIcons";
import Overlay from "../shared/Overlay";
import { HashLink } from "react-router-hash-link";
import { deleteListing } from "../../utils/setters";
import { useFlashMessage } from "../../contexts/FlashMessageContext";

interface Props {
  listing: Listing;
  backoffice?: boolean;
  small?: boolean;
  listingsCount?: number;
  setListingsCount?: (count: number) => void;
}

export default function LongCard(props: Props) {
  let { listing, backoffice, small, listingsCount, setListingsCount } = props;
  const [isVisible, setIsVilible] = useState(true);
  const [checked, setChecked] = useState(false);
  const [checkbox, setCheckbox] = useState<HTMLInputElement | null>(null);
  const { setFlashMessage } = useFlashMessage();

  const handleRemoveItem = e => {
    e.preventDefault();

    if (window.confirm("De certeza que queres apagar o imóvel?")) {
      deleteListing(listing.id, setFlashMessage).then(res => {
        setIsVilible(false);
        if (setListingsCount && listingsCount) {
          setListingsCount(listingsCount - 1);
        }
      });
    }
  };

  const clickId = () => {
    if (checkbox) {
      checkbox.click();
      setChecked(checkbox.checked);
    }
  };

  useEffect(() => {
    let box = document.getElementById(
      `listing_complex_listing_ids_${listing.slug}`
    );
    if (box && box instanceof HTMLInputElement) {
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
      <HashLink
        className={small ? "cursor-not-allowed" : ""}
        to={
          small
            ? "#"
            : backoffice
            ? `/backoffice/listings/${listing.slug}/edit`
            : listing.slug
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
              <div
                style={{ zIndex: 1 }}
                className="absolute uppercase top-0 bottom-0 left-0 right-0 bg-green-500 font-bold text-white text-4xl opacity-50 flex items-center justify-center"
              >
                ✓
              </div>
            )}
            <Overlay status={listing.status} />
            <div className="w-full md:w-128 h-full block mx-auto object-cover relative">
              {backoffice && (
                <div className="absolute top-0 left-0 w-10 p-2 bg-black text-white font-bold text-center">
                  {listing.order || "N/A"}
                </div>
              )}
              <img
                loading="lazy"
                alt={listing.title}
                className="w-full md:w-128 h-full block mx-auto object-cover"
                src={listing.photos[0]}
              />
            </div>
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
      </HashLink>
    </div>
  ) : (
    <></>
  );
}
