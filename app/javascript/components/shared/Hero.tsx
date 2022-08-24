import React, { useState } from "react";
import QuarterCircle from "./QuarterCircle";

interface Props {
  photos: string[];
}

function Hero(props: Props) {
  const { photos } = props;

  return (
    <section className="max-height">
      <div className="center-hero gap-10">
        <QuarterCircle photos={photos} />
        <div className="w-2/5 h-60">
          <img
            className="h-1/2"
            src="/logos/original_sg_black.png"
            alt="Sofia Galvão Group Logo"
          />
          <h2 className="text-5xl">Juntos criamos lares felizes!</h2>
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
