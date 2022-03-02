import React, { useRef } from "react";
import CountUp, { useCountUp } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { ResultNumbers } from "../utils/Interfaces";

interface Props {
  results: ResultNumbers;
}

export default function Results(props: Props) {
  const { volume, listingCount } = props.results;

  return (
    <section className="container">
      <div className="text-center w-full md:w-2/3 mx-auto py-20 text-2xl flex flex-col sm:flex-row justify-center align-center">
        <div className="count mx-auto my-8 w-1/2">
          <div>Angariações</div>
          {listingCount}
        </div>
        <div className="volume mx-auto my-8 w-1/2">
          <div>Volume de Negócios</div>
          <CountUp end={volume} redraw={true} suffix=" €">
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </div>
      </div>
    </section>
  );
}
