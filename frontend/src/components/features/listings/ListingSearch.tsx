import React, { useEffect, useState } from "react";
import { numberToCurrency } from "@/utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import AdvancedSearch from "./AdvancedSearch";
import { StatsFilter } from "@/utils/interfaces";
import ObjectiveTabs from "./ObjectiveTabs";
import Routes from "@/utils/routes";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

interface Props {
  params: Record<string, string>;
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
  } = props;

  // Parse URL parameters with proper fallbacks (URL uses Rails format: q[field_eq])
  const [title, setTitle] = useState(params?.["q[title_cont]"] || "");
  const [status, setStatus] = useState(params?.["q[status_eq]"] || "");
  const [kind, setKind] = useState(Number(params?.["q[kind_eq]"]) || 0);
  const [objective, setObjective] = useState(
    Number(params?.["q[objective_eq]"]) || 1,
  );
  const [statsFilters, setStatsFilters] = useState<Partial<StatsFilter>>(() => {
    const filters: Partial<StatsFilter> = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      // Match q[StatName_eq] format
      const match = key.match(/^q\[(.+)_eq\]$/);
      if (match) {
        const statName = match[1];
        if (statsKeys.includes(statName)) {
          filters[`${statName}_eq`] = value;
        }
      }
    });
    return filters;
  });

  const transformedMaxPrice = (listingMaxPrice || 0) / 100;
  const [prices, setPrices] = useState(() => {
    const minPrice = Number(params?.["q[price_cents_gteq]"] || 0) / 100;
    const maxPrice = params?.["q[price_cents_lteq]"]
      ? Number(params["q[price_cents_lteq]"]) / 100
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

    // Navigate to update URL - this will trigger the useEffect in ListingsPage
    // which will fetch the listings (single source of truth)
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

    // Navigate to clear URL params - this will trigger fetch with no filters
    navigate(Routes.buy_path);
  };

  useEffect(() => {
    const urlObjective = params?.["q[objective_eq]"];
    if (!urlObjective && objective === 1) {
      return;
    }

    const form = document.querySelector("form");
    if (form && Number(urlObjective) !== objective) {
      form.requestSubmit();
    }
  }, [objective, params]);

  // Update prices when max price becomes available on initial load
  useEffect(() => {
    // Only run this when transformedMaxPrice becomes available for the first time
    // and we don't have specific price parameters from URL
    if (transformedMaxPrice > 0 && !params?.["q[price_cents_lteq]"]) {
      setPrices((prevPrices) => {
        // Only update if the current max price is 0 (initial state)
        if (prevPrices[1] === 0) {
          const minPrice = Number(params?.["q[price_cents_gteq]"] || 0) / 100;
          return [minPrice, transformedMaxPrice];
        }
        return prevPrices;
      });
    }
  }, [transformedMaxPrice, params]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-medium">
          {t("listing.search.title")}
        </h2>
        <Button type="button" onClick={handleReset} variant="ghost">
          {t("listing.reset_filters")}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <ObjectiveTabs
          objective={objective}
          objectives={objectives || []}
          setObjective={setObjective}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Property Type */}
          <div>
            <label
              htmlFor="q_kind_eq"
              className="block mb-2 font-medium text-sm"
            >
              {t("listing.kind.title")}
            </label>
            <Select
              name="q[kind_eq]"
              id="q_kind_eq"
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
            </Select>
          </div>

          {/* Basic Stats (Rooms, Bathrooms) */}
          {basicStatsKeys.map((key: string) => (
            <div key={key}>
              <label
                htmlFor={`q_${key}`}
                className="block mb-2 font-medium text-sm"
              >
                {t(`listing.stats.${key.toLowerCase()}`)}
              </label>
              <Select
                id={`q_${key}`}
                name={`q[${key}_eq]`}
                value={statsFilters?.[`${key}_eq`] || ""}
                onChange={handleStatChange}
              >
                <option value="">{t("listing.search.any")}</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </div>
          ))}

          {/* Status */}
          <div>
            <label
              htmlFor="q_status_eq"
              className="block mb-2 font-medium text-sm"
            >
              {t("listing.search.status.title")}
            </label>
            <Select
              name="q[status_eq]"
              id="q_status_eq"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">{t("listing.search.status.all")}</option>
              <option value="0">{t("listing.search.status.recent")}</option>
              <option value="2">{t("listing.search.status.agreed")}</option>
              <option value="3">{t("listing.search.status.sold")}</option>
              <option value="4">{t("listing.search.status.rented")}</option>
              <option value="5">{t("listing.search.status.closed")}</option>
            </Select>
          </div>

          {/* Price Range */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="q_price_cents_lteq"
              className="block mb-2 font-medium text-sm"
            >
              {t("listing.search.price")}
            </label>
            <div className="pt-2">
              <Slider
                range
                min={0}
                max={transformedMaxPrice}
                value={[prices[0], prices[1]]}
                onChange={handlePriceChange}
                allowCross={false}
                step={1000}
              />
              <div className="flex justify-between mt-3 text-sm text-gray-600 dark:text-gray-300">
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

        <div className="flex items-center flex-wrap gap-4 mt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t("listing.search.submit")}
          </Button>

          {Object.keys(buildSearchParams()).length > 1 && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span>
                {Object.keys(buildSearchParams()).length - 1}{" "}
                {/* Subtract 1 for objective which is always present */}
                {t("listing.search.filters_applied", {
                  defaultValue: "filters applied",
                })}
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
