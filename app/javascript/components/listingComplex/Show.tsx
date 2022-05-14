import React, { useEffect } from "react";
import { Listing, ListingComplex } from "../utils/Interfaces";

interface Props {
  complex: ListingComplex;
  listings: Listing[];
}

export default function Show(props: Props) {
  const { complex, listings } = props;

  const header = () => {
    if (complex.video_link) {
      return (
        <iframe
          id="iframe"
          style={{ height: "70vh", aspectRatio: "16/9" }}
          className="w-full mx-auto"
          src={`${complex.video_link}?autoplay=1&mute=1`}
          allow="autoplay"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <img
          style={{ maxHeight: "70vh", objectFit: "contain" }}
          src={listings[0].photos[1]}
        />
      );
    }
  };

  return (
    <div className="relative container mx-auto">
      <div className="mx-auto w-fit">{header()}</div>
      <div className="bottom-4 left-4 bold text-large z-50 bg-bordeaux text-white px-4 py-2">
        {complex.name}
      </div>
      <section className="flex justify-between py-8 mx-2 whitespace-pre-line flex-wrap">
        <div className="p-4 description w-full tablet:w-[calc(50%-1rem)] drop-shadow-lg bg-white m-2 tablet:mx-0">
          <div className="tablet:mr-2">{complex.description}</div>
        </div>
        <div className="p-4 description w-full tablet:w-[calc(50%-1rem)] drop-shadow-lg bg-white m-2 tablet:mx-0 h-fit">
          <ul
            className="tablet:ml-2 grid gap-4"
            style={{
              gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
            }}
          >
            {listings.map(listing => {
              return <li className="mx-8 list-disc">{listing.title}</li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
