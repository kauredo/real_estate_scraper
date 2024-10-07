import React, { useEffect, useState } from "react";
import { numberToCurrency, sanitizeURL } from "../utils/Functions";
import { i18n } from "../../languages/languages";
import Slider from "rc-slider";
import AdvancedSearch from "./AdvancedSearch";
import { StatsFilter } from "../utils/Interfaces";
import ObjectiveTabs from "./ObjectiveTabs";

interface Props {
  params: {
    title_cont?: string;
    address_cont?: string;
    price_cents_gteq?: number;
    price_cents_lteq?: number;
    status_eq?: string;
    kind_eq?: number;
    objective_eq?: number;
  };
  listingMaxPrice: number;
  statsKeys: string[];
  kinds: { kind: string; index: number }[];
  objectives: { objective: string; index: number }[];
}

export default function PriceSlider(props: Props) {
  const { params, listingMaxPrice, statsKeys, kinds, objectives } = props;
  const [title, setTitle] = useState(params?.title_cont || "");
  const [address, setAddress] = useState(params?.address_cont || "");
  const [status, setStatus] = useState(params?.status_eq || "");
  const [kind, setKind] = useState(params?.kind_eq || 0);
  const [objective, setObjective] = useState(params?.objective_eq || 1);
  const [statsFilters, setStatsFilters] = useState<Partial<StatsFilter>>(
    // only keep params that are in statsKeys
    Object.fromEntries(
      Object.entries(params || {}).filter(([key]) =>
        statsKeys.includes(key.replace("_eq", ""))
      )
    )
  );
  const transformedMaxPrice = listingMaxPrice / 100;
  const [prices, setPrices] = useState([
    (params?.price_cents_gteq ?? 0) / 100,
    (params?.price_cents_lteq ?? transformedMaxPrice * 100) / 100,
  ]);

  const advancedStatsKeys = statsKeys.filter(
    key => !["Quartos", "Casas de Banho"].includes(key)
  );
  const otherStatsKeys = statsKeys.filter(key =>
    ["Quartos", "Casas de Banho"].includes(key)
  );

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrices(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add price parameters to the form data
    formData.append("q[price_cents_gteq]", (prices[0] * 100).toString());
    formData.append("q[price_cents_lteq]", (prices[1] * 100).toString());
    formData.append("q[objective_eq]", objective.toString());

    // Convert FormData to object
    const formDataObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        formDataObject[key] = value;
      }
    });

    // Submit form
    const action = e.currentTarget.action;
    window.location.href = `${action}?${new URLSearchParams(formDataObject)}`;
    // console.log(formDataObject);
  };

  const handleStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const modifiedName = name.replace("q[", "").replace("]", "");
    setStatsFilters(prev => ({ ...prev, [modifiedName]: value }));
  };

  useEffect(() => {
    const oldObjective = params?.objective_eq;
    // Submit the form when the objective changes
    if (!oldObjective && objective === 1) {
      return;
    }

    const form = document.querySelector("form");
    if (form && oldObjective !== objective) {
      form.requestSubmit();
    }
  }, [objective]);

  return (
    <div className="container mx-auto sm:px-6 px-4">
      <h2 className="text-xl mb-4 mt-8 md:mt-2">
        {i18n.t("listing.search.title")}
      </h2>
      <form
        action={sanitizeURL(window.Routes.buy_path)}
        onSubmit={handleSubmit}
      >
        <ObjectiveTabs
          objective={objective}
          objectives={objectives}
          setObjective={setObjective}
        />

        <div className="w-full flex flex-wrap align-center gap-6 mb-4">
          <div className="w-full md:w-[23%]">
            <label htmlFor="q_kind_eq" className="block mb-1">
              {i18n.t("listing.kind.title")}
            </label>
            <select
              name="q[kind_eq]"
              id="q_kind_eq"
              className="w-full p-2 rounded-md border border-gray-300 bg-[white] h-[42px]"
              value={kind}
              onChange={e => setKind(Number(e.target.value))}
            >
              <option value="">{i18n.t("listing.search.status.all")}</option>
              {Object.entries(kinds).map(([key, value]) => {
                if (typeof key !== "string" || typeof value !== "number") {
                  return null;
                }

                return (
                  <option key={key} value={value}>
                    {i18n.t(`listing.kind.${key}`)}
                  </option>
                );
              })}
            </select>
          </div>
          {otherStatsKeys.map(key => {
            return (
              <div key={key} className="w-full md:w-[calc((23%/2)-0.75rem)]">
                <label
                  htmlFor={`q_${key}`}
                  className="block mb-1 whitespace-nowrap"
                >
                  {i18n.t(`listing.stats.${key.toLowerCase()}`)}
                </label>
                <select
                  id={`q_${key}`}
                  name={`q[${key}_eq]`}
                  value={statsFilters?.[`${key}_eq`] || ""}
                  onChange={handleStatChange}
                  className="w-full p-2 rounded-md border border-gray-300 bg-[white] h-[42px]"
                >
                  <option value="">{i18n.t("listing.search.any")}</option>
                  {[...Array(11).keys()].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
          <div className="w-full md:w-[23%]">
            <label htmlFor="q_status_eq" className="block mb-1">
              {i18n.t("listing.search.status.title")}
            </label>
            <select
              name="q[status_eq]"
              id="q_status_eq"
              className="w-full p-2 rounded-md border border-gray-300 bg-[white] h-[42px]"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">{i18n.t("listing.search.status.all")}</option>
              <option value="0">
                {i18n.t("listing.search.status.recent")}
              </option>
              <option value="2">
                {i18n.t("listing.search.status.agreed")}
              </option>
              <option value="3">{i18n.t("listing.search.status.sold")}</option>
              <option value="4">
                {i18n.t("listing.search.status.rented")}
              </option>
              <option value="5">
                {i18n.t("listing.search.status.closed")}
              </option>
            </select>
          </div>
          <div className="w-full md:w-[23%]">
            <label htmlFor="q_price_cents_lteq" className="block mb-1">
              {i18n.t("listing.search.price")}
            </label>
            <div className="price-slider-container">
              <Slider
                range
                min={0}
                max={transformedMaxPrice}
                defaultValue={[prices[0], prices[1]]}
                onChange={handlePriceChange}
                allowCross={false}
                step={1000}
              />
              <div className="flex justify-between mt-2">
                <span>{numberToCurrency(prices[0])}</span>
                <span>{numberToCurrency(prices[1])}</span>
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
        <div className="flex items-center flex-wrap">
          <button
            type="submit"
            className="bg-beige text-white font-bold py-2 px-4 rounded w-full md:w-[23%]"
          >
            {i18n.t("listing.search.submit")}
          </button>
          <a
            href={sanitizeURL(window.Routes.buy_path)}
            className="text-beige font-bold underline sm:ml-2 mt-2 sm:mt-0 w-full md:w-[23%]"
          >
            {i18n.t("listing.reset_filters")}
          </a>
        </div>
      </form>
    </div>
  );
}
