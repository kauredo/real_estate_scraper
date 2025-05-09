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
    vari =>
      vari.name.toLowerCase().includes("negócios") ||
      vari.name.toLowerCase().includes("business")
  )[0];

  return (
    <section
      id="results"
      className="container mx-auto flex flex-col justify-between items-center min-h-[30vh] md:py-8 text-dark dark:text-light"
    >
      <div className="text-center w-full container mx-auto text-2xl flex flex-col sm:flex-row justify-center items-center flex-wrap pb-0 sm:pb-6 p-6 pt-6 sm:pt-2 gap-2">
        {variables?.map(variable => {
          return (
            <div
              key={variable.name}
              className="variable w-62 flex flex-col justify-center items-center p-4 md:py-0"
            >
              <i
                className={`text-8xl min-h-1/4 m-2 text-beige-default dark:text-beige-medium ${variable.icon}`}
                aria-hidden="true"
              ></i>
              {variable === volume ? (
                <>
                  <h2 className="w-56">
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
