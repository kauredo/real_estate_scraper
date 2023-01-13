import React from "react";
import Carousel from "nuka-carousel";
import { Listing } from "../utils/Interfaces";
import ContactForm from "../contactPage/ContactForm";
import { i18n } from "../../languages/languages";
import { ReadMore } from "../shared/ReadMore";

interface Props {
  listing: Listing;
}

export default function Show(props: Props) {
  const listing = props.listing;
  console.log(i18n.locale);

  return (
    <div className="relative container mx-auto overflow-hidden sm:overflow-visible">
      <Carousel
        heightMode="max"
        style={{ maxHeight: "90vh" }}
        defaultControlsConfig={{
          containerClassName: "m-h-[90vh]",
          nextButtonText: "➤",
          prevButtonStyle: { transform: "rotate(180deg)" },
          prevButtonText: "➤",
          pagingDotsClassName: "mx-1",
        }}
      >
        {listing.photos.map(photo => (
          <img
            style={{ maxHeight: "70vh", objectFit: "contain" }}
            key={photo}
            src={photo}
          />
        ))}
      </Carousel>
      <div className="pt-6 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block mt-2 text-2xl text-black sm:text-4xl px-4"
          >
            {listing.title}
          </h1>
        </div>
      </div>
      <section className="tablet:grid tablet:grid-cols-3 tablet:grid-rows-1 gap-2 py-8 mx-2 whitespace-pre-line">
        <div className="col-span-2">
          <div className="p-4 w-full bg-white m-2 tablet:mx-0">
            <h2 className="standard mb-2 text-2xl font-bold">
              {i18n.t("listing.details")}
            </h2>
            <div className="w-full flex flex-wrap">
              <div key={"price"} className="border p-2 w-1/2">
                <span className="font-bold">{i18n.t("listing.price")}:</span>
                <br />
                <span>{listing.price}€</span>
              </div>
              {Object.keys(listing.stats).map((k, v) => {
                return (
                  <div key={k} className="border p-2 w-1/2">
                    <span className="font-bold">{k}:</span>
                    <br />
                    <span>{listing.stats[k]}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-4 w-full bg-white m-2 tablet:mx-0">
            <div className="tablet:mr-2">
              <ReadMore length={1000}>{listing.description}</ReadMore>
            </div>
          </div>
          <div className="p-4 w-full bg-white m-2 tablet:mx-0 h-fit">
            <h2 className="standard mb-2 text-2xl font-bold">
              {i18n.t("listing.characteristics")}
            </h2>
            <ul
              className="tablet:ml-2 grid gap-4"
              style={{
                gridTemplateColumns: "repeat( auto-fit, minmax(230px, 1fr) )",
              }}
            >
              {listing.features.map(feat => {
                return (
                  <li key={feat} className="mx-8 list-disc">
                    {feat}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-start-3 p-1">
          <ContactForm listing={listing} />
        </div>
      </section>
    </div>
  );
}
