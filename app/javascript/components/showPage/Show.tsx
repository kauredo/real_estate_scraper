import Carousel from "nuka-carousel";
import React, { useState } from "react";
import { Listing } from "../homePage/Home";

interface Props {
  listing: Listing;
}

export default function Show(props: Props) {
  const listing = props.listing;
  return (
    <div className="relative container mx-auto">
      <div className="top-4 left-4 bold text-large z-50 bg-bordeaux text-white px-4 py-2">
        {listing.title}
      </div>
      <Carousel
        heightMode="max"
        defaultControlsConfig={{
          nextButtonText: "➤",
          prevButtonStyle: { transform: "rotate(180deg)" },
          prevButtonText: "➤",
          pagingDotsClassName: "mx-1",
        }}
      >
        {listing.photos.map(photo => (
          <img key={photo} src={photo} />
        ))}
      </Carousel>
      <section className="flex py-8 mx-2" style={{ whiteSpace: "pre-line" }}>
        <div className="p-4 description w-1/2 drop-shadow-lg bg-white">
          {listing.description}
        </div>
      </section>
    </div>
  );
}
