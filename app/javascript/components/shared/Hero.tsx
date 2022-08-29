import React, { useState } from "react";
import QuarterCircle from "./QuarterCircle";

interface Props {
  photos: string[];
}

function Hero(props: Props) {
  const { photos } = props;

  return (
    <section className="max-height">
      <div className="center-hero p-12 md:p-0 gap-4">
        {/* <QuarterCircle photos={photos} /> */}
        <div className="w-full md:w-min h-fit md:h-80 md:px-12 flex flex-col justify-center md:justify-end gap-4 md:gap-10">
          <img
            className="h-auto md:h-1/3 w-1/2"
            src="/logos/main.png"
            alt="Sofia Galvão Group Logo"
          />
          <h2 className="text-4xl md:text-7xl whitespace-nowrap">
            Juntos criamos
            <br />
            lares felizes!
          </h2>
        </div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 center">
        <a href="#cards">
          <i className="fas fa-arrow-down"></i>
        </a>
      </div>
    </section>
  );
}

export default Hero;
