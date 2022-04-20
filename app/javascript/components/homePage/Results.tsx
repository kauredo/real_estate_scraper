import React, { useRef } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { ResultNumbers } from "../utils/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

interface Props {
  results: ResultNumbers;
}

export default function Results(props: Props) {
  const { variables, listingCount } = props.results;
  console.log(variables);
  const volume = variables.filter(
    vari => vari.name.toLowerCase() === "volume de negócios"
  )[0];

  return (
    <section className="container mx-auto">
      <div className="text-center w-full md:w-2/3 mx-auto py-15 text-2xl flex flex-col sm:flex-row justify-center align-center">
        {variables.map(variable => {
          return (
            <div className="variable mx-auto w-1/3 flex flex-col justify-center align-center">
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
    </section>
  );
}
