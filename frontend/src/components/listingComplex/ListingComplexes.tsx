import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ListingComplex } from "../../utils/interfaces";

interface Props {
  listingComplexes: ListingComplex[];
}

const ListingComplexes = ({ listingComplexes }: Props) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  if (listingComplexes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t("listing_complex.no_results")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listingComplexes.map((complex) => (
          <Link
            key={complex.id}
            to={`${isEnglish ? "/en" : ""}/empreendimentos/${complex.slug}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
              <div className="relative pb-[56.25%]">
                <img
                  src={complex.thumbnail_url}
                  alt={complex.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {complex.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {complex.location}
                </p>
                <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
                  {complex.description}
                </p>
                {complex.price_from > 0 && (
                  <p className="mt-4 text-lg font-semibold text-primary">
                    {t("listing_complex.price_from", {
                      price: complex.price_from.toLocaleString(
                        i18n.language === "en" ? "en-US" : "pt-PT",
                        {
                          style: "currency",
                          currency: "EUR",
                        },
                      ),
                    })}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListingComplexes;
