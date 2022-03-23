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
  const { volume, listingCount } = props.results;

  return (
    <section className="container mx-auto">
      <div className="text-center w-full md:w-2/3 mx-auto py-15 text-2xl flex flex-col sm:flex-row justify-center align-center">
        <div className="count mx-auto w-1/3 flex flex-col justify-center align-center">
          <FontAwesomeIcon className="h-1/4 m-2 text-bordeaux" icon={faMedal} />
          Nacional
          <div>Top 25</div>
        </div>
        <div className="count mx-auto w-1/3 flex flex-col justify-center align-center">
          <FontAwesomeIcon
            className="h-1/4 m-2 text-bordeaux"
            icon={faHouseChimney}
          />
          <div>Angariações</div>
          {listingCount}
        </div>
        <div className="volume mx-auto w-1/3 flex flex-col justify-center align-center">
          <FontAwesomeIcon
            className="h-1/4 m-2 text-bordeaux"
            icon={faHandHoldingDollar}
          />
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
