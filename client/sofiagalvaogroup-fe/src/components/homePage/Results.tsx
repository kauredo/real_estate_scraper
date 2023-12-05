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

  if (!variables) return null;

  const volume = variables.filter(
    vari =>
      vari.name.toLowerCase().includes("negócios") ||
      vari.name.toLowerCase().includes("business")
  )[0];

  return (
    <section
      id="results"
      className="container mx-auto flex flex-col justify-between items-center min-h-[30vh] md:py-8 "
    >
      <div className="text-center w-full sm:w-1/2 mx-auto text-2xl flex flex-col sm:flex-row justify-around items-center flex-wrap pb-6">
        {variables?.map(variable => {
          return (
            <div
              key={variable.name}
              className="variable mx-auto min-w-[150px] w-fit flex flex-col justify-center items-center p-4 md:py-0"
            >
              <i
                className={`text-6xl tablet:text-8xl min-h-1/4 m-2 text-beige ${variable.icon}`}
                aria-hidden="true"
              ></i>
              {variable === volume ? (
                <>
                  <h2 className="min-w-[150px]">
                    <CountUp
                      end={parseInt(variable.value)}
                      redraw={true}
                      suffix=" €"
                      separator="."
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h2>
                  <h3 className="text-sm">{variable.name}</h3>
                </>
              ) : (
                <>
                  <h2>{variable.name}</h2>
                  <h3 className="text-sm">{variable.value}</h3>
                </>
              )}
            </div>
          );
        })}
      </div>
      <Testimonials testimonials={testimonials} />
    </section>
  );
}
