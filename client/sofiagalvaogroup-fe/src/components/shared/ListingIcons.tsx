import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";

export default function ListingIcons({ listing }) {
  const getStatValue = (
    stats: Record<string, any>,
    key: string
  ): string | undefined => {
    const lowerKey = key.toLowerCase();
    return Object.keys(stats).find(k => k.toLowerCase() === lowerKey);
  };

  const quartosKey = getStatValue(listing.stats, "Quartos");
  const casasDeBanhoKey = getStatValue(listing.stats, "Casas de Banho");

  return (
    <>
      <div className="flex justify-between items-center mt-4 text-gray-700">
        <div className="flex items-center">
          {listing.stats && (
            <>
              {quartosKey !== undefined && (
                <>
                  <FontAwesomeIcon icon={faBed} />
                  <p className="px-2 text-sm pr-4">
                    {listing.stats[quartosKey]}
                  </p>
                </>
              )}
              {casasDeBanhoKey !== undefined && (
                <>
                  <FontAwesomeIcon icon={faBath} />
                  <p className="px-2 text-sm">
                    {listing.stats[casasDeBanhoKey]}
                  </p>
                </>
              )}
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
