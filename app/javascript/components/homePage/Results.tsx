import Carousel from "nuka-carousel";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { ResultNumbers, Testimonial } from "../utils/Interfaces";
import Testimonials from "./Testimonials";

interface Props {
  results: ResultNumbers;
  testimonials: Testimonial[];
}

export default function Results(props: Props) {
  const { results, testimonials } = props;
  const { variables, listingCount } = results;
  const volume = variables.filter(
    vari => vari.name.toLowerCase() === "volume de negócios"
  )[0];

  return (
    <section
      id="results"
      className="container mx-auto flex flex-col justify-between items-center min-h-[30vh] py-8"
    >
      <div className="text-center w-full sm:w-[40%] mx-auto text-2xl flex flex-col sm:flex-row justify-around items-center flex-wrap pb-6">
        {variables.map(variable => {
          return (
            <div
              key={variable.name}
              className="variable mx-auto min-w-[140px] w-1/3 flex flex-col justify-center items-center"
            >
              <i
                className={`text-6xl tablet:text-8xl min-h-1/4 m-2 text-bordeaux ${variable.icon}`}
                aria-hidden="true"
              ></i>
              <h2>
                <div>{variable.name}</div>
                {variable === volume ? (
                  <CountUp
                    end={parseInt(variable.value)}
                    redraw={true}
                    suffix=" €"
                  >
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                ) : (
                  variable.value
                )}
              </h2>
            </div>
          );
        })}
      </div>
      <Testimonials testimonials={testimonials} />
    </section>
  );
}
