import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ListingByCity, ResultNumbers } from "../utils/Interfaces";
import Banner from "../shared/Banner";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Profile from "./Profile";
import Results from "./Results";

interface Props {
  listings: ListingByCity;
  results: ResultNumbers;
}

export default function Home(props: Props) {
  const { listings, results } = props;
  const [cardsOffset, setCardsOffset] = useState("-219px");
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      const card = document.querySelector(".card .bg-white");

      // setCardsOffset(`${((card.scrollHeight - 32) / 2) * -1 + 4}px`);
      setCardsOffset(`${(card.scrollHeight + 64 + 8) * -1 }px`);
    }, 1000);
  }, []);

  return (
    <>
      <Banner />
      <Profile />
      <div ref={cardsRef}>
        <Cards listings={listings} />
      </div>
      <div className="relative">
        <div
          id="background-change"
          className="absolute top-0 bottom-0 left-0 right-0 bg-beige z-[-10]"
          style={{
            top: cardsOffset,
          }}
        ></div>
        <Results results={results} />
        <Newsletter />
      </div>
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
