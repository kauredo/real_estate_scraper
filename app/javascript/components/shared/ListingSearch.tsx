import React, { useState } from "react";
import { numberToCurrency, sanitizeURL } from "../utils/Functions";
import { i18n } from "../../languages/languages";

interface Props {
  params: {
    price_gteq?: string;
    address_cont?: string;
    price_lteq?: number;
    title_cont?: number;
  };
  listingMaxPrice?: number;
}

export default function PriceSlider(props: Props) {
  const { params, listingMaxPrice } = props;

  const [title, setTitle] = useState(params?.title_cont || "");
  const [address, setAddress] = useState(params?.address_cont || "");
  const [minPrice, setMinPrice] = useState(params?.price_gteq || 0);
  const [maxPrice, setMaxPrice] = useState(
    params?.price_lteq || listingMaxPrice || 10000000
  );

  console.log("listingMaxPrice", listingMaxPrice);
  console.log("maxPrice", maxPrice);
  console.log("minPrice", minPrice);
  console.log("title", title);
  console.log("address", address);

  return (
    <div className="container mx-auto flex items-center justify-center lg:px-0 sm:px-6 px-4">
      <form
        action={sanitizeURL(window.Routes.buy_path)}
        className="w-full flex flex-wrap justify-between align-center gap-0"
      >
        <div className="mb-4 w-full md:w-[calc(33%-0.5rem)]">
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
        <div className="mb-4 w-full md:w-[calc(33%-0.5rem)]">
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
        <div className="mb-4 w-full md:w-[calc(33%-0.5rem)]">
          <label htmlFor="q_price_lteq" className="block mb-1">
            {i18n.t("listing.search.price")}
          </label>
          <div className="price-slider-container">
            <input
              type="range"
              id="q_price_gteq"
              name="q[price_gteq]"
              min="0"
              max={listingMaxPrice}
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              id="q_price_lteq"
              name="q[price_lteq]"
              min="0"
              max={listingMaxPrice}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>0€</span>
              <span>{numberToCurrency(props.listingMaxPrice)}</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-beige text-white font-bold py-2 px-4 rounded w-full md:w-[calc(33%-0.5rem)]"
        >
          {i18n.t("listing.search.submit")}
        </button>
      </form>
    </div>
  );
}
