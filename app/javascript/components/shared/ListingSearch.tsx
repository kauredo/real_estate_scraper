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
  };
  listingMaxPrice: number;
}

export default function PriceSlider(props: Props) {
  const { params, listingMaxPrice } = props;

  const [title, setTitle] = useState(params?.title_cont || "");
  const [address, setAddress] = useState(params?.address_cont || "");
  const [prices, setPrices] = useState([
    params?.price_gteq || 0,
    params?.price_lteq || listingMaxPrice,
  ]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrices(value);
    }
  };

  return (
    <div className="container mx-auto lg:px-0 sm:px-6 px-4">
      <h2 className="text-xl mb-4">{i18n.t("listing.search.title")}</h2>
      <form action={sanitizeURL(window.Routes.buy_path)}>
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
            <label htmlFor="q_price_lteq" className="block mb-1">
              {i18n.t("listing.search.price")}
            </label>
            <div className="price-slider-container">
              <Slider
                range
                min={0}
                max={listingMaxPrice}
                defaultValue={[
                  params?.price_gteq || 0,
                  params?.price_lteq || listingMaxPrice,
                ]}
                onChange={handlePriceChange}
                allowCross={false}
                step={100}
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
