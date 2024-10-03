import React, { useState } from "react";
import { numberToCurrency, sanitizeURL } from "../utils/Functions";
import { i18n } from "../../languages/languages";
import Slider from "rc-slider";

interface Props {
  params: {
    title_cont?: string;
    address_cont?: string;
    price_gteq?: number;
    price_lteq?: number;
    status_eq?: string;
  };
  listingMaxPrice: number;
}

export default function PriceSlider(props: Props) {
  const { params, listingMaxPrice } = props;

  const [title, setTitle] = useState(params?.title_cont || "");
  const [address, setAddress] = useState(params?.address_cont || "");
  const [status, setStatus] = useState(params?.status_eq || "");
  const [prices, setPrices] = useState([
    params?.price_gteq || 0,
    params?.price_lteq || listingMaxPrice,
  ]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrices(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add price parameters to the form data
    formData.append("q[price_gteq]", prices[0].toString());
    formData.append("q[price_lteq]", prices[1].toString());

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
  };

  return (
    <div className="container mx-auto lg:px-0 sm:px-6 px-4">
      <h2 className="text-xl mb-4">{i18n.t("listing.search.title")}</h2>
      <form
        action={sanitizeURL(window.Routes.buy_path)}
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-wrap justify-between align-center gap-2">
          <div className="mb-4 w-full md:w-[23%]">
            <label htmlFor="q_title_cont" className="block mb-1">
              {i18n.t("listing.search.name")}
            </label>
            <input
              type="text"
              id="q_title_cont"
              name="q[title_cont]"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="mb-4 w-full md:w-[23%]">
            <label htmlFor="q_address_cont" className="block mb-1">
              {i18n.t("listing.search.address")}
            </label>
            <input
              type="text"
              id="q_address_cont"
              name="q[address_cont]"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="mb-4 w-full md:w-[23%]">
            {/* status */}
            <label htmlFor="q_status_eq" className="block mb-1">
              {i18n.t("listing.search.status.title")}
            </label>
            <select
              name="q[status_eq]"
              id="q_status_eq"
              className="w-full p-2 rounded-md border border-gray-300"
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
          <div className="mb-4 w-full md:w-[23%]">
            <label htmlFor="q_price_lteq" className="block mb-1">
              {i18n.t("listing.search.price")}
            </label>
            <div className="price-slider-container">
              <Slider
                range
                min={0}
                max={listingMaxPrice}
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
        <button
          type="submit"
          className="bg-beige text-white font-bold py-2 px-4 rounded w-full md:w-[23%]"
        >
          {i18n.t("listing.search.submit")}
        </button>
      </form>
    </div>
  );
}
