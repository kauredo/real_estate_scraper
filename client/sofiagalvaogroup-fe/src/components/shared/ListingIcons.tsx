import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";

export default function ListingIcons({ listing }) {
  return (
    <>
      <div className="flex justify-between items-center mt-4 text-gray-700">
        <div className="flex items-center">
          {listing.stats && listing.stats["Quartos"] && (
            <>
              <FontAwesomeIcon icon={faBed} />
              <p className="px-2 text-sm pr-4">{listing.stats["Quartos"]}</p>
            </>
          )}
          {listing.stats && listing.stats["Casas de Banho"] && (
            <>
              <FontAwesomeIcon icon={faBath} />
              <p className="px-2 text-sm">{listing.stats["Casas de Banho"]}</p>
            </>
          )}
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEuroSign} />

          <p className="px-2 text-sm">{listing.price}</p>
        </div>
      </div>
    </>
  );
}
