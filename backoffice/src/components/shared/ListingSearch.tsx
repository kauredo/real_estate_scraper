import React, { useEffect, useState } from "react";
import { numberToCurrency } from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import AdvancedSearch from "./AdvancedSearch";
import { StatsFilter } from "../../utils/interfaces";
import ObjectiveTabs from "./ObjectiveTabs";
import Routes from "../../utils/routes";

interface Props {
  params: Record<string, any>;
  listingMaxPrice: number;
  statsKeys: string[];
  kinds: { kind: string; index: number }[];
  objectives: { objective: string; index: number }[];
  onSearch?: (params: Record<string, string>) => void;
}

export default function ListingSearch(props: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    params = {},
    listingMaxPrice = 0,
    statsKeys = [],
    kinds = [],
    objectives = [],
    onSearch,
  } = props;

  // Parse URL parameters with proper fallbacks
  const [title, setTitle] = useState(params?.title_cont || "");
  const [status, setStatus] = useState(params?.status_eq || "");
  const [kind, setKind] = useState(Number(params?.kind_eq) || 0);
  const [objective, setObjective] = useState(Number(params?.objective_eq) || 1);
  const [statsFilters, setStatsFilters] = useState<Partial<StatsFilter>>(
    Object.fromEntries(
      Object.entries(params || {}).filter(([key]) =>
        statsKeys.includes(key.replace("_eq", "")),
      ),
    ),
  );

  const transformedMaxPrice = (listingMaxPrice || 0) / 100;
  const [prices, setPrices] = useState(() => {
    const minPrice = Number(params?.price_cents_gteq || 0) / 100;
    const maxPrice = params?.price_cents_lteq
      ? Number(params.price_cents_lteq) / 100
      : transformedMaxPrice || 0;
    return [minPrice, maxPrice];
  });

  // Separate the most important stats from advanced ones
  const basicStatsKeys = statsKeys.filter((key) =>
    ["Quartos", "Casas de Banho"].includes(key),
  );
  const advancedStatsKeys = statsKeys.filter(
    (key) => !["Quartos", "Casas de Banho"].includes(key),
  );

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrices(value);
    }
  };

  const buildSearchParams = (): Record<string, string> => {
    const searchParams: Record<string, string> = {};

    // Add basic filters
    if (title.trim()) {
      searchParams["q[title_cont]"] = title.trim();
    }

    if (status) {
      searchParams["q[status_eq]"] = status;
    }

    if (kind && kind !== 0) {
      searchParams["q[kind_eq]"] = kind.toString();
    }

    // Always include objective (default to sale = 1)
    searchParams["q[objective_eq]"] = objective.toString();

    // Add price filters
    if (prices[0] > 0) {
      searchParams["q[price_cents_gteq]"] = (prices[0] * 100).toString();
    }
    if (prices[1] < transformedMaxPrice && transformedMaxPrice > 0) {
      searchParams["q[price_cents_lteq]"] = (prices[1] * 100).toString();
    }

    // Add stats filters
    Object.entries(statsFilters).forEach(([key, value]) => {
      if (value && value !== "") {
        // Convert from our internal format to Rails format
        const statKey = key.replace("_eq", "");
        searchParams[`q[${statKey}_eq]`] = value.toString();
      }
    });

    return searchParams;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = buildSearchParams();
    const urlSearchParams = new URLSearchParams(searchParams);

    if (onSearch) {
      onSearch(searchParams);
    }

    navigate({
      pathname: Routes.buy_path,
      search: `?${urlSearchParams.toString()}`,
    });
  };

  const handleStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    // Extract the stat name from the form field name (q[StatName_eq] -> StatName_eq)
    const statName = name.replace("q[", "").replace("]", "");
    setStatsFilters((prev) => ({
      ...prev,
      [statName]: value || undefined,
    }));
  };

  const handleReset = () => {
    setTitle("");
    setStatus("");
    setKind(0);
    setObjective(1);
    setStatsFilters({});
    setPrices([0, transformedMaxPrice || 0]);

    if (onSearch) {
      onSearch({});
    }

    navigate(Routes.buy_path);
  };

  useEffect(() => {
    const oldObjective = params?.objective_eq;
    if (!oldObjective && objective === 1) {
      return;
    }

    const form = document.querySelector("form");
    if (form && oldObjective !== objective) {
      form.requestSubmit();
    }
  }, [objective, params?.objective_eq]);

  // Update prices when max price becomes available on initial load
  useEffect(() => {
    // Only run this when transformedMaxPrice becomes available for the first time
    // and we don't have specific price parameters from URL
    if (transformedMaxPrice > 0 && !params?.price_cents_lteq) {
      setPrices((prevPrices) => {
        // Only update if the current max price is 0 (initial state)
        if (prevPrices[1] === 0) {
          const minPrice = Number(params?.price_cents_gteq || 0) / 100;
          return [minPrice, transformedMaxPrice];
        }
        return prevPrices;
      });
    }
  }, [transformedMaxPrice]);

  return (
    <div className="container mx-auto sm:px-6 px-4">
      <div className="flex justify-between items-center mb-4 mt-8 md:mt-2">
        <h2 className="text-xl">{t("listing.search.title")}</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-primary-600 dark:text-beige-medium font-bold underline"
        >
          {t("listing.reset_filters")}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <ObjectiveTabs
          objective={objective}
          objectives={objectives || []}
          setObjective={setObjective}
        />

        <div className="w-full flex flex-wrap align-center gap-6 mb-4">
          {/* Property Type */}
          <div className="w-full md:w-[23%]">
            <label htmlFor="q_kind_eq" className="block mb-1 font-medium">
              {t("listing.kind.title")}
            </label>
            <select
              name="q[kind_eq]"
              id="q_kind_eq"
              className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black h-[42px] focus:ring-2 focus:ring-beige-default focus:border-transparent"
              value={kind}
              onChange={(e) => setKind(Number(e.target.value))}
            >
              <option value="0">{t("listing.search.status.all")}</option>
              {Array.isArray(kinds) &&
                kinds.map(({ kind: kindName, index }) => (
                  <option key={kindName} value={index}>
                    {t(`listing.kind.${kindName}`)}
                  </option>
                ))}
            </select>
          </div>

          {/* Basic Stats (Rooms, Bathrooms) */}
          {basicStatsKeys.map((key: string) => (
            <div key={key} className="w-full md:w-[calc((23%/2)-0.75rem)]">
              <label
                htmlFor={`q_${key}`}
                className="block mb-1 whitespace-nowrap font-medium"
              >
                {t(`listing.stats.${key.toLowerCase()}`)}
              </label>
              <select
                id={`q_${key}`}
                name={`q[${key}_eq]`}
                value={statsFilters?.[`${key}_eq`] || ""}
                onChange={handleStatChange}
                className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black h-[42px] focus:ring-2 focus:ring-beige-default focus:border-transparent"
              >
                <option value="">{t("listing.search.any")}</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Status */}
          <div className="w-full md:w-[23%]">
            <label htmlFor="q_status_eq" className="block mb-1 font-medium">
              {t("listing.search.status.title")}
            </label>
            <select
              name="q[status_eq]"
              id="q_status_eq"
              className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black h-[42px] focus:ring-2 focus:ring-beige-default focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">{t("listing.search.status.all")}</option>
              <option value="0">{t("listing.search.status.recent")}</option>
              <option value="2">{t("listing.search.status.agreed")}</option>
              <option value="3">{t("listing.search.status.sold")}</option>
              <option value="4">{t("listing.search.status.rented")}</option>
              <option value="5">{t("listing.search.status.closed")}</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="w-full md:w-[23%]">
            <label
              htmlFor="q_price_cents_lteq"
              className="block mb-1 font-medium"
            >
              {t("listing.search.price")}
            </label>
            <div className="price-slider-container">
              <Slider
                range
                min={0}
                max={transformedMaxPrice}
                value={[prices[0], prices[1]]}
                onChange={handlePriceChange}
                allowCross={false}
                step={1000}
                className="mb-2"
              />
              <div className="flex justify-between mt-2 text-sm">
                <span className="font-medium">
                  {numberToCurrency(prices[0])}
                </span>
                <span className="font-medium">
                  {numberToCurrency(prices[1])}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AdvancedSearch
          listingMaxPrice={listingMaxPrice}
          statsKeys={advancedStatsKeys}
          statsFilters={statsFilters}
          setStatsFilters={setStatsFilters}
          handleStatChange={handleStatChange}
          title={title}
          setTitle={setTitle}
        />

        <div className="flex items-center flex-wrap gap-4">
          <button
            type="submit"
            className="bg-primary-600 dark:bg-primary-500 text-white dark:text-dark font-bold py-2 px-6 rounded w-full md:w-auto hover:bg-beige-dark transition-colors"
          >
            {t("listing.search.submit")}
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            {Object.keys(buildSearchParams()).length > 1 && (
              <span>
                {Object.keys(buildSearchParams()).length - 1}{" "}
                {/* Subtract 1 for objective which is always present */}
                {t("listing.search.filters_applied", {
                  defaultValue: "filters applied",
                })}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
